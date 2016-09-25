# Yume.js: make comics on your mobile device.

Yume.js builds on top of the excellent [P5.js](https://p5js.org/libraries/)
library and makes it easy to create shareable and hackable 3D (WebGL) comics
from your mobile device.

## Why yume.js?

Yume (夢) means dream in Japanese. Yume.js helps me revisit the creativity of my childhood and is an homage to the first Japanese comic book by Koikawa Harumachi's "Master Flashgold's Splendiferous Dream" (金々先生栄花の夢Kinkin sensei eiga no yume) from 1775.

## Getting started

Use the [builder](https://xrd.github.com/yume.js/builder.html) to play with comics from your mobile device.

## Why?

It is (was) too hard to make comics on my mobile phone: writing JavaScript and CSS animations and HTML is impossible. So, I wrote 
a JavaScript library that parses a declarative HTML based comic language. Along the way, a data-driven option emerged as well.

## How it works

At first glance, I thought making a declarative comic language like this would be the ticket:

```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.3/p5.js"></script>
    <script src="yume.js"></script>

    <div id="script">
      <yume:scene duration="5" camera="30,50,-100">
	<yume:caption>This is not a monitor, it is a 3D image of one.</yume:caption>
	<yume:character src="monitor"/>
      </yume:scene>
    </div>

    <script>
      var yume = new Yume();
      yume.parse( "#script" );
      yume.setup();
    </script>
```

This works: it creates a comic with a single scene, a floating monitor (from a 3D image file) in the center of the screen, 
and animates the camera from 0,0,0 to 30,50,-100 over five seconds. Then, it displays a caption that says "This is not a monitor, it is a 
3D image of one." A declarative language like this means you can write comics inside 
Markdown files in a Jekyll blog (hosted for free on GitHub) using the 
[open source](https://github.com/xrd/TeddyHyde)
[GitHub editor for Android](https://play.google.com/store/apps/details?id=com.EditorHyde.app).

As a side effect of building this parser, I needed to convert the HTML into an intermediate data format. That format is exposed
too, so if you prefer to use imperative JavaScript to define your comic, you could do this.

```javascript
var data = {};
data.models = [];
data.duration = 10;
data.models.push( { name: "man", rotate: { y: 327 },
                    position: { x: 40, y: 100, z: 150 } } );
data.camera = { x: 100, y: 30, z: -150 };
data.caption = "When I became a software developer twenty years ago, I told myself I would never become that guy: chained to my desk, immovable, uptight, angry. CYNICAL!";

var scenes = [];
scenes.push( data );
var yume = new Yume();
yume.load( scenes );
yume.setup();
```

You could of course pull from a remote source, and convert from JSON too.

## Todo

- [ ] Load large models in background (make comics appear to load faster).
- [ ] Specify when captions display instead of at the end of the scene duration. 
- [ ] Add support for model rotations over duration in scene
- [ ] Add support for model movement over duration in scene
- [ ] Add annotations for thought and speech bubbles to models.
- [ ] Add annotations as plugins: enhance models with animated stars, etc.
- [ ] Specify any jQuery.easing functions if you have that library loaded.
- [ ] Add support for primitive shapes: torus, etc.
- [ ] Is rigging possible with models?

## Adding models

If you want to add new models first find a model (search google for `3d model obj <character>`), and then, choose one of two options: fork this repository and add the model to your repository OR issue a pull request to this repository with the new model.

In either case, you should update the `builder.html` file to include the new model (the select tag, just use the name without the .obj 
extension).

You might also need to trim the model down. I found that models about 200KB or less work well. If your model is bigger
than that, you could use a tool like [https://github.com/jonnenauha/obj-simplify](https://github.com/jonnenauha/obj-simplify/)
to reduce the size of the model.
