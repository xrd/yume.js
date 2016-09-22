function decoder() {
    
    var found = false;
    console.log( window.location );
    //window.location.
    var search = window.location.search;
    if( '?' == search[0] ) {
	var items = search.substr( 1 ).split( "&" );

	for( var i = 0; i < items.length; i++ ) {
	    var tuple = items[i].split( "=" );
	    if( "comic" == tuple[0] ) {
		try {
		    var json = atob( tuple[1] );
		    var scenes = JSON.parse( json );
		    var yume = new Yume();
		    yume.load( scenes );
		    yume.setup();
		    yume.bindProgressionButtons( "next", "back" );
		    found = true;
		}
		catch ( error ) {
		    console.log( "Error", error );
		}
	    }
	}
    }

    if( !found ) {
	document.write( "<h1>Player needs a ?comic=base64encoded... in the URL</h1>" );
    }
    
}

decoder();
