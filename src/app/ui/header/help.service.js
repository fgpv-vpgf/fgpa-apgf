import marked from 'marked';

const templateUrl = require('./help-dialog.html');
const renderer = new marked.Renderer();

/**
 * @module helpService
 * @memberof app.ui
 * @description
 *
 * The `helpService` service provides stores for help items
 *
 */
/**
  * @module selectFilter
  * @memberof app.ui
  * @description
  *
  * The `selectFilter` filter, select a section in the supplied text.
  *
  */
angular
    .module('app.ui')
    .service('helpService', helpService)
    .filter('select', selectFilter);


    /**
     * Search filter for special chars and null that cause problems with help display and search
     *
     * @function searchFilterNoSpecialCharsNull
     * @private
     * @param {String}  search term to verify for special characters
     * @return {Boolean} true if valid
     */
    function searchFilterNoSpecialCharsNull(searchTerm) {

            // no searchTerm provided, return all text
            if (!searchTerm) {
                return false;
            }

           if ((searchTerm !== '') && (searchTerm.indexOf('.') === -1) && (searchTerm.indexOf('|') === -1) && (searchTerm.indexOf('+') === -1) && (searchTerm.indexOf('[') === -1) && (searchTerm.indexOf('(') === -1)
              && (searchTerm.indexOf(')') === -1) && (searchTerm.indexOf('^') === -1) && (searchTerm.indexOf('$') === -1) && (searchTerm.indexOf('?') === -1) && (searchTerm.indexOf('*') === -1)
              && (searchTerm.lastIndexOf('\\') !== (searchTerm.length)-1)) {
              return true;
           }
           else {
              return false;
           }
    }

/**
 * Select filter to select text inside section info. We do not use the filter from angular * because it has problem with ' in French
 *
 * @function selectFilter
 * @return {Array} output Array of section to show
 */
function selectFilter() {
    return (text = '', searchTerm = undefined) => {

        // no searchTerm provided, return all text
        if (!searchTerm) {
            return text;
        }

        let output = [];

        if (searchFilterNoSpecialCharsNull(searchTerm)) {
        // replace ' by &#39; and &amp;#39; to manage search with French '
            const regexA = new RegExp(`${searchTerm.replace(/'/g, '&#39;')}`, 'g');
            const regexB = new RegExp(`${searchTerm.replace(/'/g, '&amp;#39;')}`, 'g');
            for (let section of text) {
                // if text is present, add the section to output
                if (regexA.test(section.info) || regexB.test(section.info)) {
                    output.push(section);
                }
            }
        }

        return output;
    };
}

/**
 * Help service form controller
 *
 * @function helpService
 * @param {Object} $mdDialog Angular dialog window object
 * @param {Object} $translate Angular translation object
 * @param {Object} $timeout Angular timeout object
 * @param {Object} translations translation service
 * @param {Object} events Angular events object
 * @param {Object} constants service with all constants for the application
 * @return {Object} the help service
 */
function helpService($mdDialog, $translate, $timeout, translations, events, constants) {
    const service = {
        open
    };

    return service;

    /**
     * Opens help panel.
     *
     * @function open
     */
    function open() {
        $mdDialog.show({
            controller: HelpSummaryController,
            controllerAs: 'self',
            bindToController: true,
            templateUrl,
            parent: ('.fgpa'),
            clickOutsideToClose: true,
            fullscreen: false,
            onComplete: () => events.$broadcast(events.avShowHelp),
            onRemoving: () => { document.getElementsByClassName('av-help-button')[0].focus(); }
        });
    }

    /**
     * Help summary controller
     *
     * @function save
     * @private
     * @param {Object} $http Angular http onject
     * @param {Object} $scope Angular scope onject
     */
    function HelpSummaryController($http, $scope,$rootElement, $rootScope, externalService) {
        const self = this;

        // hide content until accordion finish initialization
        self.isLoading = true;
        $timeout(() => { self.isLoading = false}, constants.delayEventSplash);

        self.previousSearch = '';

        self.closeHelpSummary = closeHelpSummary;
        self.onSearchTermChange = onSearchTermChange;

        self.filteredSections = [];

        // watch filteredSections length change to catch when user goes from nothing found to values
        // without this, onSearchTermChange function receives [] as sections and nothing is higlighted
        $scope.$watchCollection('self.filteredSections', (newVal, oldVal) => {
            if (typeof oldVal !== 'undefined' && oldVal.length === 0) onSearchTermChange(self.searchTerm, newVal);
        });

        // get help location
        const language = localStorage.getItem('fgpa-lang');

        // test if ddr and agol extensions exist
        const extAttr = $rootElement.attr('data-av-extensions');
        const extensionList = extAttr ? angular.fromJson(extAttr) : [];

        extensionList.forEach(element => {console.log('extension list -',element);

        if (element.search('/extensions/ddr/ddr.js')) {
      //         const ddrLocation = `content/samples/extensions/ddr/${language}.md`;
            //   const ddrLocation = `content/samples/extensions/ddr/ddr'+'${language}.md`;

               console.log('content/samples/extensions/ddr/ddr-en-CA.md');
               console.log('ddr extension found');
          //     let reader = new FileReader();
        //       reader.readAsText('content/samples/extensions/ddr/ddr-en-CA.md', "UTF-8");
          //     reader.readAsText('content/samples/extensions/ddr/ddr-en-CA.md', "Blob");
            //   reader.onload =  console.log(this.result);

            const ddrLocation = `samples/extensions/ddr/ddr'+'${language}.md`;

// starts off in sampels directory
            //      $http.get(ddrLocation).then(r => {console.log(r.data);} );

            $http.get('sextensions/ddr/ddr-en-CA.md').then(r => {console.log(r.data);} );

        //    $http.get('help/ddr-CA.md').then(r => {console.log(r.data);} );

  // Handle progress, success, and errors
                //reader.onprogress = updateProgress;
                //reader.onload = loaded;
                //reader.onerror = errorHandler;
           }

           });

        useMarkdown(language);

        /**
         * Use markdown marked library to parse markdown and format it properly
         *
         * @function useMarkdown
         * @private
         * @param {String} language current language
         */
        function useMarkdown(language) {
            // make it easier to use images in markdown by prepending path to href if href is not an external source
            // this avoids the need for ![](help/images/myimg.png) to just ![](myimg.png). This overrides the default image renderer completely.
            renderer.image = (href, title) => {
                if (href.indexOf('http') === -1) {
                    href = `help/images/` + href;
                }
                return `<img src="${href}" alt="${title}">`;
            };

            const mdLocation = `help/${language}.md`;
            $http.get(mdLocation).then(r => {
                // matches help sections from markdown file where each section begins with one hashbang and a space
                // followed by the section header, exactly 2 spaces, then up to but not including a double space
                // note that the {2,} below is used as the double line separator since each double new line is actually 6
                // but we'll also accept more than a double space
                const reg = /^#\s(.*)\n{2}(?:.+|\n(?!\n{2,}))*/gm;
                let mdStr = r.data; // markdown file contents
                let section; // used for storing individual section groupings
                self.sections = []; // used in template for rendering help sections

                // remove new line character ASCII (13) so that above regex is compatible with all
                // operating systems (markdown file varies by OS new line preference)
                mdStr = mdStr.replace(new RegExp(String.fromCharCode(13), 'g'), '');

                // start breaking down markdown file into sections where h1 headers (#) denote a new section
                // eslint-disable-next-line no-cond-assign
                while (section = reg.exec(mdStr)) { // jshint ignore:line
                    self.sections.push({
                        header: section[1],
                        // parse markdown on info section only. Note that the split/splice/join removes the header
                        // and is a workaround for not being able to put info section into its own regex grouping like the header
                        info: marked(section[0].split('\n').splice(2).join('\n'), { renderer })
                    });
                }
            }).catch(error => {
                self.hasNoHelp = true;
            });
        }

        self.searchTerm = '';

        /**
         * Close Help panel.
         *
         * @function closeHelpSummary
         * @private
         */
        function closeHelpSummary() {
            $mdDialog.hide();
        }

        /**
         * When a search term is entered, expand all the help sections (only once that are filtered will be visible, so it's okay).
         * When a search term is cleared, collapse all the help sections.
         *
         * @function onSearchTermChange
         * @private
         * @param {String} value search string
         * @param {Array} sections markdown sections
         */
        function onSearchTermChange(value, sections) {

            if (typeof sections !== 'undefined') {
                // keep original value to replace and replace ' by &#39
                const original = value;
                value = (typeof value !== 'undefined') ? value.replace(/'/gi, '&#39;') : '';

                // remove previous highlight
                if (searchFilterNoSpecialCharsNull(self.previousSearch)) {
                    const regex = new RegExp(`<code>${self.previousSearch}<code>`, 'gi');
                    for (let section  of sections) {
                        section.info = section.info.replace(/<\/code>/gi, '<code>');
                        section.info = section.info.replace(regex, `${self.previousSearch}`)
                        section.info = marked(section.info, { renderer });
                    }
                }

                // highlight search
                if (searchFilterNoSpecialCharsNull(value)) {
                    const regex = new RegExp(`${value}`, 'gi');
                    for (let section  of sections) {
                        section.info = marked(section.info.replace(regex, `\`${original}\``), { renderer });
                    }
                }

                // keep track of search searchTerm
                self.previousSearch = value;

                // recreate the accordion because sections are added back
                events.$broadcast(events.avShowHelp);

                // manage section expand and collapse
                $timeout(() => {
                    let action = (value !== '') ? 'slideDown' : 'slideUp';
                    manageExpand(action);
                }, constants.delayScroll);
            }
        }

        /**
         * Expand or collapse accordion content
         *
         * @function manageExpand
         * @private
         * @param {String} action action to apply to content
         */
        function manageExpand(action,) {
            const iconsExp = angular.element('.av-help-section .av-accordion-expand');
            const iconsCol = angular.element('.av-help-section .av-accordion-collapse');
            const sections = angular.element('.av-help-section .av-accordion-content');

            // expand or collapse the section
            sections[action](10, 'swing');

            // set icons
            const actionCol = (action === 'slideDown') ? 'add' : 'remove';
            const actionExp = (action === 'slideDown') ? 'remove' : 'add';
            for (let elem of iconsExp) {
                elem.classList[actionCol]('hidden');
            }
            for (let elem of iconsCol) {
                elem.classList[actionExp]('hidden');
            }
        }
    }
}
