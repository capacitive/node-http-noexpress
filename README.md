An introduction to the No Express HTTP server
----------------------------------------------

Some work to be done from the first iteration forward:

- My best attempt at calculating Big O for the nested forEach in HTTPRouter is O(n^2) - not good!
- Dependent on the size of the API, the HTTPRouter is dynamically processing a giant list of controllers (forEach) containing routes (nested forEach).  It's ideal to do this in parallel with a cancel token pattern, and/or generate cached route handlers.
- The Controller interface demands an execute method, which in turn depends on a selector method containing concrete function names (a necessity due to the failings of apply() - it seems unable to reference methods by string name in this particular context). This is yucky plumbing code to have to write for every controller! I need a better way, possibly without having to generate code (although generating intermediate code could be super performant - the reflect-metadata util library could help).
- I'd like the decorator to work on class methods (using properties is less ideal, but I only figured it out for class props initially). At least this way, classes are not required, and a controller can be created as a module.
- I added some PoC code to the serial-controller to emulate working with the inline parameters of the REST url.  Named params would be ideal.  A better pattern matching approach would also be ideal.

More to follow as I review the code.