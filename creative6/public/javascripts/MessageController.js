(angular.module('app').controller('messageCtrl', ['loginService', '$scope', '$http', '$location', function(loginService, $scope, $http, $location) {

    var rtn = this;

    rtn.selectedMessage = -1;

    console.log("Message controller");

    $scope.getMessages = function(user) {
        var route = 'message/' + loginService.getUser().email;
        $http.get(route).then(function (resp) {
            rtn.messages = resp.data;
        });
    }

    $scope.postMessage = function() {
        var message = {
            User: $scope.sendTo,
            Subject: $scope.subject,
            Message: $scope.message
        }

        var route = 'message';
        $.ajax({
            url: route,
            type: 'POST',
            data: message,
            success: function (data, textStatus) {
                console.log("Status: ", textStatus);
            }
        });

        $scope.getMessages(loginService.getUser());

        $scope.sendTo = '';
        $scope.subject = '';
        $scope.message = '';
    }

    $scope.checkLogin = function() {
        console.log("Checking login");
        console.log("User: ", loginService.getUser().displayName);
        if(!loginService.getUser()) {
            $location.path("/login");
        }
    }

    $scope.logout = function () {
        loginService.logout();
        firebase.auth().signOut();
        $location.path("/login");
    }

	// checks whether the user has any messages or not
	$scope.hasMessages = function() {
		return !!rtn.messages && rtn.messages.length != 0;
	}

	$scope.getUser = function() {
		return loginService.getUser()
	}

    $scope.getUserDisplayName = function() {
        return loginService.getUser().email;
    }
	
	$scope.toggleMessage = function (index) {
        if(rtn.selectedMessage == index) {
            rtn.selectedMessage = -1;
        }
        else {
            rtn.selectedMessage = index;
        }
    }
    
    $scope.messageShowing = function (index) {
        return index === rtn.selectedMessage;
    }

    $scope.checkLogin();

    $scope.getMessages(loginService.getUser());

    setInterval(function () {
        $scope.getMessages(loginService.getUser());
    }, 5000);

}]));