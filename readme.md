ExtMongo is a web-based admin interface for mongodb using nodeJS.

## Getting Started

### Requirements

* [nodeJS](http://github.com/ry/node)
  - versions: 0.4.0 or later
* [npm](http://github.com/isaacs/npm)

### Install

* With [npm](http://github.com/isaacs/npm)

        $ npm install -g extmongo

### Run

1. start the inspector. I usually put it in the background

		$ extmongo &

2. open http://127.0.0.1:5000/ in your favorite web browser

3. you should now see the mongodb databases listed.

4. select a script and set some breakpoints (far left line numbers)

5. then watch the [screencasts](http://www.youtube.com/view_play_list?p=A5216AC29A41EFA8)

For more information on getting started see the [wiki](http://github.com/dannycoates/node-inspector/wiki/Getting-Started---from-scratch)

node-inspector works almost exactly like the web inspector in Safari and
Chrome. Here's a good [overview](http://code.google.com/chrome/devtools/docs/scripts.html) of the UI

## FAQ / WTF

1. I don't see one of my script files in the file list.

    > try refreshing the browser (F5 or command-r)

2. My script runs too fast to attach the debugger.

    > use `--debug-brk` to pause the script on the first line

3. I got the ui in a weird state.

    > when in doubt, refresh
    
4. Can I debug remotely?

    > Yes. node-inspector must be running on the same machine, but your browser can be anywhere. Just make sure port 8080 is accessible

## ExtMongo options

    --port=[port]     port to host the extmongo (default 5000)

## Cool stuff

* the WebKit Web Inspector debugger is a great js debugger interface, it works just as well for node
* uses WebSockets, so no polling for breaks
* remote debugging
* javascript top to bottom :)
* [edit running code](http://github.com/dannycoates/node-inspector/wiki/LiveEdit)

## Known Issues

This is beta quality code, so use at your own risk:

* be careful about viewing the contents of Buffer objects, each byte is displayed as an individual array element, for anything but tiny Buffers this will take too long to render
* while not stopped at a breakpoint the console doesn't always behave as you might expect

## Profiling

**VERY EXPERIMENTAL**
I don't recommend using this yet

To use the profiles panel, install the v8-profiler module:

    npm install v8-profiler

To use it do something like:

```javascript
var profiler = require('v8-profiler');

profiler.startProfiling('startup');
slowStartupFoo();
profiler.stopProfiling('startup');

profiler.takeSnapshot('beforeLeak');
leakyFoo();
profiler.takeSnapshot('afterLeak');
```

Then view the profiling results with the profiles panel in node-inspector. You can
also take heap snapshots on demand from the profiles panel.

## Thanks

This project respectfully uses code from and thanks the authors of:

* [node](http://github.com/ry/node)
* [mongodb](https://github.com/mongodb/node-mongodb-native)
* [mongoose](https://github.com/LearnBoost/mongoose)
* [express](https://github.com/visionmedia/express)
* [ExtJS](https://www.sencha.com/products/extjs/)

and ICONs of:
* [FAMFAMFAM](http://www.famfamfam.com/)


