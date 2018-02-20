setTimeout(function() {
    // add translations
    api.addTranslations('ddrlabel', ['DDR', 'DDR']);
    api.addTranslations('ddrtooltip', ['DDR Publishing Process', 'Processus de publication DDR']);

    // add function to scope
    const path = url.substring(0, url.lastIndexOf('/'));
    scope.ddr = function() {
        api.setExtensionDialog('<md-dialog aria-label="{{ \'extensions.ddrtooltip\' | translate }}" class="av-extent-dialog">' +
                '<av-content-panel close-panel="self.close()"' +
                        'title-style="title" title-value="{{ \'extensions.ddrtooltip\' | translate }}">' +
                    '<av-frame html="' + path + '/frame-ddr.html"></av-frame>' +
                '</av-content-panel>' +
            '</md-dialog>');
    }

    // add button to the interface
    api.addButton($(document.getElementsByClassName('av-summary-button')), 'append', 'ddr()', 'ddrlabel', 'ddrtooltip');
}, 3000);
