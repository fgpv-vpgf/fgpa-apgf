const templateUrl = require('./shell.html');

/**
 * @module avShell
 * @memberof app.layout
 * @restrict E
 * @description
 *
 * // TODO: update comments since it's a directive now and much had changed.
 * The `ShellController` controller handles the shell which is the visible part of the layout.
 * `self.isLoading` is initially `true` and causes the loading overlay to be displayed; when `configService` resolves, it's set to `false` and the loading overly is removed.
 */
angular
    .module('app.layout')
    .directive('avShell', avShell);

/**
 * The `ShellController` controller handles the shell which is the visible part of the layout.
 * @function avShell
 * @return {Object}  directive body
 */
function avShell() {

    const directive = {
        restrict: 'E',
        templateUrl,
        scope: {},
        link,
        controller: Controller,
        controllerAs: 'self',
        bindToController: true
    };

    return directive;

    /**
     * @function link
     * @param {Object} scope Angular object
     * @param {Object} el Angular object
     */
    function link(scope, el) {
        // TODO
        // set a resize listener on the root element to update it's layout styling based on the changed size
        // _updateShallLayoutClass();
        // layoutService.onResize($rootElement,
        //     debounceService.registerDebounce(_updateShallLayoutClass, 350, false));

        /**
         * Updates the $rootElement class with rv-small, rv-medium, or rv-large depending on its width and height.
         *
         * @function  _updateShallLayoutClass
         * @param {Object} newD new dimensions in the form of { width: <Number>, height: <Number> }
         * @param {Object} oldD old dimensions in the form of { width: <Number>, height: <Number> }
         */
        function _updateShallLayoutClass(newD, oldD) {
            // the first time the watch is triggered, newD is undefined
            if (!newD) {
                return;
            }

            // if dimensions are 0, something is wrong (I'm looking at you, IE)
            // this happens in IE when switching to full screen; just ignore
            if (newD.width === 0 || newD.height === 0) {
                return;
            }

            // TODO:
            // $rootElement
            //     .removeClass('av-small av-medium av-large')
            //     .addClass('av-' + layoutService.currentLayout())
            //     .toggleClass('av-short', layoutService.isShort());
        }
    }
}

/**
 * @function Controller
 * @param {Object} $timeout Angular object
 * @param {Object} events Angular object
 * @param {Object} constants constants the modules who contains all the constants
 */
function Controller($timeout, events, constants) {
    'ngInject';
    const self = this;

    self.isReady = false;
    hideSplash();

    // show splash
    events.$on(events.avShowSplash, (evt, param) => {
        self.isReady = false;

        // if we need to broadcast a new event, just wait a little bit to let the animation start
        if (typeof param !== 'undefined') { $timeout(() => { events.$broadcast(param) }, constants.delayEventSplash); }

        hideSplash();
    });
    /**
     * hideSplash is used to hide the spinning wheels
     * @function hideSplash
     * @private
     */
    function hideSplash() {
        $timeout(() => { self.isReady = true }, constants.delaySplash);
    }
}
