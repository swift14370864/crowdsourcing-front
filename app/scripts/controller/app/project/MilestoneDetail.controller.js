'use strict';

app.controller('MilestoneDetailController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory', 'ui.sortable', function($scope,
    $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory) {

    $scope.tab = 1;

    var project_id = $stateParams.id;
    var milestoneId = $stateParams.milestoneId;
    
    $scope.projectName = "";

    var errorHandler = ErrorHandlerFactory.handle;

    init();

    function init(){
      console.log('ready to get yardstick code content!');
      
      getMilestoneDetail();

    }

    function getMilestoneDetail() {
      ProjectFactory.getMilestoneDetails().get({
				'id':project_id,
        'milestoneId':milestoneId
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response);
          $scope.milestone = data.milestone;

          getMilestoneLabels();
				}else{
	        errorHandler(response);
				}
			})
      .catch(errorHandler);
    }

    
    function getMilestoneLabels(){
      ProjectFactory.getMilestoneLabels().get({
        'id':project_id,
        'milestone':$scope.milestone.title
      })
      .$promise
      .then(function(response){
        if(HttpResponseFactory.isResponseSuccess(response)){
          var data = HttpResponseFactory.getResponseData(response);
          $scope.labels = data;
        }else{
          errorHandler(response);
        }
      })
      .catch(errorHandler);
    }
    
    $scope.sortableOptions = {
        connectWith: ".connectList"
    };
        

}]);