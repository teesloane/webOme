# webOme
> Rudimentary web-midi monome. 

![](https://cloud.githubusercontent.com/assets/12987958/21487763/cbb36044-cba0-11e6-9403-a00cd3d47d84.png)

## The Gist
- This is a pet project for learning about web midi ( as well as to check out mobx)
- webOme is inspired (or rips off, whichever) the monome's form factor.
- the webOme is intended to hook up to external synthesizers via USB midi, but can also be piped into a DAW using something like Mac's virtual IAC midi.
- The MVP of the project is a simple grid based sequencer with access to external midi devices, tempo, scale, and key.
- Future iterations of the project hope to mimic more monome patches that lend themselves to more unique midi sequencing. Such patches include Boingg, Flin, and perhaps a Game of Life based sequencer. 

## Back story
- [Monome's](http://monome.org/) are neat. Once upon a time a kind friend leant me one for some time. Over that time I learned (or more so, fiddled) with getting a series of different patches working with the Monome. At the time, I was not a developer, and although still relatively technically savvy, I found it to be a fascinating instrument. I also spent more time fiddling and tinkering than making music. There's nothing wrong with that of course.
- I thought creating a mock webOme would be fun for myself, but also hopefully for others who find such methods for music making intriguing. At the very least, I wanted something open source that could take inspiration from the monome / grid movement, and make it accessible anywhere / with external hardware. 

## Questions

**Can I contribute?**

Yes. The wiki will (eventually) have contribution gamelines. 

**Will this have `x` or `y` feature?**

Maybe. Check out the wiki, or file an issue to make any requests.  


## Build Instructions
- clone this repo!
- `npm install`
- `npm run start`

## Tools
- This application leverages `create-react-app` that has been ejected 
- State management will be handled by mobX.
