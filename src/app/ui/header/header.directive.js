import Flow from '@flowjs/ng-flow/dist/ng-flow-standalone';
const FileSaver = require('file-saver');

window.Flow = Flow;

const templateUrls = {
    header: require('./header.html'),
    save: require('./save-dialog.html')
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

function Controller($q, $mdDialog, $timeout, $rootElement, $http, events, modelManager, commonService, constants) {
    'ngInject';
    const self = this;

    self.create = create;
    self.filesSubmitted = filesSubmitted;
    self.save = save;
    self.setLanguage = setLanguage;
    self.setTemplate = setTemplate;

    // get all avialable languages and set the first one as current
    self.languages = commonService.getLangs();
    self.language = self.languages[0];

    // get al value for templateUrls
    self.templates = getTemplates();
    self.template = self.templates[0];

    // set active file name
    self.saveName = self.template;

    /**
     * When create is clicked, broadcast a newModel event
     * @function create
     */
    function create() {
        // show splash with update event as parameter
        events.$broadcast(events.avShowSplash, events.avSchemaUpdate);

        // set active file name
        self.saveName = self.template;
    }

    /**
     * Set the current language
     * @function setLanguage
     */
    function setLanguage() {
        commonService.setLang(self.language);
    }

    /**
     * Get templates available for the user from data-av-config attribute on html page
     * @function getTemplates
     * @return {Array} templates templates available for the user
     */
    function getTemplates() {
        const templates = (typeof $rootElement.data('av-config') !== 'undefined') ?
            $rootElement.data('av-config').map(item => item.split('.')[0]) : [];
        return templates;
    }

    /**
     * Set the current template
     * @function setTemplate
     */
    function setTemplate() {
        // load selected configuration
        $http.get(`./config/${self.template}.json`).then(obj => modelManager.setDefault(obj.data));
    }

    /**
     * Starts file upload.
     * @function filesSubmitted
     * @param  {Array} files uploaded array of files
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
                _readFile(file.file).then(data => modelManager.setModels(JSON.parse(data))
                ).catch(error => {
                    console.log('error upload');
                });
            }, constants.delayEventSplash);
        }

        /**
         * Reads HTML5 File object data.
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
     * @function save
     */
    function save() {
        // FIXME: we can't know the real saved file name because FileSaver.onwriteend doesn/t workaround
        // so if there is duplicate name the name will become nyname(1) on disk but will be myname on display
        $mdDialog.show({
            controller: SaveController,
            controllerAs: 'self',
            templateUrl: templateUrls.save,
            parent: $('.fgpa'),
            disableParentScroll: false,
            clickOutsideToClose: true,
            fullscreen: false,
            onRemoving: element => { self.saveName = element[0].getElementsByTagName('input')[0].value; }
        });
    }

    function SaveController($mdDialog, constants) {
        'ngInject';
        const self = this;

        self.close = $mdDialog.hide;
        self.cancel = $mdDialog.hide;
        self.save = save;
        self.fileName = '';

        /**
         * Save current models to file
         * @function save
         */
        function save() {
            // save the file
            const file = new File([modelManager.save()], `${self.fileName}.json`, { type: 'text/plain' });
            FileSaver.saveAs(file);
            self.close();
        }
    }
}
