/**
 * @module dynamicSelect
 * @memberof app.ui
 * @restrict A
 * @description handle link between field by populating enum for selection drop dpwn with value from another field
 *
 */
angular
    .module('app.ui')
    .directive('dynamicSelect', dynamicSelect);

/**
 * `dynamicSelect` directive body.
 *
 * @function dynamicSelect
 * @return {Object}     directive body
 */
function dynamicSelect() {
    const directive = {
        restrict: 'A',
        require: ['ngModel', '?^sfSchema'],
        scope: {
            test: '=',
            form: '=',
            model: '='
        },
        controller: Controller,
        controllerAs: 'self',
        bindToController: true
    }

    return directive;
}

function Controller($scope, sfSelect) {
    'ngInject';
    const self = this;
    const scope = $scope.$parent;

    scope.form.options = { };

    // set model
    let parent = scope.$parent;
    while (parent.hasOwnProperty('model')) {
        parent = parent.$parent;
    }

    if (scope.form.optionData) {
        scope.$parent.evalExpr('this').$watchCollection(scope.form.optionData, (newOptions, oldOptions) => {
            let options = {};
            if (angular.isArray(newOptions)) {
                options = (angular.isString(newOptions[0])) ? { enum: newOptions } : { titleMap: newOptions };
            }
            processOptions('data:' + scope.form.optionData, options, scope.form.selectedOption);
        });
    }

    function processOptions(optionSource, data, current) {
        let enumTitleMap = [];

        if (data.enum && data.enum.length) {
            for (let i = 0; i < data.enum.length; i++) {
                if (data.enum[i] && data.enum[i].length) {
                    enumTitleMap.push({ name:data.enum[i], value:data.enum[i] });
                }
            }
            scope.form.options = enumTitleMap;
        }

        scope.$watch('item[form.model]', (newValue, oldValue) => {
            sfSelect(scope.form.key, parent.model, newValue);
        });

        sfSelect(scope.form.key, parent.model, 'null');

        return;
    }
}
