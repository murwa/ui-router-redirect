/**
 * Created by mxgel on 6/8/17.
 */
angular.module('ui-router-redirect', [
    'ui.router'
])
    .run(['$state', '$rootScope', '$injector', function ($state, $rootScope, $injector) {
        $rootScope.$on('$stateChangeStart', function ($e, toState, toParams) {
            // Redirect value: can be
            // 1. string - this will be a state to redirect to
            // 2. object - this should have a state and params keys; which will be used for state and state params
            // 3. function - should return 1 or 2 above
            // 4. promise - should resolve to 1 and 2 above
            var redirectTo = toState.redirectTo;

            if (redirectTo) {
                $e.preventDefault();
                if (angular.isFunction(redirectTo) || (angular.isObject(redirectTo) && redirectTo.length)) {
                    return redirect($injector.invoke(redirectTo));
                }
                return redirect(redirectTo);
            }

            /**
             * Redirect to given state
             *
             * @param value
             * @return {promise}
             */
            function redirect(value) {
                // We gotta a promise?
                if (value && angular.isFunction(value.then)) {
                    return value.then(function (data) {
                        return redirect(data);
                    }).catch(function (error) {
                        console.error(error);
                    });
                }
                // Do we have a string?
                if (angular.isString(value)) {
                    return $state.transitionTo(value, toParams);
                } else if (angular.isObject(value)) {
                    return $state.transitionTo(value.state, angular.extend({}, toParams, value.params || {}));
                }
                throw 'Invalid redirect specification';
            }
        });
    }]);