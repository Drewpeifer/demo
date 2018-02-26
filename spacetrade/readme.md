# SpaceTrade
**A browser-based resource management game in the spirit of *[Dope Wars](https://en.wikipedia.org/wiki/Drugwars)***

### Features
*SpaceTrade* is a game where you are the captain of your own starship,
searching the galaxy for profit and adventure. You are able to travel
between starports and interact with their **markets**, as well as experience various
**incidents** along the way. The objective is to find fuel, make money, and
always keep flying. The game is over if you're destroyed (it happens) or you
run out of gas (without any money or goods to exchange).

**Markets**

Each starport has a market. Each market has a pre-defined list of goods
that it sells, with unique base prices, as well as unique rates of fluctuation
for each item. Sales and Hikes are randomly generated low and high prices
respectively, which can occur for one item per visit to a port. Some ports
also sell fuel, and each fuel port has its own unique price
(which does not fluctuate).

**Encounters**

Whenever you travel between starports, there is a chance you will encounter
random incidents. Each incident has a description of the situation, and a line
of advice from your bridge crew (selected from three options). You can then
make one of three choices, which can have good, bad, or neutral consequences.
These incidents may cause you to lose fuel, gain money, acquire random goods,
or maybe just explode.

### Frontend
I've used [jQuery](https://jquery.com/) and [Vue.js](https://vuejs.org/) to
build the frontend (and integrate with the backend). All the styling
is merely functional, and will be changed, but I did use the very handy styles from
[CSS-Tricks](https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/)
in `range.css`. The whole thing is responsive and cross-browser compatible,
but I did not give it a production-level test across all platforms and browsers yet.

Tooltips were a late addition, and I used the awesome jQuery plugin
[Tooltipster](http://iamceege.github.io/tooltipster/) to implement
a basic system of custom help tooltips. It offers a lot of flexibility in styling,
and the options for tooltip content are incredibly robust.

I did take the time to integrate my own custom scrolling space background
(viewable in my demo repository), but that was just for fun. The only
library it uses is the awesome [transit.js](http://ricostacruz.com/jquery.transit/)
for code legibility and cross-browser safety.

### Backend
All the data is stored in JavaScript objects, and Vue translates it to the
frontend via `app.js`. Most of the objects are heavily commented
and easily editable (in `objects.js`), so you can add starports to the map, add goods to
the marketplaces, or modify config variables.

You can also un-comment the debug script in `scripts.js`, which will enable
a debug panel in the UI where a few variables can be manipulated,
such as fuel and money. If you open the inspector in your browser, many
actions have log statements that help explain what's happening behind the
scenes.

### Project Update [Feb 2018]
I started this project a few years ago, and originally, I wrote everything
in JavaScript and jQuery. At that point, I was more interested in
getting the design on the page than building the backend efficiently.
I recently chose to rebuild this project from the ground up using jQuery and
[Vue.js](https://vuejs.org/), and I think it's a much better piece of code
after the changes.

During the process of rebuilding, I became a big fan of Vue. I already had the general
design in mind this time, and Vue made the boilerplate setup
extremely fast and hassle-free. Very little of the original
code remains, except the actual JavaScript objects, and now pretty much every
part of the UI is linked to the backend by Vue in some way or another.