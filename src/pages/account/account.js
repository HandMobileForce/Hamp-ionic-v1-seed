/**
 * Created by gusenlin on 2017/8/12.
 */
(function () {
    'use strict';
    angular
        .module('myApp')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        prefetchTemplate: true,
                        templateUrl: 'pages/account/tab-account.html',
                        controllerAs: 'vm',
                        controller: 'AccountCtrl'
                    }
                }
            });
    }

    angular
        .module('myApp')
        .controller('AccountCtrl', AccountCtrl);

    AccountCtrl.$inject = [
        '$scope',
        '$state'];

    function AccountCtrl($scope,
                         $state) {
        var vm = this;
        vm.settings = {
            enableFriends: true
        };
    }
})();
