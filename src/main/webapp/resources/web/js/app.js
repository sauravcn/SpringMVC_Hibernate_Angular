var taskManagerModule = angular.module('taskManagerApp', ['ngAnimate']);

taskManagerModule.controller('taskManagerController', function ($scope,$http) {
 
 var urlBase="http://localhost:8080/humanTrafficking";
 $scope.toggle=true;
 $scope.selection = [];
 $scope.statuses=['ACTIVE','COMPLETED'];
 //$scope.priorities=['HIGH','LOW','MEDIUM'];
 $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
 
 //get all tasks and display initially
 $http.get(urlBase+'/rest/law').
     success(function(data) {
         $scope.laws = data;
         for(var i=0;i<$scope.laws.length;i++){
             if($scope.laws[i].status=='COMPLETED'){
              $scope.selection.push($scope.laws[i].id);
         }
         }
    });
 
 //add a new task
 $scope.addLaw = function addLaw() {
  if($scope.law=="" || $scope.type=="" || $scope.summary == "" || $scope.resourceLink == ""){
   alert("Insufficient Data! Please provide values");
  }
  else{
   $http.post(urlBase + '/rest/law/add/' +$scope.name+'/'+$scope.type+'/'+$scope.summary+'/'+$scope.resourceLink +'/'+$scope.status).
    success(function(data) {
    alert("Law added");
    $scope.law = data; 
    $scope.name="";
    $scope.type="";
    $scope.summary="";
    $scope.resourceLink=""; 
    $scope.status=""; 
    $scope.toggle='!toggle'; 
      });
  }
 };
 
 $scope.deleteLaw = function deleteLaw() {

	   $http.post(urlBase + '/rest/law/delete/'+$scope.id).
	    success(function(data) {
	    alert("Law deleted");
	      });
	  
	 };
 
//toggle selection for a given task by task id
 $scope.toggleSelection = function toggleSelection(id) {
   var idx = $scope.selection.indexOf(id);

   // is currently selected
   if (idx > -1) {
     $http.post(urlBase + '/rest/law/' +id+'/ACTIVE').
  success(function(data) {
  alert("Task unmarked");
  $scope.laws = data;         
    });
     $scope.selection.splice(idx, 1);
   }

   // is newly selected
   else {
     $http.post(urlBase + 'rest/law/' +id+'/COMPLETED').
  success(function(data) {
  alert("Task marked completed");
  $scope.laws = data;
    });
     $scope.selection.push(id);
   }
 };
 
});

//Angularjs Directive for confirm dialog box
taskManagerModule.directive('ngConfirmClick', [
 function(){
         return {
             link: function (scope, element, attr) {
                 var msg = attr.ngConfirmClick || "Are you sure?";
                 var clickAction = attr.confirmedClick;
                 element.bind('click',function (event) {
                     if ( window.confirm(msg) ) {
                         scope.$eval(clickAction);
                     }
                 });
             }
         };
 }]);