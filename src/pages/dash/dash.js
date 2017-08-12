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

            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        prefetchTemplate: true,
                        templateUrl: 'pages/dash/tab-dash.html',
                        controllerAs: 'vm',
                        controller: 'DashCtrl'
                    }
                }
            })

    }

    angular
        .module('myApp')
        .controller('DashCtrl', DashCtrl);

    DashCtrl.$inject = [
        '$scope',
        '$state',
        'Chats'];

    function DashCtrl($scope,
                      $state,
                      Chats) {
        var vm = this;
    }
})();
