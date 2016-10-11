(function() {
  'use strict';

  angular.module('components.collapseNav')
    .directive('collapseNav', function(SessionService) {

      return {
        restrict:    'A',
        controller: function ($scope, $stateParams) {
          $scope.openCurrent = function () {
            angular.element('#' + $stateParams.entity).parent('ul.submenu').slideToggle();
          };
        },
        link: function(scope, ele, attrs) {
          startMenu();
          function startMenu () {
            if (ele.find('ul').parent('li').length < 1) {
              setTimeout(startMenu, 500);
            } else {
              var $a, $aRest, $app, $lists, $listsRest, $nav, $window, Timer, prevWidth, updateClass;
              $window = $(window);
              $lists = ele.find('ul').parent('li');
              $lists.append('<i class="fa fa-angle-down icon-has-ul-h"></i><i class="fa fa-angle-right icon-has-ul"></i>');
              $lists.removeClass('open').find('ul').hide();
              scope.openCurrent();
              $a = $lists.children('a');
              $listsRest = ele.children('li').not($lists);
              $aRest = $listsRest.children('a');
              $app = $('#app');
              $nav = $('#nav-container');
              $a.on('click', function (event) {
                var $parent, $this;
                if ($app.hasClass('nav-collapsed-min') || ($nav.hasClass('nav-horizontal') && $window.width() >= 768)) {
                  return false;
                }
                $this = $(this);
                $parent = $this.parent('li');
                $lists.not($parent).removeClass('open').find('ul').slideUp();
                $parent.toggleClass('open').find('ul').stop().slideToggle();
                return event.preventDefault();
              });
              $aRest.on('click', function (event) {
                return $lists.removeClass('open').find('ul').slideUp();
              });
              scope.$on('nav:reset', function (event) {
                return $lists.removeClass('open').find('ul').slideUp();
              });
              Timer = void 0;
              prevWidth = $window.width();
              updateClass = function () {
                var currentWidth;
                currentWidth = $window.width();
                if (currentWidth < 768) {
                  $app.removeClass('nav-collapsed-min');
                }
                if (prevWidth < 768 && currentWidth >= 768 && $nav.hasClass('nav-horizontal')) {
                  $lists.removeClass('open').find('ul').slideUp();
                }
                prevWidth = currentWidth;
                return prevWidth;
              };
              return $window.resize(function () {
                return setTimeout(updateClass, 300);
              });
            }
          }
        }
      };
    });

})();