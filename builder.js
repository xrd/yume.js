var mod = angular.module( 'builder', [] );

mod.controller( 'BuilderCtrl', [ '$scope', '$location', function( $scope, $location ) {

    $scope.scenes = []

    $scope.characters = [
	"man",
	"face",
	"mobster",
	"monitor",
	"phone",
	"raptor",
	"spinosaurus",
	"trex",
	"parasaur",
	"pteranodon"
    ];
    
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
	if( 1 == $scope.scenes.length ) {
	    $scope.scenes[0].expanded = true;
	}
    }

    modalStyle = { display: "inline" }
    backdropStyle = { display: "inline" }
    
    $scope.addCharacter = function( scene ) {
	$scope.modal = modalStyle
	$scope.backdrop = backdropStyle
	$scope.selectedScene = scene
    }

    $scope.setCurrentCharacter = function( scene, character ) {
	scene.currentCharacter = character;
    }
    
    $scope.selectCharacter = function( character ) {
	$scope.selectedScene.models.push( { name: character } )
	$scope.selectedScene = undefined
	$scope.modal = $scope.backdrop = undefined
    }

    $scope.remove = function( index ) {
	$scope.scenes.splice( index, 1 );
    }

} ] );
