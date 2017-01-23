'use strict';

angular.module('all-directives')
    .directive('eopdEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.eopdEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });

