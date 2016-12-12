# GA WDI Code Sample - Ruby Back-End
## Heroku URL: http://ga-ruby-dphurley.herokuapp.com/ 


### What I attempted to do:
- Use only vanilla Javascript. No jQuery, no JS libraries of any kind.
- Write clean and maintainable Ruby and Javascript. Make some clean abstractions and design choices without over-doing any patterns.
- Leave explanatory comments using language that would be accessible to beginners.
- Focus on happy-path scenarios. If an AJAX call fails or does not return any results, it fails silently for now.
- Style the application enough to demonstrate a working knowledge of CSS. I didn't use any CSS preprocessor to stay within the 'vanilla' toolset.

### How AngularJS would have helped out:
- Angular's two-way binding would have given me most of the low-level DOM-manipulation I performed here for free. I simply would have had to fire off an AJAX call and once it completed, the updated variables would bind to their respective DOM elements.
- One of my favorite benefits of Angular is that my service calls and display/DOM logic can be far more decoupled than they are here. Because I didn't have the benefit of the digest cycle to trigger binding updates, I had to explicitly handle all of my DOM manipulation in the XHR callbacks. This necessarily coupled my service and display logic. Decoupling service interactions from low-level DOM manipulation and business logic can provide for all kinds of testability and design improvements.
- Angular's Component directives would have allowed for me to break the application apart nicely into small pieces. I chose not to break any of the HTML here into smaller components because it never got sufficiently complex that it was hard to reason about. That being said, it would have been very easy within Angular's patterns to have broken the Favorites and Movie Lookup code into separate directives with their own views and controllers. In an application that is any larger than this, that can provide a huge amount of benefit.

### AngularJS Trade-offs for Students:
- Angular requires much more set up out of the box. It is not as easy to start coding quickly with Angular as it is with a simple Node or Ruby app.
- To take full advantage of Angular, you need to already have a solid grasp on concepts such as async service calls, callbacks, DOM manipulation, dependency injection, and MVC / OOP design principles. I believe it is far more useful for a beginner to learn about these things individually, with simpler tools before attempting to use them all at once within a framework.
- Angular requires a full investment in the framework from the very beginning. While it provides a lot of power, it also takes away a lot of flexibility and opportunity to experiment. Like any framework, it keeps you on a set of tracks.