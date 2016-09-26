var mod = angular.module( 'builder', [] );

mod.controller( 'BuilderCtrl', [ '$scope', '$location', function( $scope, $location ) {

    $scope.scenes = []

    $scope.encoded = "";

    $scope.init = function() {
	var search = $location.search();
	var decoded = atob( search.comic );
	$scope.scenes = JSON.parse( decoded );
    }

    $scope.previewSceneLink = function( scene ) {
	encoded = btoa( JSON.stringify( [ scene ] ) );
	return encoded;
    }
    
    $scope.$watch( 'scenes', function( newVal, oldVal ) {
	console.log( "Scenes changed." );
	$scope.encoded = btoa( JSON.stringify( $scope.scenes ) );
	$location.search( "comic", $scope.encoded );
    }, true );

    $scope.add = function() {
	$scope.scenes.push( { models: [], duration: 5 } );
    }

    $scope.remove = function( index ) {
	$scope.scenes.splice( index, 1 );
    }

} ] );
