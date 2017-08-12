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

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        prefetchTemplate: true,
                        templateUrl: 'pages/chat/tab-chats.html',
                        controllerAs: 'vm',
                        controller: 'ChatsCtrl'
                    }
                }
            })
    }

    angular
        .module('myApp')
        .controller('ChatsCtrl', ChatsCtrl);

    ChatsCtrl.$inject = [
        '$scope',
        '$state',
        'Chats'];

    function ChatsCtrl($scope,
                       $state,
                       Chats) {
        var vm = this;
        vm.chats = Chats.all();
        vm.remove = function (chat) {
            Chats.remove(chat);
        };
    }
})();
