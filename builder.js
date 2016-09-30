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
	"pteranodon",
	"image"
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

	var theImage = undefined;
	
	let image = document.getElementById( "image" );
	image.onchange = something;
	function something( evt, stuff ) {
	    var files = evt.target.files; // FileList object
	    // Loop through the FileList and render image files as thumbnails.
	    for (var i = 0, f; f = files[i]; i++) {
		// Only process image files.
		if (!f.type.match('image.*')) {
		    continue;
		}
		var reader = new FileReader();
		// Closure to capture the file information.
		reader.onload = function( e ) {
		    // Render thumbnail.
		    var output = document.getElementById( "output" );
		    window.theImage = e.target.result;
		}
		reader.readAsDataURL( f );
	    }
	}

    }

    displayedInlineStyle = { display: "inline" }
    
    $scope.slurpImageIntoScene = function( scene ) {
	scene.models.push( { name: 'image', data: window.theImage, type: 'image' } );
    }
    
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


