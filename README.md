An introduction to the No Express HTTP server
----------------------------------------------

This is a thought-experiment to see how far I can get designing and building a full-fledged HTTP REST server without using Express or some other HTTP server library.  Currently, the design part had taken a back seat to quickly coding up an MVP.  With the advent of a working, tagged MVP commit, I've moved on to designing route caching and code generation for controllers.

Install this package's dependencies:

`npm install`

Start the http server:

`npm start` 
_Nodemon will use ts-node to start the server in watch mode._
`ts-node` transpiles Typescript on the fly, so no need to compile into Javascript (yet).

Some work to be done from the first iteration forward:

- My best attempt at calculating Big O for the nested forEach in HTTPRouter is O(n^2) - not good!
	- **In order to fix this, I plan to make a Route class that contains the combined controller/route metadata.  It will be the top-level entity that is iterated with no nested loop.**
- Dependent on the size of the API, the HTTPRouter is dynamically processing a giant list of controllers (forEach) containing routes (nested forEach).  It's ideal to do this in parallel with a cancel token pattern, and/or generate cached route handlers.
	- I tried adding some basic caching using the persistent-cache npm package. This didn't work well. Persistent-cache is very simple, using a JSON file on-disk to store the cache.  Updating and tracking the cache was not possible in a fully persistent manner.  So I've abandoned this effort, removed it from the code, and I'm now looking to Redis for the caching. 

- The Controller interface demands an execute method, which in turn depends on a selector method containing concrete function names (a necessity due to the failings of apply() - it seems unable to reference methods by string name in this particular context). This is yucky plumbing code to have to write for every controller! I need a better way, possibly without having to generate code (although generating intermediate code could be super performant - the reflect-metadata util library could help).
- I'd like a decorator for class methods in addition to class properties. Property (lambda function) decorators support a controller as a module.  I'll need
one for each, as I suspect that one decorator to handle both types would be challenging or impossible.
- I added some PoC code to the serial-controller to emulate working with the inline parameters of the REST url.  Named params would be ideal.  A better pattern matching approach would also be ideal.

More to follow as I review the code.