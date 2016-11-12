function uploadIt() {
    
    // Create a root reference
    var storageRef = firebase.storage().ref();
    
    // File or Blob named mountains.jpg
    var file = document.getElementById('upload_file').files[0];
    
    // Create the file metadata
    var metadata = {
	contentType: 'image/jpeg'
    };
    
    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('images/' + ghUser.uid + "/1.jpg" ).put(file, metadata);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
		  function(snapshot) {
		      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
		      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		      console.log('Upload is ' + progress + '% done');
		      switch (snapshot.state) {
		      case firebase.storage.TaskState.PAUSED: // or 'paused'
			  console.log('Upload is paused');
			  break;
		      case firebase.storage.TaskState.RUNNING: // or 'running'
			  console.log('Upload is running');
			  break;
		      }
		  }, function(error) {
		      switch (error.code) {
		      case 'storage/unauthorized':
			  // User doesn't have permission to access the object
			  break;
			  
		      case 'storage/canceled':
			  // User canceled the upload
			  break;
			  
			  // ...
			  
		      case 'storage/unknown':
			  // Unknown error occurred, inspect error.serverResponse
			  break;
		      }
		  }, function() {
		      // Upload completed successfully, now we can get the download URL
		      var downloadURL = uploadTask.snapshot.downloadURL;
		  });
}
