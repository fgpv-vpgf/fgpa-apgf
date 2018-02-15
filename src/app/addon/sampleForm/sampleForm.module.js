/**
 * @namespace app.addon
 * @description
 *
 * The `app.addon.sample` module set schema form add on sample from a type indside form.
 * Do not forget to add the reference inside app.module
 *
 * https://github.com/json-schema-form/angular-schema-form/blob/master/docs/extending.md
 *
 * @param {Object} schemaFormProvider ASF object
 * @param {Object} schemaFormDecoratorsProvider ASF object
 * @param {Object} sfBuilderProvider ASF object
 */
angular.module('app.addon.sampleForm', ['schemaForm']).config(
    ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfBuilderProvider',
        (schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider) => {

            // sample to show how to include a custom additional stuff from form
            // to make it work, just add "type": "custom" to the form
            // add something like this to bind value from a field { 'type': 'custom', 'field': '$parent.model.layers[$parent.arrayIndex].layer.name' }
            schemaFormDecoratorsProvider.defineAddOn(
                'bootstrapDecorator',
                'custom',
                'sampleForm.html',
                [
                    sfBuilderProvider.builders.sfField,
                    sfBuilderProvider.builders.ngModelOptions,
                    sfBuilderProvider.builders.condition,
                    sfBuilderProvider.builders.transclusion
                ]
            );
        }
    ]);

// cache the template so we don't need to have them in our sample folder
angular.module('app.addon.sampleForm').run(['$templateCache', $templateCache => {
    $templateCache.put('sampleForm.html', `<span av-bind-value data-bind="{{ form.field }}"></span>`);
}]);
