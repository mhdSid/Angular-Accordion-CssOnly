/// <reference path="./../tools/typings/angularjs/angular.d.ts" />
((): void => {
    angular.module('Accordion').config(configFn);
    configFn.$inject = ['$routeProvider', '$locationProvider', 'cdn']
    function configFn($routeProvider: any, $locationProvider: any, cdn): any {
        $locationProvider.html5Mode(true);
        $routeProvider
        .when('/',
        {
            templateUrl: cdn.mainUrl + 'accordion/accordion.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    };
})();
