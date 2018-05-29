import Flow from '@flowjs/ng-flow/dist/ng-flow-standalone';

const FileSaver = require('file-saver');

window.Flow = Flow;

const templateUrls = {
    header: require('./header.html'),
    save: require('./save-dialog.html'),
    help: require('./help-dialog.html'),
    error: require('./error-dialog.html')
}

/**
 * @module avHeader
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avHeader` directive holds the header logic of create, load and save config file. It is also responsible
 * for language switch
 *
 */
angular
    .module('app.ui')
    .directive('avHeader', avHeader);

/**
 * `avHeader` directive body.
 *
 * @function avHeader
 * @return {Object} directive body
 */
function avHeader() {
    const directive = {
        restrict: 'E',
        templateUrl: templateUrls.header,
        scope: { },
        controller: Controller,
        controllerAs: 'self',
        bindToController: true
    };

    return directive;
}

/**
 * Header controller
 *
 * @function Controller
 * @param {Object} $q Angular promise object
 * @param {Object} $mdDialog, Angular mddialog window object
 * @param {Object} $timeout Angular timeout object
 * @param {Object} $rootElement Angular rootelement object
 * @param {Object} $http Angular http object
 * @param {Object} events Angular events object
 * @param {Object} modelManager service to manage Angular Schema Form model
 * @param {Object} commonService service with common functions
 * @param {Object} constants service with all constants for the application
 * @param {Object} helpService service to create help
 */
function Controller($q, $mdDialog, $timeout, $rootElement, $http, events, modelManager, commonService, constants, helpService) {
    'ngInject';
    const self = this;

    self.create = create;
    self.filesSubmitted = filesSubmitted;
    self.save = save;
    self.help = help;
    self.setLanguage = setLanguage;
    self.setTemplate = setTemplate;

    // get all available languages and set the first one as current
    self.languages = commonService.getLangs();
    self.language = self.languages[0];
    localStorage.setItem('fgpa-lang', self.language);

    // get all value for templateUrls
    self.templates = getTemplates();
    self.template = (self.templates.length > 0) ?
        self.templates[0] : { 'path': 'config-default.json', 'file': 'default' };

    // set active file name
    events.$on(events.avNewSaveName, (obj, name)  => { self.saveName = name });

    /**
     * When create is clicked, broadcast a newModel event
     *
     * @function create
     * @private
     */
    function create() {
        // show splash with update event as parameter
        events.$broadcast(events.avShowSplash, events.avSchemaUpdate);

        // set active file name
        self.saveName = self.template.file;
    }

    /**
     * Open the help dialog
     *
     * @function help
     * @private
     */
    function help() {
        helpService.open();
    }

    /**
     * Set the current language
     *
     * @function setLanguage
     * @private
     */
    function setLanguage() {
        commonService.setLang(self.language);
        localStorage.setItem('fgpa-lang', self.language);
    }

    /**
     * Get templates available for the user from data-av-config attribute on html page
     *
     * @function getTemplates
     * @private
     * @return {Array} templates templates available for the user
     */
    function getTemplates() {
        const configAttr = $rootElement.attr('data-av-config');
        let templates = [];

        if (typeof configAttr !== 'undefined') {
            angular.fromJson(configAttr).map(item => {
                templates.push({ 'path': item, 'file': item.split('/')[item.split('/').length - 1].split('.')[0] });
            });
        }

        return templates;
    }

    /**
     * Set the current template
     *
     * @function setTemplate
     * @private
     */
    function setTemplate() {
        // load selected configuration and create the new file
        $http.get(self.template.path).then(obj => {
            modelManager.setDefault(obj.data);
            self.create();
        });
    }

    /**
     * Starts file upload.
     *
     * @function filesSubmitted
     * @private
     * @param {Array} files uploaded array of files
     */
    function filesSubmitted(files) {
        if (files.length > 0) {
            // show splash when new model load
            events.$broadcast(events.avShowSplash);

            // set active file name
            self.saveName = files[0].name.replace('.json', '');

            // read the file but add a timeout for the animation to start
            const file = files[0];
            $timeout(() => {
                _readFile(file.file).then(data => {
                    modelManager.setModels(JSON.parse(data));

                    // Validate data here check conformity with actual used schema
                    // TODO Upgrade to actual version. Strip non-conform object

                }).catch(error => {
                    $mdDialog.show({
                        controller: ErrorController,
                        controllerAs: 'self',
                        templateUrl: templateUrls.error,
                        parent: $('.fgpa'),
                        clickOutsideToClose: true,
                        fullscreen: false
                    });

                    function ErrorController($mdDialog) {
                        'ngInject';
                        const self = this;

                        self.close = $mdDialog.hide;
                        self.cancel = $mdDialog.hide;
                        self.errorMessage = error;
                    }
                });
            }, constants.delayEventSplash);
        }


        /**
         * Reads HTML5 File object data.
         *
         * @function _readFile
         * @private
         * @param {File} file a file object to read
         * @param {Function} progressCallback a function which is called during the process of reading file indicating how much of the total data has been read
         * @return {Promise} promise resolving with file's data
         */
        function _readFile(file) {
            const dataPromise = $q((resolve, reject) => {
                const reader = new FileReader();
                reader.onerror = () => {
                    reject('Failed to read a file');
                };
                reader.onload = () =>
                    resolve(reader.result);

                reader.readAsText(file);
            });

            return dataPromise;
        }
    }

    /**
     * Open a dialog window to save current model
     *
     * @function save
     * @private
     */
    function save() {
        // FIXME: we can't know the real saved file name because FileSaver.onwriteend doesn/t workaround
        // so if there is duplicate name the name will become nyname(1) on disk but will be myname on display
        $mdDialog.show({
            controller: SaveController,
            controllerAs: 'self',
            templateUrl: templateUrls.save,
            parent: $('.fgpa'),
            clickOutsideToClose: true,
            fullscreen: false,
            locals: { name: self.saveName },
            onRemoving: element => {
                self.saveName = document.getElementById('avInputFileSaveName').value;
            }
        });
    }

    /**
     * save controller
     *
     * @function extentController
     * @private
     * @param  {Object} $mdDialog  Angular dialog window object
     * @param  {Object} $translate  Angular translation object
     * @param {Object} constants service with all constants for the application
     * @param {String} name previous file save name
     */
    function SaveController($mdDialog, $translate, constants, name) {
        'ngInject';
        const self = this;

        self.close = $mdDialog.hide;
        self.cancel = cancel;
        self.save = save;
        self.error = '';
        self.isError = false;

        // increment final name from existing file name
        self.fileName = (name.search('^.*-V[0-9][0-9]$') === 0) ?
            `${name.slice(0, -2)}${(parseInt(name.slice(-2)) + 1).toString().padStart(2, '0')}` : `${name}-V01`;

        /**
         * Save current models to file
         *
         * @function save
         * @private
         */
        function save() {
            try {
                // save the file. Some browsers like IE and Edge doesn't support File constructor, use blob
                // https://stackoverflow.com/questions/39266801/saving-file-on-ie11-with-filesaver
                const file = new Blob([modelManager.save()], { type: 'application/json' });
                FileSaver.saveAs(file, `${self.fileName}.json`);

                self.close();
            } catch (e) {
                self.error = $translate.instant('header.savedialog.error');
                self.isError = true;
            }
        }

        /**
         * Cancel save action.
         *
         * @function cancel
         * @private
         */
        function cancel() {
            // set back the original name for save file name to be not changed
            document.getElementById('avInputFileSaveName').value = name;
            self.close();
        }
    }
}
