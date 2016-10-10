var mod = angular.module( 'builder', [ 'ui.bootstrap' ] );

mod.controller( 'BuilderCtrl', [ '$scope', '$location', '$http', '$uibModal', '$document', function( $scope, $location, $http, $uibModal, $document ) {

    var $ctrl = this;

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

    $scope.showVideo = function( parentSelector ) {
	console.log( "Showing video..." );
	// $ctrl.open = function (size, parentSelector) {
	var parentElem = parentSelector ? 
	    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	var modalInstance = $uibModal.open({
	    animation: $ctrl.animationsEnabled,
	    ariaLabelledBy: 'modal-title',
	    ariaDescribedBy: 'modal-body',
	    templateUrl: 'youtube.html',
	    controller: 'ModalInstanceCtrl',
	    controllerAs: '$ctrl',
	    size: 'lg'
	    // appendTo: parentElem
	});
	
	modalInstance.result.then(function (selectedItem) {
	    $ctrl.selected = selectedItem;
	}, function () {
	    $log.info('Modal dismissed at: ' + new Date());
	});
    };

    $scope.init = function() {
	var search = $location.search();
	var decoded = atob( search.comic );
	$scope.scenes = JSON.parse( decoded );

	$http.get( 'characters.json' ).then( function( response ) {
	    $scope.characters = response.data;
	} );
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

mod.controller( 'ModalInstanceCtrl', function ($uibModalInstance ) {
  var $ctrl = this;

  $ctrl.ok = function () {
    $uibModalInstance.close();
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
