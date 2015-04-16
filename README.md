# Sliderrr

A cross-device, collaborative dribbble slideshow viewer thing.

### Demo

~~**Check out the demo site: [sliderrr.iestynwilliams.net](http://sliderrr.iestynwilliams.net)**.~~

Sorry, the demo is down for the foreseeable future.

### What it does

It's basically a dribbble slideshow, but with some secret sauce... It uses websockets to keep track of some state on the server, namely the current active shot (the large image), and the current shot category the viewer is looking at (which defaults to popular).

If a user selects an image from the carousel, it will update on all other connected clients. Likewise with the shot category — when it's changed, it changes on all connected clients.

The slideshow logic is only on the client: when slideshow changes itself, it's only local to the client. When a connected user selects an image, the slideshow pauses for a while, before continuing as normal.

#### Why?

One of the designers at work said it would be cool to have a dribbble feed on one of our TVs, so I thought I'd have a go at building one.
I'm always looking for an excuse to grok new technologies, and React+Flux are very interesting to me at the moment. I've also never really used web sockets before, so wanted to try them out!

#### Tech:

- Node with Express & Socket.io on the server
- React + Flux & Socket.io on the client
- Stylus-compiling middleware on the server

## TODO
- [ ] Server-side pagination (clinent grinds to a halt on raspberry pi with too many images)
- [ ] Fix styles on pi version of chromium
- [ ] Get `Loadie` working nicely
- [ ] Select different shot categories
- [ ] Write build script that outputs zip file containing everything needed

## Animation TODO

- Bigshot when it changes

### Getting it up and running

1. `git clone git@github.com:iest/sliderrr.git`
2. `cd sliderrr`
3. `npm install`
4. `node server.js`

### Notes
If you're using nginx on your webserver (as I am), you'll need to make sure it's set up to handle websockets. For me, this meant upgrading nginx to 1.3 or above (think I got 1.6), and making sure the nginx conf for the site is [set up correctly](http://stackoverflow.com/questions/15193743/nginx-reverse-proxy-websockets).
