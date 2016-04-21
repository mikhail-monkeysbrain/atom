!function(){"use strict";angular.module("demo",[]).config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("app",{url:"/"}),e.otherwise("/"),t.state("app.demo",{url:"demo",views:{"content@":{templateUrl:"app/modules/demo/demo.html",controller:"DemoCtrl"}}}).state("app.demo.read",{url:"/:id",views:{"content@":{templateUrl:"app/modules/demo/read/demoRead.html",controller:"DemoReadCtrl"}}})}])}(),function(){"use strict";angular.module("demo").controller("DemoReadCtrl",["$scope",function(t){t.foo="test"}])}(),function(){"use strict";angular.module("authorization",[]).config(["$stateProvider","$urlRouterProvider",function(t,e){e.otherwise("/"),t.state("login",{url:"/login",views:{"content@":{templateUrl:"app/modules/authorization/signin/authorization.html",controller:"AuthorizationCtrl"}}}).state("logout",{url:"/logout",views:{"content@":{templateUrl:"app/modules/authorization/signin/authorization.html",controller:"AuthorizationCtrl"}}}).state("register",{url:"/signup",views:{"content@":{templateUrl:"app/modules/authorization/signup/registration.html",controller:"RegistrationCtrl"}}})}])}(),function(){"use strict";angular.module("authorization").controller("RegistrationCtrl",["$scope","$state","AuthService",function(t,e,n){t.makeRegistration=function(){n.register(t.user).then(function(t){t.data.success?(toastr.success(t.data.success.message),e.go("login")):toastr.error(t.data.error.message)})}}])}(),function(){"use strict";angular.module("authorization").controller("AuthorizationCtrl",["$scope","$rootScope","$state","$document","$http","$cookies","AuthService","toastr","SessionService","RestrictionsService","$stateParams","loginPeriod",function(t,e,n,i,o,s,r,a,u,c,l,p){var g=31536e6;t.rememberMe=!0,n.is("logout")&&(e.hidePanels=!0,e.authorized=!1,void 0!==u.getSessionID()&&(u.setSessionID(void 0),s.remove("token"),s.remove("rememberMe"),r.logout().then(function(){c.resetPermissions().then(function(){n.go("app")})})),n.go("login")),t.makeLogin=function(){r.login(t.user).then(function(i){if(i.data.success){var o=new Date,r={path:"/"};t.rememberMe?o.setTime(o.getTime()+g):o.setTime(o.getTime()+p),r.expires=o,u.setSessionID(i.data.success.user.token),u.setUserID(i.data.success.user._id.$id),a.success(i.data.success.message),e.authorized=!0,e.userName=i.data.success.user.name,s.put("token",i.data.success.user.token,r),s.put("rememberMe",t.rememberMe?1:0,r),c.resetPermissions().then(function(){n.go("app")})}else a.error(i.data.error.message)})}}])}(),function(){"use strict";angular.module("rest.auth",[]).config(["$provide",function(t){t.decorator("AuthService",["$delegate","$location","AuthServiceMock","debug",function(t,e,n,i){return i&&(t=n),t}])}])}(),function(){"use strict";angular.module("rest.auth").service("RestrictionsAPIService",["$http","$httpParamSerializer","baseURL",function(t,e,n){this.getRestrictions=function(){return t.get(n+"/atom/entities/")}}])}(),function(){"use strict";angular.module("rest.restrictionsAPI",[]).config(["$provide",function(t){t.decorator("RestrictionsAPIService",["$delegate","$location","RestrictionsAPIServiceMock","debug",function(t,e,n,i){return i&&(t=n),t}])}])}(),function(){"use strict";angular.module("rest.restrictionsAPI").service("RestrictionsAPIServiceMock",["$http",function(t){this.getRestrictions=function(){return t.get("/app/rest/restrictions/fixture/restrictions.json")}}])}(),function(){"use strict";angular.module("rest.entity",[]).config(["$provide",function(t){t.decorator("EntityService",["$delegate","EntityServiceMock","debug",function(t,e,n){return n&&(t=e),t}])}])}(),function(){"use strict";angular.module("rest.entity").service("EntityServiceMock",["$http","$httpParamSerializer",function(t,e){this.getEntities=function(){return t.get("/app/rest/entity/fixture/entities.json")},this.getEntitiesList=function(e){return t.get("/app/rest/entity/fixture/usersList.json")},this.getEntityDescription=function(e){return t.get("/app/rest/entity/fixture/usersDescription.json")},this.getEntityPage=function(e,n,i){return 0===n?t.get("/app/rest/entity/fixture/usersPage1.json"):t.get("/app/rest/entity/fixture/usersPage2.json")},this.getEntity=function(e,n){return t.get("/app/rest/entity/fixture/userExample.json")},this.saveEntity=function(n,i){return t.get("/app/rest/entity/fixture/userSaved.json",e(i))},this.removeEntity=function(n,i){return t.get("/app/rest/entity/fixture/userSaved.json",e(i))}}])}(),function(){"use strict";angular.module("rest.entity").service("EntityService",["$http","$httpParamSerializer","baseURL",function(t,e,n){this.getEntities=function(){return t.get(n+"/atom/entities/")},this.getEntitiesList=function(e,i){return i=i||0,t.get(n+"/"+e+"/?condition[enabled][$ne]=null&limit="+i)},this.getEntityDescription=function(e){return t.get(n+"/atom/entities/"+e+"/")},this.getEntityPage=function(e,i,o,s,r,a){var u=s&&r?"&sort["+s+"]="+r:"",c=a?"&condition[$search]="+a:"";return t.get(n+"/"+e+"/page/"+i+"/?condition[enabled][$ne]=null&limit="+o+u+c)},this.getEntity=function(e,i){return t.get(n+"/"+e+"/"+i+"/")},this.saveEntity=function(i,o,s,r){var a="undefined"==typeof o._id&&s?"create":"update";return r?t.post(n+"/"+i+"/"+a+"/",o,{headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":void 0,Accept:"application/json"}}):t.post(n+"/"+i+"/"+a+"/",e(o))},this.removeEntity=function(i,o){return t.post(n+"/"+i+"/delete/",e(o))},this.exportEntity=function(t,e,i,o){var s=[];if(e.length)for(var r=0;r<e.length;r++)s.push("condition[_id][$in][]="+e[r]);s=s.join("&");var a=i&&o?"&sort["+i+"]="+o:"",u=angular.element("#downloadLink");u.attr({href:n+"/"+t+"/export/?"+s+a,target:"_self"})[0].click()},this.getLinkedEntities=function(e,i){var o=[],s=[];if(i.length){var r,a;for(r=0,a=0;r<i.length;r++,a++)i[r]&&o.push("condition[_id][$in][]="+i[r].$id),19!=a&&r!=i.length-1||(o=o.join("&"),s.push(t.get(n+"/"+e+"/?"+o+"&limit=0")),a=-1,o=[])}return s}}])}(),function(){"use strict";angular.module("rest.auth").service("AuthServiceMock",["$http",function(t){this.logout=function(){return t.get("/app/rest/auth/fixture/logout_success.json")},this.login=function(e){var n=0===e.email.indexOf("test")?"auth.json":"auth_fail.json";return t.get("/app/rest/auth/fixture/"+n)},this.register=function(e){var n=0===e.email.indexOf("test")?"register.json":"register_fail.json";return t.get("/app/rest/auth/fixture/"+n)}}])}(),function(){"use strict";angular.module("rest.auth").service("AuthService",["$http","$httpParamSerializer","baseURL",function(t,e,n){this.logout=function(){return t.get(n+"/user/logout/")},this.login=function(i){return t.post(n+"/user/auth/pass/",e(i))},this.register=function(i){return t.post(n+"/user/auth/register/",e(i))},this.properties=function(){return t.get(n+"/atom/properties/")}}])}(),function(){"use strict";angular.module("demo").controller("DemoCtrl",["$scope",function(t){t.foo="test"}])}(),function(){"use strict";angular.module("components.session",[]).value("Session",{})}(),function(){"use strict";angular.module("components.session").service("SessionService",["$cookies","Session",function(t,e){this.getUserID=function(){return t.get("userId")},this.setUserID=function(e){var n=new Date;return n.setTime(n.getTime()+108e5),t.put("userId",e,{expires:n})},this.setSessionID=function(e){var n=new Date;return n.setTime(n.getTime()+108e5),t.put("sessionId",e,{expires:n})},this.getSessionID=function(){return t.get("sessionId")}}])}(),function(){"use strict";angular.module("components.restrictions",[])}(),function(){"use strict";angular.module("components.restrictions").service("RestrictionsService",["$q","RestrictionsAPIService",function(t,e){function n(){return angular.isDefined(i.permissionsMap)?t.when(i.permissionsMap):e.getRestrictions().then(function(t){return i.permissionsMap=t.data,i.permissionsMap})}var i=this;this.hasPermissions=function(t){return n().then(function(e){var n=t.split(".");if(1===n.length)return!0;var i=n[1],o=n[2];return i&&e[i]?angular.isDefined(e[i].routes[i+"."+o]):!1})},this.resetPermissions=function(){return e.getRestrictions().then(function(t){return i.permissionsMap=t.data,i.permissionsMap})}}])}(),function(){"use strict";angular.module("components.localize",["ngCookies"])}(),function(){"use strict";angular.module("components.localize").directive("localize",["$cookies","$window",function(t,e){return{restrict:"E",templateUrl:"app/components/localize/localize.html",link:function(n,i,o){function s(){"en"==n.lang?n.currentLocale="English":n.currentLocale="Русский"}n.lang=t.get("curLocale")||"en",s(),n.changeLocale=function(i){n.lang!==i&&(n.lang=i,t.put("curLocale",i),s(),e.location.reload())}}}}])}(),function(){"use strict";angular.module("app",["ui.router","ui.bootstrap","ngAnimate","ngTouch","ngCookies","ngSanitize","pascalprecht.translate","components.session","components.restrictions","components.localize","rest.auth","rest.restrictionsAPI","rest.entity","demo","authorization"])}(),function(){"use strict";angular.module("app").run(["$rootScope","$state","$http","SessionService","RestrictionsService",function(t,e,n,i,o){var s=i.getSessionID();s&&(t.authorized=!0),t.$on("$stateChangeSuccess",function(n,s,r,a){t.activePage=s.name,t.activeEntity="pagesList"===s.name?"page":r.entity,"error500"==a.name&&(t.activePage=s.name,t.activeEntity=r.entity,t.hidePanels=!1),o.hasPermissions(s.name).then(function(t){t||e.go("app")});var u=["login","logout"],c=i.getSessionID();!Lazy(u).contains(s.name)&&!c,c&&"login"===s.name&&e.go("app")})}])}(),function(){"use strict";angular.module("app").constant("toastr",toastr).constant("baseURL","").constant("debug",!0).constant("loginPeriod",18e5)}(),function(){"use strict";angular.module("app").config(["$logProvider","$httpProvider","$stateProvider","$locationProvider","$translateProvider","toastr","$provide","baseURL","debug",function(t,e,n,i,o,s,r,a,u){var c;angular.injector(["ngCookies"]).invoke(["$cookies",function(t){c=t}]),i.html5Mode(!0),e.defaults.headers.post={Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"},e.defaults.headers.get={Accept:"application/json"};var l=c.get("curLocale")||"en";u?o.useUrlLoader("app/rest/localize/fixture/translate_"+l+".json"):o.useUrlLoader(a+"/atom/localize/"+l),o.preferredLanguage(l),e.interceptors.push(["$q","$injector","loginPeriod",function(t,e,n){return{request:function(t){var i=e.get("$cookies").get("rememberMe"),o=e.get("$cookies").get("token"),s=e.get("$cookies").get("homepage");if(o&&"0"===i){var r=new Date;r.setTime(r.getTime()+n);var a={expires:r,path:"/"};e.get("$cookies").put("token",o,a),e.get("$cookies").put("rememberMe",o,a),e.get("$cookies").put("homepage",s,a)}return t},responseError:function(n){return 500==n.status&&(e.get("$rootScope").errorMessage=n.data.error.message,e.get("$state").go("error500")),401==n.status?e.get("$state").go("logout"):400==n.status?n.data.error.message&&s.error(n.data.error.message):Lazy(n.data.error["null"]).each(function(t){t.message&&s.error(t.message)}),t.reject(n)}}}]),s.options.timeOut=3e3,s.options.positionClass="toast-top-right",s.options.preventDuplicates=!1,s.options.closeButton=!0}])}(),angular.module("app").run(["$templateCache",function(t){t.put("app/components/localize/localize.html",'<ul class="nav navbar-nav navbar-right localize"><li class=dropdown><a href=# class=dropdown-toggle data-toggle=dropdown role=button aria-haspopup=true aria-expanded=false><img ng-src=app/assets/{{lang}}.gif>{{ currentLocale }}<span class=caret></span></a><ul class=dropdown-menu><li><a ng-click="changeLocale(\'en\')" href=#><img src=app/assets/en.gif> English</a></li><li><a ng-click="changeLocale(\'ru\')" href=#><img src=app/assets/ru.gif> Русский</a></li></ul></li></ul>'),t.put("app/modules/demo/demo.html","<div class=row><h1 class=demoTitle>DEMO</h1><p class=lead>Use this document as a way to quickly start any new project.<br>All you get is this text and a mostly barebones HTML document.</p><p class=lead localize>test</p></div>"),t.put("app/modules/authorization/signin/authorization.html",'<div class=page-signin><div class=main-body><div class=container><div class=form-container><form class=form-horizontal ng-submit=makeLogin() autocomplete=off><fieldset><input style=display:none> <input type=password style=display:none><div class=form-group><div class="btn-icon-lined btn-icon-round btn-icon-sm btn-default-light"><span class="glyphicon glyphicon-envelope"></span></div><input type=email class="form-control input-lg input-round text-center" placeholder=Email ng-model=user.email></div><div class=form-group><div class="btn-icon-lined btn-icon-round btn-icon-sm btn-default-light"><span class="glyphicon glyphicon-lock"></span></div><input type=password class="form-control input-lg input-round text-center" placeholder=Пароль ng-model=user.password></div><div class=form-group><label class="ui-checkbox rememberMeLabel"><input name=checkbox1 type=checkbox value=option2 ng-model=rememberMe> <span>Запомнить меня</span></label></div><div class=form-group><input type=submit class="btn btn-primary btn-lg btn-round btn-block text-center" value=Войти></div></fieldset></form></div></div></div></div>'),t.put("app/modules/authorization/signup/registration.html",'<div class=page-signin><div class=main-body><div class=container><div class=form-container><form class=form-horizontal ng-submit=makeRegistration() autocomplete=off><fieldset><input style=display:none> <input type=password style=display:none><div class=form-group><div class="btn-icon-lined btn-icon-round btn-icon-sm btn-default-light"><span class="glyphicon glyphicon-envelope"></span></div><input type=email class="form-control input-lg input-round text-center" placeholder=Email ng-model=user.email></div><div class=form-group><div class="btn-icon-lined btn-icon-round btn-icon-sm btn-default-light"><span class="glyphicon glyphicon-lock"></span></div><input type=password class="form-control input-lg input-round text-center" placeholder=Пароль ng-model=user.password></div><div class=form-group><input type=submit class="btn btn-primary btn-lg btn-round btn-block text-center" value=Зарегистироваться></div></fieldset></form></div></div></div></div>'),t.put("app/modules/demo/read/demoRead.html","<h1>DEMO READ</h1><p class=lead translate>test</p>")}]);
//# sourceMappingURL=../maps/scripts/app-2575257008.js.map