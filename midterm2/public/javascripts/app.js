angular.module('comment', [])
.controller('MainCtrl', [
  '$scope', '$http',
  function($scope, $http){
    $scope.comments = [];

 	$scope.items = [];
	$scope.checked = [];
	$scope.submitted = [];


   $scope.addComment = function() {
     if($scope.formContent === '', $scope.priceField, $scope.imageField ) { return; }
      console.log("In addComment with "+$scope.formContent);
      $scope.create({
        title: $scope.formContent,
        upvotes: 0,
	price: 0,
	image: $scope.imageField,
      });
      $scope.formContent = '';

   };

   $scope.dovote = function() {
	console.log("In DoVote");
	angular.forEach($scope.comments, function(value,key) {
	 if(value.selected){
		$scope.upvote(value);
		$scope.ballot.push(value);
		console.log("submitted");
	}
});
}
   
   $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });
    };

 $scope.price = function(comment) {
      return $http.put('/comments/' + comment._id + '/price')
        .success(function(data){
          console.log("price worked");
          comment.price += 1;
        });
    };

   $scope.incrementUpvotes = function(comment) {
     $scope.upvote(comment);
   };

   $scope.delete = function(comment) {
      $http.delete('/comments/' + comment._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };

   $scope.create = function(comment) {
    return $http.post('/comments', comment).success(function(data){
      $scope.comments.push(data);
    });
  };   

   $scope.getAll = function() {
    return $http.get('/comments').success(function(data){
      angular.copy(data, $scope.comments);
    });
  };
  $scope.getAll();

  }
]);
