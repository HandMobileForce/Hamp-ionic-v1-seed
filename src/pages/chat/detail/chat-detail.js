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

            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        prefetchTemplate: false,
                        templateUrl: 'pages/chat/detail/chat-detail.html',
                        controllerAs: 'vm',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })
    }

    angular
        .module('myApp')
        .controller('ChatDetailCtrl', ChatDetailCtrl);

    ChatDetailCtrl.$inject = [
        '$stateParams',
        'Chats'];

    function ChatDetailCtrl($stateParams,
                            Chats) {
        var vm = this;
        vm.chat = Chats.get($stateParams.chatId);
    }
})();
