'use strict';

angular.module('all-directives')
    .directive('disableDropdownToggle', function () {
        return function (scope, element, attrs) {
            element.bind("click", function (event) {
                event.stopPropagation(); 
            });
        };
    });