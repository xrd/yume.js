

function Yume() {

    var yume = this;
    var FRAMES_PER_SECOND = 30;

    this.toggleCaptionsAndButtons = function( val, previous, next ) {
	// console.log( "Setting CSS val to " + val );
	var caption =  document.getElementById( "caption" );
	if( val == "none" || this.scenes[this.sceneIndex].caption ) {
	    caption.style.display = val;
	}
	
	var nextBtn = document.getElementById( next  );
	var prevBtn = document.getElementById( previous );
	if( nextBtn ) {
	    nextBtn.style.display = val;
	}
	if( prevBtn ) {
	    prevBtn.style.display = val;
	}
	
	// Disable buttons if indexes are at edges.
	if( val != "none" ) {
	    if( yume.sceneIndex == 0 ) {
		// Disable previous
		if( prevBtn ) {
		    prevBtn.style.display = "none";
		}
	    }
	    if( yume.sceneIndex == yume.scenes.length-1 ) {
		// Disable next
		if( nextBtn ) {
		    nextBtn.style.display = "none";
		}
	    }
	}
    }

    this.allowNonMobile = false;
    this.allowAllClients = function() {
	this.allowNonMobile = true;
    }

    this.bindProgressionButtons = function( next, previous ) {
	var nextBtn =  document.getElementById( next );
	if( nextBtn ) {
	    nextBtn.addEventListener( 'click', function() {
		yume.next();
		yume.toggleCaptionsAndButtons( "none", previous, next );
	    });
	}
	else {
	    console.error( "No next button defined in your HTML: please add an element with id='" + next + "' to your HTML" );
	}

	var prevBtn =  document.getElementById( previous );
	if( prevBtn ) {
	    prevBtn.addEventListener( 'click', function() {
		yume.previous();
		yume.toggleCaptionsAndButtons( "none", previous, next );
	    });
	}
	else {
	    console.error( "No previous button defined in your HTML: please add an element with id='" + previous + "' to your HTML" );
	}
	
    }


    this.sceneIndex = 0;
    
    this.load = function( scenes ) {
	this.scenes = scenes;
    }

    this.previous = function() {
	this.sceneIndex--;
	this.remove();
	this.setup();
    }


    this.next = function() {
	this.sceneIndex++;
	this.remove();
	this.setup();
    }
    
    this.remove = function() {
	if( yume.p5 ) {
	    console.log( "Inside removal..." );
	    // Not sure why this fails.
	    yume.p5.remove();
	    yume.p5 = undefined;
	    var el = document.getElementById( "defaultCanvas0" );
	    if( el ) {
		el.parentElement.removeChild( el );
	    }
	}
    }

    this.isMobileContext = function( width, height ) {
	return ( ( width < height && width < 1000 ) || yume.allowNonMobile );
    }

    this.sketch = function( p ) {
	
	var data = yume.scenes[yume.sceneIndex];
	// console.log( "Scene index: ", yume.sceneIndex );
	
	var camX = 0, camY = 0, camZ = 0;
	
	p.setup = function() {
	    if( data ) {
		var width = window.innerWidth, height = window.innerHeight;
		
		console.log( "Setup called, frameRate: " + p.frameCount );
		var caption = document.getElementById( "caption" );
		caption.innerHTML = data.caption;
		camX = 0, camY = 0, camZ = 0;
		
		
		if( width > height ) {
		    // Looks strange if height is less than width.
		    width = height;
		}
		yume.canvas = p.createCanvas( width - 20, height - 70, p.WEBGL );
		yume.canvas.parent( "comic" );
	    }
	    else {
		document.write( "No data defined for this scene, this may mean you have not properly loaded Yume using load(). See documentation." );
	    }
	}
	
	p.preload = function() {
	    if( data && data.models && data.models.length > 0 ) {
		for( var i = 0; i < data.models.length; i++ ) {
		    var name = data.models[i].name;
		    data.models[i].model = p.loadModel( name + ".obj", true );
		}
	    }
	}
	
	// Stolen! From: https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
	// t: current time, b: begInnIng value, c: change In value, d: duration
	function easeInQuad (x, t, b, c, d) {
	    return c*(t/=d)*t + b;
	}
	
	function easeCamera( p ) {
	    var c = data.camera || {};
	    var x = c.x || 0, y = c.y || 0, z = c.z || 0;
	    camX = easeInQuad( camX, p.frameCount, 0, x, data.duration * FRAMES_PER_SECOND );
	    camY = easeInQuad( camY, p.frameCount, 0, y, data.duration * FRAMES_PER_SECOND );
	    camZ = easeInQuad( camZ, p.frameCount, 0, z, data.duration * FRAMES_PER_SECOND );
	    // console.log( "Times: ", camX, camY, camZ );
	    // p.camera( 0.5*p.frameCount, p.frameCount, -2*p.frameCount );
	    p.camera( camX, camY, camZ );
	}
	
	p.draw = function() {
	    if( data ) {
		if( p.frameCount < ( data.duration * FRAMES_PER_SECOND ) ) {
		    if( data.camera ) {
			easeCamera( p );
		    }
		    else {
			p.camera( 0, 0, 0 );
		    }
		}
		else {
		    p.camera( camX, camY, camZ );
		    if( data.duration ) {
			yume.toggleCaptionsAndButtons( "inline-block", "back", "next", this.yume );
		    }
		    else if( p.frameCount < DEFAULT_TIMING * FRAMES_PER_SECOND ) {
			
		    }
		}
		
		p.pointLight(200, 200, 200, 89, 45, 0);
		p.background( 200 );
		
		for( var i = 0; i < data.models.length; i++ ) {
		    var pos = data.models[i].position || {};
		    var x = pos.x || 0;
		    var y = pos.y || 0;
		    var z = pos.z || 0;
		    p.push()
		    p.translate( x, y, z );
		    rot = data.models[i].rotate || {};
		    p.rotateX( p.radians( rot.x ) || 0 ); // convert to radians here!!!
		    p.rotateY( p.radians( rot.y ) || 0 );
		    p.rotateZ( p.radians( rot.z ) || 0 );
		    p.model( data.models[i].model );
		    p.pop();
		}
	    }
	}
    }
    
    this.parse = function( identifier ) {
	var el = undefined;
	if( '#' == identifier[0] ) {
	    // Look up by ID
	    el = document.getElementById( identifier.substr( 1 ) );
	}
	else if( '.' == identifier[0] ) {
	    var els = document.getElementsByClassName( identifier.substr( 1 ) );
	    el = els[0];
	}

	if( el ) {
	    this.processElementForScenes( el );
	    // Remove the HTML from the DOM.
	    // Not sure why this seems to delete the entire body element...
	    // el.parentNode.remove( el );
	    el.style.display = "none";
	}
    }

    this.parseCamera = function( camera ) {
	var theCamera = {};
	if( camera ) {
	    var triple = camera.split( "," );
	    theCamera.x = parseInt( triple[0] || 0 );
	    theCamera.y = parseInt( triple[1] || 0 );
	    theCamera.z = parseInt( triple[2] || 0 );
	}
	return theCamera;
    }
    
    this.parseCaption = function( el ) {
	var text = undefined;
	var captions = el.getElementsByTagName( "yume:caption" );
	if( captions && captions.length > 0 ) {
	    // Use the first one, ignore the rest.
	    text = captions[0].innerHTML;
	}
	return text;
    }

    this.processElementForScenes = function( el ) {
	// console.log( "We got it!" );
	var sceneTags = el.getElementsByTagName( "yume:scene" );
	console.log( "Scene count", sceneTags.length );
	var scenes = [];
	for( var i = 0; i < sceneTags.length; i++ ) {
	    var theScene = {};
	    var scene = sceneTags[i];
	    var duration = scene.getAttribute( "duration" );
	    var camera = scene.getAttribute( "camera" );

	    theScene.camera = yume.parseCamera( camera );
	    theScene.duration = parseInt( duration ) || DEFAULT_SCENE_DURATION;
	    theScene.caption = yume.parseCaption( scene );
	    console.log( "Caption is", theScene.caption );
	    
	    var characters = scene.getElementsByTagName( "yume:character" );
	    theScene.models = [];
	    for( var j = 0; j < characters.length; j++ ) {
		var character = characters[i];
		var name = character.getAttribute( "src" );

		theScene.models.push( { name: name } );
	    }
	    scenes.push( theScene );
	}

	yume.load( scenes );
    }
    
    this.setup = function() {
	if( yume.scenes && yume.scenes.length > 0 ) { 
	    var width = window.innerWidth, height = window.innerHeight;	
	    if( !yume.isMobileContext( width, height ) ) {
		document.write( "<h2>Portrait mode and non-mobile devices are not currently supported. (" + width + ","  + height  + ")</h2>" );
		var nonMobile = document.getElementById( "anydevice" );
		if( nonMobile ) {
		    nonMobile.style.display = "inline-block";
		}
	    }
	    else {
		yume.p5 = new p5( yume.sketch );
	    }
	}
	else {
	    document.write( "No scenes have been loaded before setup. Please review example documentation." );
	}
    }
}

