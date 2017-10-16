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
 * The `avHeader`
 *
 */
angular
    .module('app.ui')
    .directive('avHeader', avHeader);

/**
 * `avHeader` directive body.
 *
 * @function avHeader
 * @return {object} directive body
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

function Controller(events, $q, modelManager, $mdDialog, $translate, commonService) {
    'ngInject';
    const self = this;

    self.create = create;
    self.filesSubmitted = filesSubmitted;
    self.save = save;

    self.languages = commonService.getLangs();
    self.language = self.languages[0];
    self.setLanguage = setLanguage;

    function create() {
        events.$broadcast(events.avNewModel);
    }

    function setLanguage() {
        commonService.setLang(self.language);
    }

    /**
     * Starts file upload.
     * @function filesSubmitted
     * @param  {Array} files uploaded array of files
     */
    function filesSubmitted(files) {
        if (files.length > 0) {
            const file = files[0];

            _readFile(file.file).then(data => modelManager.setModels(JSON.parse(data))
            ).catch(error => {
                console.log('error upload');
            });
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

    function save() {
        $mdDialog.show({
            controller: SaveController,
            controllerAs: 'self',
            templateUrl: templateUrls.save,
            parent: $('.fgpa'),
            disableParentScroll: false,
            clickOutsideToClose: true,
            fullscreen: false
        });
    }

    function SaveController($mdDialog) {
        'ngInject';
        const self = this;

        self.close = $mdDialog.hide;
        self.cancel = $mdDialog.hide;
        self.save = save;
        self.fileName = '';

        function save() {
            // TODO use constant model too loop
            const models = {
                'map': modelManager.getModel('map', false),
                'ui': modelManager.getModel('ui', false)
            };

            const file = new File([JSON.stringify(models)], `${self.fileName}.json`, { type: 'text/plain' });
            FileSaver.saveAs(file);
            self.close();
        }
    }
}
