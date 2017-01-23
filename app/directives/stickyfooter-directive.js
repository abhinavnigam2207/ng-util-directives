'use strict';

angular.module('all-directives')
    .directive('stickyfooter', [
        '$http','$timeout', function ($http, $timeout) {
            return {
                restrict: 'A',
                link: function (scope, elm, attrs) {
                    $timeout(function(){
                        var footerHeight = $('#footerCntr').height();
                        $('body').css('margin-bottom', footerHeight);
                    });
                }
            };
        }
    ]);
