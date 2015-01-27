angular.module("application").directive("componentBracket", function () {
    return {
        transclude: true,
        scope: {horizontal: "@"},
        templateUrl: 'modules/application/partial/component-bracket.html'
    };
});
