An introduction to the No Express HTTP server
----------------------------------------------

Some work to be done from the first iteration forward:

- Best attempt at calculating Big O for nested forEach in HTTPRouter is O(n^2) - not good!
- Dependent on the size of the API, the HTTPRouter is dynamically processing a giant list of controllers (forEach) containing routes (nested forEach).  It's ideal to do this in parallel with a cancel token pattern, and/or else generate cached route handling code and apply a filter to find the matching route handler to the requested URI.
- The Controller interface demands an execute method, which in turn depends on a selector method containing concrete method names (a necessity due to the failings of apply() being unable to reference methods by string name). This is yucky plumbing code to have to write for every controller!  Come up with a better way, possible without having to generate code (although intermediate code is super performant - the reflect-metadata util library is of interest here).
- I'd like the decorator to work on class methods (using properties is less ideal, but I only figured it out for class props initially). At least this way, classes are not required, and a controller can be created as a module.

More to follow as I review the code!