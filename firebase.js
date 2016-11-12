
// Create a reference with an initial file path and name
var storage = firebase.storage();
// Create a reference from a Google Cloud Storage URI
var gsReference = storage.refFromURL('gs://yumejs-42402.appspot.com/images/' ); // + ghUser.uid );

// Create a reference from an HTTPS URL
// Note that in the URL, characters are URL escaped!
// var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');
console.log( gsReference );
