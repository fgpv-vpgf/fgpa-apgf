/**
 * @namespace app.addon
 * @description
 *
 * The `app.addon.sample` module set schema form add on sample from a type inside schema.
 * Do not forget to add the reference inside app.module
 *
 * https://github.com/json-schema-form/angular-schema-form/blob/master/docs/extending.md
 *
 * @param {Object} schemaFormProvider ASF object
 * @param {Object} schemaFormDecoratorsProvider ASF object
 * @param {Object} sfPathProvider ASF object
 */
angular.module('app.addon.sampleSchema', ['schemaForm']).config(
    ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
        (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) => {

            // sample to show how to include a custom additional stuff from schema
            // to make it work, just add "type": "string" and "format": "html" to the schema
            let wysiwyg = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'html') {
                    let f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key  = options.path;
                    f.type = 'wysiwyg';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(wysiwyg);

            // add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'wysiwyg', 'sampleSchema.html');
            schemaFormDecoratorsProvider.createDirective('wysiwyg', 'sampleSchema.html');
        }
    ]);

// cache the template so we don't need to have them in our sample folder
angular.module('app.addon.sampleSchema').run(['$templateCache', $templateCache => {
    $templateCache.put('sampleSchema.html', `<span av-bind-value>{{form.htmlClass}}</span>`);
}]);
