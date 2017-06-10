describe('ui-router-redirect module', function () {
    beforeEach(module('ui-router-redirect'));
    describe('test-states module', function () {
        beforeEach(module('test-states'));
        var $state, $rootScope, $stateParams, $timeout;
        beforeEach(inject(function (_$state_, _$rootScope_, _$stateParams_, _$timeout_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $stateParams = _$stateParams_;
            $timeout = _$timeout_;
        }));

        it('should not change states with no redirect', function(){
            $state.go('no-redirect');
            $rootScope.$digest();
            expect($state.current.name).toEqual('no-redirect');
        });

        it('should redirect to a state given string', function () {
            $state.go('redirect1');
            $rootScope.$digest();
            expect($state.current.name).toEqual('main');
        });

        it('should redirect to a state given object with state and params values', function () {
            $state.go('redirect2');
            $rootScope.$digest();
            expect($state.current.name).toEqual('main');
            expect($stateParams).toEqual({param1: true});
        });

        it('should redirect to a state given function that returns string', function () {
            $state.go('redirect3');
            $rootScope.$digest();
            expect($state.current.name).toEqual('main');
            $state.go('redirect4');
            $rootScope.$digest();
            expect($state.current.name).toEqual('main');
        });

        it('should redirect to a state given function that returns an object with state and params', function () {
            $state.go('redirect5');
            $rootScope.$digest();
            expect($state.current.name).toEqual('main');
            expect($stateParams).toEqual({param1: true});
            $state.go('redirect6');
            $rootScope.$digest();
            expect($state.current.name).toEqual('main');
            expect($stateParams).toEqual({param1: true});
        });

        it('should redirect to a state given function that returns a promise', function () {
            $state.go('redirect8');
            $rootScope.$digest();
            $timeout.flush();
            expect($state.current.name).toEqual('main');
            $state.go('redirect7');
            $rootScope.$digest();
            $timeout.flush();
            expect($state.current.name).toEqual('main');
            expect($stateParams).toEqual({param1: true});
            $timeout.verifyNoPendingTasks();
        });
    });
});
