'use strict';

angular.module('all-directives')
    .directive('eopdSlider', function () {
        return {
            restrict: 'A',
            scope: {
                orientation : '='
            },
            link: function(scope, element){
                var auto = true;
                var autostopped = false;

                var sudoSlider = $(element).sudoSlider({
                    auto: true,
                    vertical: (scope.orientation && scope.orientation == 'vertical') ? true : false,
                    horizontal: (scope.orientation && scope.orientation == 'horizontal') ? true : false,
                    prevNext: false,
                    continuous:true
                }).mouseenter(function() {
                    auto = sudoSlider && sudoSlider.getValue('autoAnimation');
                    if (auto) {
                        sudoSlider.stopAuto();
                    } else {
                        autostopped = true;
                    }
                }).mouseleave(function() {
                    if (!autostopped) {
                        sudoSlider.startAuto();
                    }
                });
            }
        };
    });

