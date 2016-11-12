
function loadImages( user ) {
    var urls = "";
    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    // Create a reference from a Google Cloud Storage URI
    for( x in [ 1,2,3 ] ) {
	var gsReference = storage.refFromURL('gs://yumejs-42402.appspot.com/images/' + user.uid + "/" + x + ".jpg" );
	gsReference.getDownloadURL().then( function( url ) {
		console.log( "URL: " + url );
	    urls += "<a ng-click='addImage(\"" + url + "\")'>" + url + "</a>";
	    } ).catch( function( err ) {
		console.log( "Err: " + err );
	    } );
	console.log( "Checking..." );
    }
    
    // Create a reference from an HTTPS URL
    // Note that in the URL, characters are URL escaped!
    // var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');
    console.log( gsReference );
return urls;
}
