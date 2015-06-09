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
    $scope.form = {name : 'newForm'};
    $scope.types = ['text', 'date', 'number', 'scale'];
    $scope.selectedQuestions = [];
    $scope.newSection = {};
    $scope.newQuestion = {};
    $scope.sections = [{name: 'design', id: 1}, {name:'general', id:2}, {name: 'commercial', id:3}];
    $scope.selectedSections = [];
    $scope.currentSection = {name: 'Add sections', id: 0};
    $scope.changeCurrentSection = function (newSection) {
        $scope.currentSection = newSection;
        console.log($scope.selectedSections.indexOf(newSection));
        if ($scope.selectedSections.indexOf(newSection) < $scope.selectedSections.length) {
            $scope.nextSection = $scope.selectedSections [$scope.selectedSections.indexOf(newSection) + 1]
        } else {
            $scope.nextSection = false;
        }
        if ($scope.selectedSections.indexOf(newSection) > 0) {
            $scope.prevSection = $scope.selectedSections[$scope.selectedSections.indexOf(newSection) - 1]
        } else if ($scope.selectedSections.indexOf(newSection) == 0) {
            $scope.prevSection = {name: 'Add sections', id: 0};
        }
    };
    $scope.createSection = function (newSection) {
        if ($filter('filter')($scope.sections, 'name', newSection.name).length == 0) {
            $scope.sections.push(newSection)
        }
        if ($filter('filter')($scope.selectedSections, 'name', newSection.name).length == 0) {
            $scope.selectedSections.push(newSection);
        }
        $scope.newSection = {}
    };
    $scope.createQuestion = function (newQuestion) {
        if ($filter('filter')($scope.questions, 'name', newQuestion.name).length == 0) {
            $scope.questions.push(newQuestion)
        }
        if ($filter('filter')($scope.selectedQuestions, 'name', newQuestion.name).length == 0) {
            $scope.selectedQuestions.push(newQuestion)
        }
        $scope.newQuestion = {}
    };
    $scope.addSection = function (section) {
        if ($scope.selectedSections.indexOf(section) == -1) {
            $scope.selectedSections.push(section);
            if ($scope.selectedSections.length == 1) {
                $scope.nextSection = section;
            }
        }
    };
    $scope.addQuestion = function (question) {
        var newQuestion = {};
        newQuestion.name = question.name;
        $scope.selectedQuestions.push(newQuestion)
    }
});