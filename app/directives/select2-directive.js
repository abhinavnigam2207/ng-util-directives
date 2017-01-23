'use strict';

angular.module('all-directives')
    .directive('select2', [
        '$http', function ($http) {
            return {
                restrict: 'EA',
                scope: {
                    data: "=data"
                },
                link: function (scope, elm, attrs) {
                    var init = function () {
                        elm.select2({
                            data: scope.data,
                            templateResult: function (d) {
                                return $(d.text);
                            },
                            templateSelection: function (d) {
                                return $(d.text);
                            }
                        });
                    }
                    init();
                }
            };
        }
    ]);
