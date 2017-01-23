'use strict';

angular.module('all-directives')
    .directive('eopdParallax', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).parallax("0%", 0.1);
            }
        }
    });
