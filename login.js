mod.controller( 'ImageCtrl', [ '$scope', function( $scope ) {

    $scope.ghUser = undefined;
    
    $scope.afterSignIn = function(result) {
	console.log( "Inside the sign in action" );
	// This gives you a GitHub Access Token. You can use it to access the GitHub API.
	$scope.token = result.credential.accessToken;
	$scope.user = result.user;
	$scope.loadImages();
	// 3console.log( "URLs", $scope.urls );
    }

    $scope.addImage = function(scene, url) {
	if( !scene.models ) {
	    scene.models = [];
	}
	scene.models.push( { reference: url, type: "image" } );
    }
    
    $scope.signInError = function(error) {
	var errorCode = error.code;
	var errorMessage = error.message;
	var email = error.email;
	var credential = error.credential;
	if (errorCode === 'auth/account-exists-with-different-credential') {
	    alert('You have already signed up with a different auth provider for that email.');
	} else {
	    console.error(error);
	}
    }
    
    $scope.loadImages = function() {
	$scope.urls = [];
	// Create a reference with an initial file path and name
	var storage = firebase.storage();
	// Create a reference from a Google Cloud Storage URI
	for( x in [ 1,2,3 ] ) {
	    var gsReference = storage.refFromURL('gs://yumejs-42402.appspot.com/images/' + $scope.ghUser.uid + "/" + x + ".jpg" );
	    gsReference.getDownloadURL().then( function( url ) {
		console.log( "URL: " + url );
		$scope.urls.push( url ); // + "\")'>" + url + "</a>";
		$scope.$apply();
	    } ).catch( function( err ) {
		console.log( "Err: " + err );
	    } );
	    console.log( "Checking..." );
	}
    }
	
    // Create a reference from an HTTPS URL
    // Note that in the URL, characters are URL escaped!
    // var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');
    // console.log( gsReference );


    $scope.loginToFirebase = function() {
	if (!firebase.auth().currentUser) {
	    var provider = new firebase.auth.GithubAuthProvider();
	    firebase.auth().signInWithPopup(provider).then( $scope.afterSignIn ).catch( $scope.signInError );
	} else {
	    firebase.auth().signOut();
	}
	
    }
    
    $scope.onUserLogin = function(user) {
	if (user) {
	    var displayName = user.displayName;
	    var email = user.email;
	    var emailVerified = user.emailVerified;
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    $scope.ghUser = user;
	    var providerData = user.providerData;
	    $scope.loadImages();
	}

    }
    
    $scope.initFirebase = function() {
	firebase.auth().onAuthStateChanged( $scope.onUserLogin );

    }
    
} ] );
