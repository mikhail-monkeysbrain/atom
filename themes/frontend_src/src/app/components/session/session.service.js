(function() {
  'use strict';

  angular.module('components.session')
    .service('SessionService', function SessionService($cookies, Session) {

      this.getUserID = function() {
        return $cookies.get('userId');
      };

      this.setUserID = function(userId) {
        var expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + 3*60*60*1000);
        return $cookies.put('userId', userId, { expires: expireDate });
      };

      this.setSessionID = function(sessionId) {
        //TODO: Remove storage in cookies for prod
        var expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + 3*60*60*1000);
        return $cookies.put('sessionId', sessionId, { expires: expireDate });
      };

      this.getSessionID = function() {
        return $cookies.get('sessionId');
      };

    });
})();
