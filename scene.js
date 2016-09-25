var data = {};
var sceneIndex = 0;
data.models = [];
data.duration = 10;
data.models.push( { name: "man",
		    initialRotation: { y: 100 },
		    rotation: { y: -110 },
		    // movement: { y: 40 },
		    position: { x: 40, y: 100, z: 150 } } );
data.models.push( { name: "monitor",
		    initialRotation: { y: 15 },
		    position: { x: 275, y: 10, z: -400 } } );
data.models.push( { name: "mobster",
		    initialRotation: { y: 339, x: 200 },
		    position: { x: 200, y: 90, z: -250 } } );

data.camera = {};
data.camera.x = 100;
data.camera.y = 30;
data.camera.z = -150;
data.caption = "When I became a software developer twenty years ago, I told myself I would never become that guy: chained to my desk, immovable, uptight, angry. CYNICAL!";

//data.models.push( { name: "table" } );
var scenes = [];
scenes.push( data );

data2 = {};
data2.duration = 5;
data2.models = [];
data2.caption = "But, I had to be honest with myself. <br/><br/> It happened anyway.";
data2.models.push( { name: "face", position: { x: 0, y: 50, z: 150 } } );
data2.camera = {};
data2.camera.z = -40;
scenes.push( data2 );

data3 = {};
data3.models = [];
data3.caption = "But, then I discovered <a href='https://github.com/xrd/yume.js' target='_new'>yume.js</a>.<br/><br/>I started creating comics on my mobile phone.<br/><br/>And, life was never the same <i>drudgery again.</i>";
data3.models.push( { name: "monitor", position: { y: 40 } } ); 
data3.duration = 10;
data3.camera = {};
data3.camera.x = 0;
data3.camera.y = 0;
data3.camera.z = -200;
scenes.push( data3 );
