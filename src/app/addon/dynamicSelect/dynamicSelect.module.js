/**
 * @namespace app.addon
 * @description
 *
 * The `app.addon.dynamicSelect` module set schema form add on to have dynamic enum from scope values.
 * Do not forget to add the reference inside app.module
 *
 * https://github.com/Anthropic/angular-schema-form-external-options
 *
 * @param {Object} schemaFormDecoratorsProvider ASF object
 */
angular.module('app.addon.dynamicSelect', ['schemaForm']).config(
    ['schemaFormDecoratorsProvider', schemaFormDecoratorsProvider => {

        // add to the bootstrap directive
        schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'dynamic-select', 'dynamicSelect.html');
        schemaFormDecoratorsProvider.createDirective('dynamic-select', 'dynamicSelect.html');
    }]);

// cache the template so we don't need to have them in our sample folder
angular.module('app.addon.dynamicSelect').run(['$templateCache', $templateCache => {
    $templateCache.put('dynamicSelect.html',
        `<div class="form-group {{ ::form.htmlClass + ' ' + idClass }} schema-form-select" ng-class="{
                    'has-error': form.disableErrorState !== true && hasError(),
                    'has-success': form.disableSuccessState !== true && hasSuccess(),
                    'has-feedback': form.feedback !== false,
                    'required': form.required === true }">
                <label class="control-label {{::form.labelHtmlClass}}" ng-show="showTitle()" for="{{::fieldId(true, false)}}">
                    {{form.title}}
                </label>
                <select ng-if="form.array === false"
                    ng-model="model[form.model]"
                    ng-model-options="form.ngModelOptions"
                    ng-disabled="form.readonly"
                    sf-changed="form"
                    ng-change="changed()"
                    class="form-control"
                    schema-validate="form"
                    dynamic-select
                    model="model"
                    form="form"
                    ng-options="item.value as item.name for item in form.options" destroy-hidden-data>
                </select>
                <select ng-if="form.array === true"
                    ng-model="item[form.model]"
                    ng-model-options="form.ngModelOptions"
                    ng-disabled="form.readonly"
                    sf-changed="form"
                    ng-change="changed()"
                    class="form-control"
                    schema-validate="form"
                    dynamic-select
                    model="model"
                    form="form"
                    ng-options="item.value as item.name for item in form.options" destroy-hidden-data>
                </select>
                <div class="help-block" sf-message="form.description"></div>
        </div>`);
}]);
