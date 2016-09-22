function comicEncoder() {
    var json = JSON.stringify( scenes )
    console.log( "JSON: ", json );
    var url = "player.html?comic=" + btoa( json );
    document.write( "<a href='" + url + "'>" + url + "</a>" );
}

comicEncoder();
