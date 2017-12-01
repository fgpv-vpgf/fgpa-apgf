'use strict';

/**
 * @function app.core.seed
 * @inner
 * @desc `seed` is an implicit function which runs on application startup to
 * initialize all marked DOM nodes to map instances
 */
angular.element(document)
    .ready(() => {
        'use strict';

        // the app nodes in the dom
        const node = document.getElementsByClassName('fgpa')[0];

        // load shell template into the node
        // we need to create an explicit child under app's root node, otherwise animation
        // doesnt' work; see this plunk: http://plnkr.co/edit/7EIM71IOwC8h1HdguIdD
        // or this one: http://plnkr.co/edit/Ds8e8d?p=preview
        node.appendChild(angular.element('<av-shell class="md-body-1">')[0]);

        // bootstrap each node as an Angular app
        // strictDi enforces explicit dependency names on each component: ngAnnotate should find most automatically
        // this checks for any failures; to fix a problem add 'ngInject'; to the function preamble
        angular.bootstrap(node, ['app'], {
            strictDi: true
        });

        // only do this if there is another version present - protractor needs angular reference otherwise
        if (existingWindowDotAngular) {
            delete window.angular;
            window.angular = existingWindowDotAngular;
        }
    });
