(function () {
    'use strict';

    angular.module('atom')
        .config(function ($logProvider, $httpProvider, $stateProvider, toastr, SessionServiceProvider) {
            $httpProvider.defaults.headers.post = {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            $httpProvider.defaults.headers.get = {'Accept': 'application/json'};

            if (SessionServiceProvider.$get().getSessionID()) {
                $httpProvider.defaults.headers.common.Token = SessionServiceProvider.$get().getSessionID();
            }

            $httpProvider.interceptors.push(function ($q, $injector, _, loginPeriod) {
                return {
                    request: function (config) {
                        var remember = $injector.get('$cookies').get('rememberMe');
                        var token = $injector.get('$cookies').get('token');
                        var homepage = $injector.get('$cookies').get('homepage');

                        if (token && remember === '0') {
                            var loginExpirationDate = new Date();
                            loginExpirationDate.setTime(loginExpirationDate.getTime() + loginPeriod);
                            var tokenCookieParams = {
                                expires: loginExpirationDate,
                                path: '/'
                            };
                            $injector.get('$cookies').put('token', token, tokenCookieParams);
                            $injector.get('$cookies').put('rememberMe', token, tokenCookieParams);
                            $injector.get('$cookies').put('homepage', homepage, tokenCookieParams);
                        }

                        return config;
                    },
                    responseError: function (rejection) {
                        if (rejection.status == 500) {
                            $injector.get('$rootScope').errorMessage = rejection.data.error.message;
                            $injector.get('$state').go('error500');
                        }
                        if (rejection.status == 401 && rejection.config.url !== "/user/logout/") {
                            $injector.get('$state').go('logout');
                        } else if (rejection.status == 400) {
                            if (rejection.data.error.message)
                                toastr.error(rejection.data.error.message);
                        } else if (rejection.status == 403) {
                            if (rejection.config.url == "/atom/properties/") {
                                if (rejection.data.error.message)
                                    toastr.error(rejection.data.error.message);
                                $injector.get('$state').go('logout');
                            }
                        } else {
                            _.each(rejection.data.error.null, function (error) {
                                if (error.message)
                                    toastr.error(error.message);
                            });
                        }

                        return $q.reject(rejection);
                    }
                };
            });

            // Enable log
            $logProvider.debugEnabled(true);

            // Set options third-party lib
            toastr.options.timeOut = 3000;
            toastr.options.positionClass = 'toast-top-right';
            toastr.options.preventDuplicates = false;
            toastr.options.closeButton = true;
        })
        .value('froalaConfig', {
            toolbarButtons: [
                'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough',
                'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color',
                'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat',
                'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-',
                'insertLink', 'insertImage', 'insertVideo', 'insertFile',
                'insertTable', 'undo', 'redo', 'clearFormatting',
                'selectAll', 'html', 'quote', 'insertHR'],
            toolbarInline: false,
            language: 'ru',
            heightMin: 100,
            heightMax: 200
        });
})();
