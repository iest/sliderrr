# Sliderrr

A cross-device, collaborative dribbble slideshow viewer thing.

### Demo

**Check out the demo site: [sliderrr.iestynwilliams.net](http://sliderrr.iestynwilliams.net)**.

- Open the [demo site](sliderrr.iestynwilliams.net) in two browser windows
- Select an image from the carousel in one of the windows
- Clap with glee as both windows show the same image!

#### Tech:

- Node with Express & Socket.io on the server
- React + Flux & Socket.io on the client
- Stylus-compiling middleware on the server

#### Why?

One of the designers at work said it would be cool to have a dribbble feed on one of our TVs, so I thought I'd have a go at building one.
I'm always looking for an excuse to grok new technologies, and React+Flux are very interesting to me at the moment. I've also never really used web sockets before, so wanted to try them out!

## TODO
- [ ] Get `Loadie` working nicely
- [ ] Slideshow between images & choose image at beginning (server-side)
- [ ] Select different shot categories
- [ ] Write build script that outputs zip file containing everything needed

## Animation TODO

- Bigshot when it changes
- Shotties when changing the bigshot
- Adding of new shotties

### Getting it up and running

1. `git clone git@github.com:iest/sliderrr.git`
2. `cd sliderrr`
3. `npm install`
4. `node server.js`

### Notes
If you're using nginx on your webserver (as I am), you'll need to make sure it's set up to handle websockets. For me, this meant upgrading nginx to 1.3 or above (think I got 1.6), and making sure the nginx conf for the site is [set up correctly](http://stackoverflow.com/questions/15193743/nginx-reverse-proxy-websockets).