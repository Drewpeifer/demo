# A-Frame Solar System Demo

This is a simple [A-Frame](https://aframe.io/) implementation, which is a client-side JS-based 3D framework. It's specifically designed to work
easily with VR integration, or just simple 3D web applications. It provides a lot of simple constructors and behavior
that is more commonly reserved for desktop software / engines (e.g. Unity), such as lightbox effects or spacial geometry.

This demo creates a (scaled) representation of our solar system, *including Pluto*. I have comments in the code describing
how and why I modified certain variables in order to create a realistic but also navigable scene.

While it's definitely notable that the A-Frame code is so easily initialized (I had this up and running super fast), it's also
worth noting that it's a very small amount of code that generates the entire scene (less than 200 lines of JS + JSON combined).