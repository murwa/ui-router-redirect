angular.module('test-states', [
    'ui.router'
])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state({
                name: 'main',
                params: {
                    param1: false
                }
            })
            .state({
                name: 'no-redirect'
            })
            .state({
                name: 'redirect1',
                redirectTo: 'main'
            })
            .state({
                name: 'redirect2',
                redirectTo: { state: 'main', params: { param1: true } }
            })
            .state({
                name: 'redirect3',
                redirectTo: function () {
                    return 'main';
                }
            })
            .state({
                name: 'redirect4',
                redirectTo: [function () {
                    return 'main';
                }]
            })
            .state({
                name: 'redirect5',
                redirectTo: function () {
                    return { state: 'main', params: { param1: true } };
                }
            })
            .state({
                name: 'redirect6',
                redirectTo: [function () {
                    return { state: 'main', params: { param1: true } };
                }]
            })
            .state({
                name: 'redirect7',
                redirectTo: ['$timeout', function ($timeout) {
                    return $timeout(function () {
                        return { state: 'main', params: { param1: true } };
                    });
                }]
            })
            .state({
                name: 'redirect8',
                redirectTo: ['$timeout', function ($timeout) {
                    return $timeout(function () {
                        return 'main';
                    });
                }]
            })
    }]);