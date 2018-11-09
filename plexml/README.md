# PleXML
### An SPA that displays the XML output of my Plex server

# How does it work?
My [Plex](http://www.plex.tv) server streams a sizable library of awesome movies and TV shows. You can
access the metadata for all that media via an XML feed that the server generates.
This applicaiton calls that XML feed, parses it, and displays it in a format that's
easy to filter and sort.

# How recent is this data?
Data is retrieved from Plex in real time. When you click the big button at the top of
the page, you are making a fresh request to my server.

# What is it built with?
jQuery does most of the work making the AJAX call and parsing the results. The sorting
and filtering logic, as well as the accompanying animations, are all controlled by
an awesome library called [Isotope](https://isotope.metafizzy.co).

# Why is some data missing?
Plex pulls all its metadata from [theTVDB.com](http://thetvdb.com) which is
crowd-sourced information. Some of the more obscure titles have incomplete data,
especially when it comes to ratings, and I have not bothered to handle all the edge
cases yet so you'll still see a few 'undefined' values floating around.

# Warning:
This is a WIP and can fail to return results if the server is down. It's also
possible that your particular request timed out because my server is not very robust,
and for that I apologize. One final warning, this is purely for demo purposes and
is sending traffic from a public server to a non-SSL hosting service, and then to your browser.
Some browsers consider this bad practice (and it would be, in a production environment)
so your request may fail if the browser doesn't support a non-secured cross-domain AJAX call.