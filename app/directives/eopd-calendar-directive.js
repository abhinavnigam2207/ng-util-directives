'use strict';
angular.module('all-directives')
   .directive('eopdCalendar', function () {
       return {
           restrict: 'A',
           scope: {
               calendarData: '=',
               calendarAvailablity: '=',
               defaultView: '=',
               selectedSlot: '=',
               slotPeriod: '=',
               refreshData: '&'
           },
           link: function (scope, element) {
               var contentheight = $(window).height() - (5 + $("#headerCntr").height() + $(".topmenuArea").height() + 5);
               var initView = 'month';
               if (scope.defaultView && (scope.defaultView.toLowerCase() == 'week' || scope.defaultView.toLowerCase() == 'agendaweek'))
                   initView = 'agendaWeek';
               else if (scope.defaultView && (scope.defaultView.toLowerCase() == 'day' || scope.defaultView.toLowerCase() == 'agendaday'))
                   initView = 'agendaDay';

               var init = function () {
                   var eopdCal = $(element).fullCalendar({
                       slotDuration: scope.slotPeriod ? scope.slotPeriod : '00:10:00',
                       header: {
                           left: 'prev,next',
                           center: 'title',
                           right: 'month,agendaWeek,agendaDay'
                       },
                       height: 500,
                       defaultView: initView,
                       // editable: true,
                       selectable: true,
                       firstDay: 1,
                       minTime: '08:00:00',
                       maxTime: '20:00:00',
                       timezone: 'local',
                       events: function (start, end, timezone, callback) {
                           callback(scope.calendarData);
                           //callback(scope.calendarAvailablity);
                       },
                       viewRender: function (view) {
                           if (scope.refreshData) {
                               scope.refreshData({ view: view });
                           }
                       },
                       dayRender: function (date, cell) {
                           var today = new Date();
                           if (date._d.getDate() === today.getDate() && date._d.getMonth() === today.getMonth() && date._d.getYear() === today.getYear()) {
                               cell.css("background-color", "#fcf8e3");
                           }
                       },
                       dayClick: function (/*date, jsEvent, view*/) {

                       },
                       eventClick: function (date, jsEvent, view) {

                       },
                       eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {

                       },
                       eventMouseover: function (data, jsEvent, view) {
                           var tooltip = '<div class="tooltiptopicevent" style="width:auto;height:auto;background:#feb811;position:absolute;z-index:10001;padding:10px 10px 10px 10px ;  line-height: 200%;">' + data.title + '</br>' + moment(data.start).format('hh:mm a') + ' - ' + moment(data.end).format('hh:mm a') + '</div>';
                           $("body").append(tooltip);
                           $(this).mouseover(function (e) {
                               $(this).css('z-index', 10000);
                               $('.tooltiptopicevent').fadeIn('500');
                               $('.tooltiptopicevent').fadeTo('10', 1.9);
                           }).mousemove(function (e) {
                               $('.tooltiptopicevent').css('top', e.pageY + 10);
                               $('.tooltiptopicevent').css('left', e.pageX + 20);
                           });
                       },
                       eventMouseout: function (event, jsEvent, view) {
                           $(this).css('z-index', 8);
                           $('.tooltiptopicevent').remove();
                       },
                       select: function (start, end, jsEvent, view) {
                           var available = false;
                           var startD = start;
                           var endD = end;

                           function findDate(selectedDate) {
                               if (selectedDate.date == startD.format('YYYY-MM-DD')) {// startD.format('YYYY-MM-DD'))
                                   var slots = selectedDate.slots.split(',');
                                   var slotAvailable = false;
                                   for (var i = 0; i < slots.length; i++) {
                                       if (slots[i].split('-')[0] == startD.format('HH:mm')) //+'-'+endD.format('HH:mm')
                                           slotAvailable = true;
                                   }
                                   return slotAvailable;
                               }
                               return false;
                           }

                           available = scope.calendarAvailablity.find(findDate);

                           if (available) {
                               scope.$evalAsync(function () {
                                   if (scope.selectedSlot)
                                       scope.selectedSlot = { start: start, end: end, clinicCode: available.clinicCode };
                               });
                           }
                           else {
                               eopdCal.fullCalendar('unselect');
                           }
                       }
                   });
               }
               init();

               scope.$watchCollection("calendarData", function (n, o) {
                   if (n !== o) {
                       $(element).fullCalendar('refetchEvents');
                   }
               });

               scope.$watchCollection("slotPeriod", function (n, o) {
                   if (n !== o) {
                       $(element).fullCalendar("destroy");
                       init();
                   }
               });

               scope.$on('$destroy', function () {
                   $(element).fullCalendar("destroy");
               });
               //element.fullCalendar('render');
           }
       };
   });
