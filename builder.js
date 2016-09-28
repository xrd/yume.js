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

    displayedInlineStyle = { display: "inline" }
    
    $scope.addCharacter = function( scene ) {
	$scope.search = undefined;
	$scope.modal = displayedInlineStyle;
	$scope.backdrop = displayedInlineStyle;
	$scope.selectedScene = scene;
    }

    $scope.setCurrentCharacter = function( scene, character, index ) {
	scene.currentCharacter = character;
	scene.currentCharacterIndex = index;
    }
    
    $scope.selectCharacter = function( character ) {
	$scope.selectedScene.models.push( { name: character } )
	$scope.selectedScene = undefined
	$scope.closeModal();
    }

    $scope.closeModal = function() {
	$scope.modal = $scope.backdrop = undefined
    }
    
    $scope.remove = function( index ) {
	$scope.scenes.splice( index, 1 );
    }

    $scope.removeCharacter = function( scene ) {
	let index = scene.currentCharacterIndex;
	// console.log( "Removing: " + index );
	let parsed = parseInt( index );
	if( !isNaN( parsed ) ) {
	    scene.models.splice( parsed, 1 );
	    scene.currentCharacter = undefined;
	    scene.currentCharacterIndex = undefined;
	}
    }

} ] );
