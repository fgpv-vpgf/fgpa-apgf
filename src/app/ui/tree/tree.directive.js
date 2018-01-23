const templateUrl = require('./tree.html');

/**
 * @module avTree
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avTree` manage a tree structure. Use for summary panel.
 *
 */
angular
    .module('app.ui')
    .directive('avTree', avTree);

/**
 * `avTree` directive body.
 *
 * @function avTree
 * @return {object} directive body
 */
// http://plnkr.co/edit/JAIyolmqPqO9KsynSiZp?p=preview
function avTree(recursionService) {
    const directive = {
        restrict: 'E',
        templateUrl,
        scope: { tree: '=' },
        compile: element =>
            recursionService.compile(element, (scope, iElement, iAttrs, controller, transcludeFn) => {
                // define your normal link function here.
                // alternative: instead of a function, you can pass an object with a 'pre'- and 'post'-link function.
                scope.expand = item => {
                    item.expand = !item.expand;
                }
            }),
        controller: Controller,
        controllerAs: 'self',
        bindToController: false
    };

    return directive;
}

function Controller(events) {
    'ngInject';
    const self = this;

    self.setFocus = setFocus;

    function setFocus(val) {
        events.$broadcast(events.avUpdateFocus, val);
    }
    // // https://github.com/json-schema-form/angular-schema-form/issues/410
    //         //     <span class="node.selected" ng-class="{'av-summary-adv': tree.advance === true, 'av-summary-list': tree.stype === 'element'}" ng-click="self.setFocus(tree.hlink)">{{ tree.title }}</span>

    //         document.getElementById(val).focus({preventScroll:false});

    //         const aTags = document.getElementsByTagName("a");
    //         const searchText = "Legend";
    //         let found;

    //         for (let i = 0; i < aTags.length; i++) {
    //             if (aTags[i].textContent === searchText) {
    //                 found = aTags[i];
    //                 break;
    //             }
    //         }
    //         console.log(found);
    //     }
}