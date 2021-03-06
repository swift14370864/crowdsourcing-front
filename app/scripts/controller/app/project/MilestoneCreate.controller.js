'use strict';

app.controller('MilestoneCreateController' ,['$scope', '$state','$stateParams', 'ToasterTool', 'ProjectFactory','SessionService', function($scope,
    $state, $stateParams,ToasterTool, ProjectFactory, SessionService) {


    init();
    var project_id = $stateParams.id;

    function init(){
      console.log($state);
      console.log('ProjectCreateController Init');
      
      
      $scope.createmilestone= createmilestone;

    }

    console.log(project_id);

    function createmilestone(){

       var milestone_name = $scope.milestone_name;
       var description = $scope.description;
       var due_date = $scope.due_date;
       var start_date = $scope.start_date;
       
               

        ProjectFactory.createMilestone().post({
            'id':project_id,
            'title':milestone_name,
            'start_date': start_date,
            'due_date':due_date,
            'description':description,
            

        }).$promise
          .then(function (data) {
            console.log(data.success);
            if (data.success) {
                ToasterTool.success('新建成功！');
                $state.go('app.milestone',{
                    'id':project_id
                });
            } else {
                ToasterTool.error('错误', data.message);
            }
        });

    }

}]);

