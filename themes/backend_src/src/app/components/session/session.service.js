(function() {
  'use strict';

  angular.module('components.session')
    .service('SessionService', function SessionService($cookies, Session) {

      this.getUserID = function() {
        return $cookies.get('userId');
      };

      this.setUserID = function(userId, period) {
        var expireDate = new Date();
        period = period || (expireDate.getTime() + 3*60*60*1000);
        expireDate.setTime(period);
        return $cookies.put('userId', userId, { expires: expireDate });
      };

      this.setSessionID = function(sessionId, period) {
        var expireDate = new Date();
        period = period || (expireDate.getTime() + 3*60*60*1000);
        //TODO: Remove storage in cookies for prod

        expireDate.setTime(period);
        return $cookies.put('sessionId', sessionId, { expires: expireDate });
      };

      this.getSessionID = function() {
        return $cookies.get('sessionId');
      };

      this.setEntityListState = function(entityConfib, entityName) {
        return $cookies.putObject('entity_' + entityName, entityConfib);
      };

      this.getEntityListState = function(entityName) {
        return $cookies.getObject('entity_' + entityName);
      };

    });
})();
