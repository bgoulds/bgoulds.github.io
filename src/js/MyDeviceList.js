var app = angular.module("MyDeviceList", ["ngRoute"]);

app.service("myService", function () {
  this.products = [];
  this.detailItem;
})

app.controller("myCtrl", function ($scope, $location, myService) {
  var http = new Dozuki.http.jquery($);
  var dozuki = new Dozuki("www.ifixit.com", http);
  $scope.products = myService.products;
  $scope.showDevices = true;
  $scope.showDetail = false;

  $scope.queryForDevice = function (query) {
    dozuki.search.get($scope.query).then(function (guide) {
      $scope.results = guide.results;
      $scope.showDevices = false;
      $scope.showSearch = true;
      $location.url("/Search");
      $scope.$apply();
    });
  }

  $scope.viewInDetail = function (device) {

    if ($scope.products.indexOf(device) >= 0) {
      $scope.buttonLabel = "Remove From List";
    } else {
      $scope.buttonLabel = "Add to List";
    }
    $scope.detailItem = device;
    $scope.showSearch = false;
    $scope.showDetail = true;
    $scope.showDevices = false;
  }

  $scope.toggleItem = function () {
    var index = $scope.products.indexOf($scope.detailItem);
    if (index >= 0) {
      $scope.buttonLabel = "Add to List";
      $scope.products.splice(index, 1);
    } else {
      $scope.products.push($scope.detailItem);
      $scope.buttonLabel = "Remove from List";
    }
  }

  $scope.viewDevices = function () {
    $scope.showDetail = false;
    $scope.showDevices = true;
    $scope.results = [];
    $scope.showSearch = false;
  }

  $scope.returnFromDetail = function () {
    if ($scope.results.length > 0) {
      $scope.showSearch = true;
    } else {
      $scope.showDevices = true;
    }
    $scope.showDetail = false;

  }
});

app.controller("detailControl", function ($scope, myService) {
  $scope.item = detailItem;
});