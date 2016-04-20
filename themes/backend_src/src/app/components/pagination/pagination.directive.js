(function () {
  'use strict';

  angular.module('components.pagination')
    .directive('atomPagination', function() {
      return {
        restrict:     'E',
        scope:        true,
        templateUrl:  'app/components/pagination/pagination.html',
        controller: function($scope) {
          $scope.scrollConfig = {
            scrollX: 'bottom',
            scrollY: 'none',
            useBothWheelAxes: true
          };

          $scope.numPerPageOpt = [
            { value: 10,  title: 10},
            { value: 20,  title: 20},
            { value: 50,  title: 50},
            { value: 100, title: 100},
            { value: 0,   title: 'Все'}];

          $scope.curPage = 0;
          //TODO: для тестирования установил значения меньше, потом исправить (0->2, 10->50)
          $scope.perPage = $scope.numPerPageOpt[2];
          $scope.$parent.perPage = $scope.perPage.value;
          $scope.pagesCount = 0;
          $scope.itemsCount = 0;
          var showPages = 5;

          $scope.$on('dataCountReady', function(event, data) {
            $scope.itemsCount = data;
            $scope.pagesCount = $scope.perPage.value > 0 ? Math.ceil($scope.itemsCount / $scope.perPage.value) : 1;
            $scope.pagesCountList = $scope.pagesList();
            //$scope.displayData(0, $scope.perPage);
            $scope.pagesList();
          });



          $scope.onNumPerPageChange = function() {
            $scope.curPage = 0;
            $scope.pagesCount = $scope.perPage.value > 0 ? Math.ceil($scope.itemsCount / $scope.perPage.value) : 1;
            $scope.pagesCountList = $scope.pagesList();
            $scope.displayData($scope.curPage, $scope.perPage.value, $scope.curSortField, $scope.curSortOrder, $scope.searchKeywords);
          };

          $scope.goToPage = function(page) {
            if(page >= 0 && page < $scope.pagesCount) {
              $scope.curPage = page ;
              $scope.displayData($scope.curPage, $scope.perPage.value, $scope.curSortField, $scope.curSortOrder, $scope.searchKeywords);
            }
          };

          $scope.prevPage = function(toFirst) {
            if(toFirst) {
              $scope.goToPage(0);
              return false;
            }
            if ($scope.curPage > 0) {
              $scope.goToPage($scope.curPage - 1);
            }
          };

          $scope.nextPage = function(toLast) {
            if(toLast) {
              $scope.goToPage($scope.pagesCount - 1);
              return false;
            }
            if ($scope.curPage < $scope.pagesCount - 1) {
              $scope.goToPage($scope.curPage + 1);
            }
          };

          $scope.noPrevious = function() {
            return $scope.curPage <= 0;
          };

          $scope.noNext = function() {
            return $scope.curPage + 1 >= $scope.pagesCount;
          };

          $scope.isActive = function(page) {
            return $scope.curPage == page;
          };

          $scope.pagesList = function() {
            var list = [];
            if($scope.pagesCount > 0) {
              for(var i = 1; i <= $scope.pagesCount; i++) {
                list.push(i);
              }
            }
            return (list.length)?list:[1];
          };

          $scope.isInRange = function(page) {

            var actualPagesList = $scope.pagesCount//getPages($scope.pagesCount, $scope.curPage);

            return true;//actualPagesList.indexOf(page) >= 0;
          };

          function getPages(pages, page){

            var min = 0;
            var max = 0;

            if(pages > showPages){
              var a = page - Math.floor(showPages/2) + 1;
              min = (a <= 0) ? 1 : a;
              max = min + showPages - 1;
              if(max >= pages) {
                max = pages;
                min = max - showPages + 1;
              }
            }else{
              min = 1;
              max = pages;
            }

            var arr = [];

            for(var i = min; i <= max; i++) {
              arr.push(i - 1);
            }
            return arr;
          };
        }
      };
    });

})();
