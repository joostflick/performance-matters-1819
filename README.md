<!-- Add a link to your live demo in Github Pages 🌐-->

![screencap application](./images/screencap.png 'Screenshot application')

## Demo

[Link to demo](https://insulter-performance-matters.herokuapp.com/)

<!-- ☝️ replace this description with a description of your own work -->

## Description

I made a web app from scratch that displays a list of insult possibilities. It combines the randomuser API and the trumpquotes API into a well thought out personal insult.

![screencap application 2](./images/screencap2.png 'Screenshot application 2')

## Interaction

The user finds a list of possible insults on the homepage (name + insult). After clicking on the desired combination they will be able to look at a more detailed overview of the insultee. This overview states the e-mail and phone number to highlight the different ways to contact this person.

Here you can also 'favorite' a certain insult + person combination to find it again later.

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

## Installation

Use and install this project by downloading it and running:

`npm install`

`npm start`

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

## Data sources

What does Trump think API

https://api.whatdoestrumpthink.com/api/v1/quotes

Random user API

https://randomuser.me/api/

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

## Optimalization

![original](./images/score_original.png 'Screenshot application')

The original app I started with from WAFS, no optimalization yet (but a good score because it is such a small app).

I started optimizing by trying to improve on filesize, so first I minified my files using gulp.

Beneath is a comparison of filesizes before/after minifying.

Before

![original](./images/original.png 'Screenshot application')

After

![minified](./images/minified.png 'Screenshot application')

Then I also turned on compression (brotli quality 4 gave me the best results after testing)

![compressed](./images/compressed.png 'Screenshot application')

And after using both I ended up with the following loading scores:

![compressed&minified](./images/compressed_minified.png 'Screenshot application')

My next improvement was on the first usable page render. Because I was using a Google font my app didn't display any content until loading the font. I replaced this by selfhosting the font and using a font-swap with a fallback of sans serif. This improved time to first content with ~0.3 seconds as can be seen on the following image.

![compressed&minified&font](./images/font_minify_compress.png 'Screenshot application')

My next step was adding some functionality. I added a favorites function using client-side javascript and implemented a service worker to cache certain assets, and create an offline page.

![serviceworker](./images/serviceworker.png 'Screenshot application')

After merging all the above together the biggest improvement was on the PWA(Progressive Web App) score. Some of the loading times increased a little because of the added functionalities.

![final](./images/final_sw_pwa.png 'Screenshot application')

  <!-- How about a license here? 📜 (or is it a licence?) 🤷 -->

MIT license
