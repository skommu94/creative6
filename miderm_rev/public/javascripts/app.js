var app = window.angular.module('app', [])

app.factory('fetcher', fetcher)
app.controller('mainCtrl', mainCtrl)

function fetcher ($http) {
return {

    	getC: function() {
      		var candidates = "/getItems";
      		return $http
        	.get(candidates)
        	.then(function (resp) {
          		console.log("Get Worked");
          		console.log(resp.data);
          		return resp.data
        	})
   	},

	addC: function(name, price, image){
		var addURL = "/addItem?name="+name+"&price="+price+"&image="+image;
		return $http
		.get(addURL)
		.then( function(resp) {
			console.log("adding")
			return resp.data;
		});
	},

	delC: function(name) {
		var delURL = "/delItem?name="+name;
		return $http
		.get(delURL)
		.then( function(resp) {
			return resp.data;
		}); 
	},
	
	upC: function(name) {
		var upURL = "/updateItem?name="+name;
		return $http
		.get(upURL)
		.then( function(resp) {
			return resp.data;
		});
	}
  }
}


function mainCtrl ($scope, fetcher) {

  	$scope.info="No Changes Made";
 	$scope.items = [];
	$scope.checked = [];
	$scope.submitted = [];
	$scope.getItems = function() {
		fetcher.getC()//$scope.addName)
    		.then(function (data) {
		      console.log("tryit");
		      console.log(data);
		      $scope.items=data;
		});
	}

	$scope.addItem = function() {
		fetcher.addC($scope.nameField, $scope.priceField, $scope.imageField)
		.then( function(data) {
			console.log(data);
			//$scope.info=data.message;
			$scope.getItems();
		});
			
	}
	
	$scope.delItem = function(name) {
		fetcher.delC(name)
		.then( function(data) {
			console.log("start get");
			$scope.getItems();
		});
	}

	$scope.upItem = function() {
		//console.log($scope.checked);
		$scope.checked = $.grep($scope.items, function( check ) {
		        return $scope.checked[ check.Name ];
      		});	
		
		console.log($scope.checked);
		$scope.submitted = []
		for(x in $scope.checked)
		{
		 	var name = $scope.checked[x].Name;
			$scope.submitted.push($scope.checked[x]);
			fetcher.upC(name)
			.then( function(data) {
				console.log(data)
			});
		}
		$scope.getItems();
	}
	
	$scope.getItems();
}

