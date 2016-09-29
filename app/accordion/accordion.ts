/// <reference path="./../../tools/typings/angularjs/angular.d.ts" />

module Accordion {
     class Accordion implements ng.IDirective {

     	static instance() : ng.IDirective {
			return new Accordion();
		}

		restrict = '';
		replace = true;
		link: (scope, element, attrs, ctrl) => void;
		templateUrl: string = '';

		$http: ng.IHttpService;
		$injector: any;
		$q: ng.IQService;

		constructor() {

			this.restrict = 'E';
				
			this.link = linkFn;

			this.$injector = angular.injector(['Accordion']);

			let options: any = this.$injector.get('__OPTIONS__');

			let $http: ng.IHttpService = this.$injector.get('$http');

			let $q: any = this.$injector.get('$q');

			this.templateUrl = options.__accordionTemplateUrl__;

			function linkFn(scope, element, attrs, ctrl): void {

				let clicks: boolean = false;
				let checkboxes: any = document.querySelectorAll('.accordion-input');
				let index: string;
				let hasLoadedData: any;
				let item: any;
				scope.currentAccordionItemData = [];

				for (let i = 0; i < checkboxes.length; ++i) {
					checkboxes[i].addEventListener('click', click);
				}

				function click(event) {
					clicks = !clicks;
					if (clicks) {
						index = event.target.classList[1];
						
						for (let i = 0; i < scope.currentAccordionItemData.length; ++i) {
							if (index === scope.currentAccordionItemData[i].index) {
								hasLoadedData = scope.currentAccordionItemData[i];
								break;
							}  else {
								hasLoadedData = false;
							}
						}

						if (!hasLoadedData) {
							console.log("item is being loaded.");
							request(options.__dummyDataUrl__ +  '/posts/' + index).then(
								(response: any) => {
									scope.$apply(() => {
										scope.currentAccordionItemData.push({ index: index, data: response });
										scope.currentAccordionData = response;
									});
								},
								(reason: any) => {
									console.log(reason)
								}
							);
						} else {
							console.log('item has already been loaded.');
							scope.$apply(() => {
								scope.currentAccordionData = hasLoadedData.data;
							});
						}
					}
				}

				function request(url): ng.IPromise<any> {
					return $q((resolve, reject) => {
						$http.get(url).then(
							(response: any) => {
								resolve(response.data.body)
							},
							(reason: any) => {
								reject(reason);
							}
						);
					});
				}
			} //end linkFn
		} //end constructor
	} //end class
	angular.module('Accordion').directive('accordion', Accordion.instance);
}