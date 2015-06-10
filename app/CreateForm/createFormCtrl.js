app.controller('CreateFormCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $filter) {
    $scope.toggleLeft = buildToggler('left');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        },300);
        return debounceFn;
    }
    $scope.close = function () {
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });
    };

    $scope.questions = [];
    $scope.form = {
        name : 'newForm',
        sections: []
        
    };
    $scope.types = ['text', 'date', 'number', 'scale'];
    $scope.newSection = {};
    $scope.newQuestion = {};
    $scope.sections = [{name: 'design', id: 1}, {name:'general', id:2}, {name: 'commercial', id:3}];
    $scope.currentSection = -1;
    $scope.prevSection = function () {
        $scope.currentSection--
    };
    $scope.nextSection = function () {
        $scope.currentSection++
    };
    $scope.changeCurrentSection = function (index) {
        $scope.currentSection = index;
    };
    $scope.createSection = function (newSection) {
        if ($filter('filter')($scope.sections, 'name', newSection.name).length == 0) {
            $scope.sections.push(newSection);
            //post new section
        }
        if ($filter('filter')($scope.form.sections, 'name', newSection.name).length == 0) {
            $scope.form.sections.push(newSection);
        }
        $scope.newSection = {}
    };
    $scope.createQuestion = function (newQuestion) {
        if ($filter('filter')($scope.questions, 'name', newQuestion.name).length == 0) {
            $scope.questions.push(newQuestion);
            //post new question
        }
        if ($filter('filter')($scope.form.sections[$scope.currentSection].questions, 'name', newQuestion.name).length == 0) {
            $scope.form.sections[$scope.currentSection].questions.push(newQuestion)
        }
        $scope.newQuestion = {}
    };
    $scope.addSection = function (section) {
        if ($scope.form.sections.indexOf(section) == -1) {
            section.questions = [];
            $scope.form.sections.push(section);
        }
    };
    $scope.addQuestion = function (question) {
        var newQuestion = {};
        newQuestion.name = question.name;
        $scope.form.sections[$scope.currentSection].questions.push(newQuestion)
    }
});