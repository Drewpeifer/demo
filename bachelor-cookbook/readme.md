# The Bachelor Cookbook
### A reverse-search engine for recipes

This single page app searches the [RecipePuppy](http://www.recipepuppy.com)
API for recipes that contain (basically) the ingredients you've selected.
The idea is that you only return recipes you are capable of making
without a trip to the store.

Lots of APIs contain the ingredients in a long comma-delimited string,
but using one of those would have necessitated a lot of parsing.
The RecipePuppy API suited my needs nicely as it is built to query by
ingredient, provides thumbnails, and links to the original source.

I also used [CORS proxy](https://cors-proxy.htmldriven.com/) to
get around cross-origin domain policy problems, after the
sad demise of [crossorigin](https://crossorigin.me/).