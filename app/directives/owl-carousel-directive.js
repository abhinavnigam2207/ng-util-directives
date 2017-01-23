'use strict';

angular.module('all-directives')
    .directive('owlCarousel', [
        '$http', '$timeout', function ($http, $timeout) {
            return {
                restrict: 'EA',
                scope: {
                    nColSlider: "=owlCarousel",
                    externalCall: "=?externalCall"
                },
                link: function (scope, elm, attrs) {
                    // $timeout(function(){

                    scope.initCarousel = function () {
                        $(elm).owlCarousel({
                            pagination: false,
                            navigation: true,
                            rewindNav: false,
                            responsive: true,
                            items: scope.nColSlider,
                            itemsDesktop: [1199, 3],
                            itemsDesktopSmall: [980, 3],
                            itemsTablet: [768, 2],
                            itemsMobile: [500, 1],
                            afterAction: afterAction
                        });
                    }
                    if (!scope.externalCall)
                        scope.initCarousel();
                    // slider Tabs
                    $('.tabsSlider .threecol-slider li').click(function (event) {
                        $('.tabsSlider .threecol-slider li').removeClass('active');
                    });

                    $('.red-tabs .tabsSlider li').click(function () {
                        $('.red-tabs .tabsSlider li').removeClass('active');
                    });

                    $('.addMember .findID .mdnta-btn1').click(function () {
                        $('.addMember .findID').addClass('displayNone');
                        $('.addMember .selectRelation').removeClass('displayNone');
                        equalheightapply();
                    });

                    $('.addMember .selectRelation .btn-link').click(function () {
                        $('.addMember .selectRelation').addClass('displayNone');
                        $('.addMember .findID').removeClass('displayNone');
                        equalheightapply();
                    });

                    $('.addMember .selectRelation .mdnta-btn1').click(function () {
                        $('.addMember .selectRelation').addClass('displayNone');
                        $('.addMember .enterOTP').removeClass('displayNone');
                        equalheightapply();
                    });

                    $(".overlay,.unlink").on('click', function (event) {
                        $(".nav-mob").removeClass('in');
                        $(".overlay").hide();
                    });
                    $(".nav-mob .profile-menu .profile-dropdown li a").on('click', function (event) {
                        $(".nav-mob").removeClass('in');
                        $(".overlay").hide();
                    });

                    // Load and Resize function
                    $(window).bind("load resize", function () {
                        //sizingheight();
                        equalheightapply();
                    });
                    //});

                    function afterAction() {
                        //$(this.owl.owlItems).find('li').removeClass('active');
                        if (!scope.externalCall)
                            $(this.owl.owlItems[this.owl.currentItem]).find('li').addClass('active');
                        //$(this.owl.owlItems[this.owl.currentItem]).find('li').find('a').click();
                    }

                    // Load function
                    function equalheightapply() {
                        equalheight('.familymemberArea .members_list .member-detail .contact-details .detail-block');
                        equalheight('.familymemberArea .updatememberProfile .contact-details .contact-block');
                        equalheight('.red-tabs ul.nav-tabs li a');
                        equalheight('.familymemberArea .addMember .selectRelation .contact-details .detail-block');
                        equalheight('.need-assistance .block-col');
                    }

                    // Function for equal height parallel blocks
                    function equalheight(container) {
                        var currentTallest = 0,
                            currentRowStart = 0,
                            rowDivs = new Array(),
                            $el,
                            topPosition = 0;
                        $(container).each(function () {
                            $el = $(this);
                            $($el).height('auto');
                            topPosition = $el.position().top;

                            if (currentRowStart != topPosition) {
                                for (var currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                                    rowDivs[currentDiv].height(currentTallest);
                                }
                                rowDivs.length = 0; // empty the array
                                currentRowStart = topPosition;
                                currentTallest = $el.height();
                                rowDivs.push($el);
                            } else {
                                rowDivs.push($el);
                                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
                            }
                            for (var currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                                rowDivs[currentDiv].height(currentTallest);
                            }
                        });
                    }
                }
            };
        }
    ])
 .directive('owlCarouselItem', [
        function () {
            return {
                restrict: 'A',
                //                scope: {},
                link: function (scope) {
                    console.log(scope.$parent.initCarousel);
                    if (scope.$last) {
                        scope.$parent.$parent.$$childHead.initCarousel();
                    }
                }
            }
        }]);
