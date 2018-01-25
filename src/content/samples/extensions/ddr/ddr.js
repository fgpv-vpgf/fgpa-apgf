setTimeout(() => {
    // add translations
    api.addTranslations('ddrlabel', ['DRR', 'DDR']);
    api.addTranslations('ddrtooltip', ['Upload to DRR', 'Téléversement au DDR']);

    // add function to scope
    scope.ddr = () => {
        api.setExtensionDialog(`
            <md-dialog aria-label="{{ 'extensions.ddrtooltip' | translate }}" class="av-extent-dialog">
                <av-content-panel close-panel="self.close()"
                        title-style="title" title-value="{{ 'extensions.ddrtooltip' | translate }}">
                    <av-frame html="./extensions/ddr/frame-ddr.html"></av-frame>
                </av-content-panel>
            </md-dialog>`);
    }

    // add button to the interface
    api.addButton($(document.getElementsByClassName('av-summary-button')), 'append', 'ddr()', 'ddrlabel', 'ddrtooltip');
}, 3000);
