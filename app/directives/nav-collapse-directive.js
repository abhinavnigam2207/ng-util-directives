'use strict';

angular.module('all-directives')
    .directive('navCollapse', [
        '$rootScope', function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var visible = false;

                    element.on('show.bs.collapse', function () {
                        visible = true;
                    });

                    element.on("hide.bs.collapse", function () {
                        visible = false;
                    });

                    element.on('click', function (event) {
                        if (visible) {
                            element.collapse('hide');
                            $rootScope.overlay.active = false;
                            $rootScope.showMenu.active = false;
                        }
                    });
                }
            };
        }
    ]);


