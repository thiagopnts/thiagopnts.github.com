---
layout: post
title: Patterns of Enterprise Application Architecture - Web Presentation
---


<img src="http://ecx.images-amazon.com/images/I/511D6FdsbXL._AA160_.jpg" width="250" height="250" />

##Chapter 4 - Web Presentation

This chapter talk about the presentation layer, which is in the currently days mostly web browser based user interfaces. This bring a lot of advantages: no client software to install, a common UI approach, easy universal compatibility with browsers(sic), and it's more easy and beautiful to develop then desktop UIs(IMO).
Here we will discuss three main view patterns: Template View, Transform View and Two Step View.

##Template View Pattern

This is the most common approach to build a web page with dynamic content, the basic idea is to embed markers into a static HTML page when it's written and when it is served as a response for a request it is markers are replaced for computed content, such as a database query. This way the page can show different contents based on previous computation. As a lot of tools use this pattern, the important here isn't how to build something using this pattern but to understand how it works and use it. To embed the markers just pick a tool, see the docs and start coding. Currently there are a lot of template engines out there, such as mustache, jinja2, etc. The most popular forms are with PHP, JSP and ASP like server pages. This approach go further then than the basic form, they allow you to embed arbitraty programming logic, called scriptlets, into the page. Obviously it isn't recommended, since your page becomes incomprehensible for non-programmers and it is a problem when you have to work with designers, other problem is that you starts to mix the application layers and everything will become a mess. A good advice the author gives to avoid scriptlets in the server page is using a Helper Object which containts all the real programming logic. One thing to watch in Template Views is exceptions, if one exception occurs while processing the server page you will have a half processed page that provides decidedly odd output, you can look at how your web server handles exceptions and depending you can catch all with the helper object.

##Transform View Pattern

The main idea here is that the data is requested and is provided by a data source layer through a domain model, but the data isn't formatted to make a a proper web page, using the Transform View means thinking of this as a transformation where you have the model's data as input and the HTML as the output. A Tranform View is organized around separete transforms for each kind of input element. The tranform is controlled by something like a simple loop that looks at each input element, finds the appropriate transform for that element and then calls the transform on it. This remember me JSON parsers, you input an object and it parses it to JSON. The author uses an XML example to illustrate this example, which was the most common approach when the book was written. The choice between a Transform View and a Template View depends on the team, although the Template View be more used, the Transform View pattern is more portable since you can use the JSON/XML generate as output in any other platform such as Java or .NET.

##Two Step View Pattern

When making global changes to the pages appearance becomes hard you can start to think to use the Two Step View Pattern. This pattern deals with this problem by splitting the transformation into two stages, the first on transforms the model data into a logical presentation without any specific formatting, the second converts that logical presentation with the actual formatting needed, this way you can make global changes just adjusting the second stage. With a single stage view approach(such sd the other patterns discussed here) you build a one view module per web page, with a two stage view you have one stage for the model and other for the entire application. Your pay-off is that any changes to the appearance of the site in the second stage is much easier to make, since one second-stage change affects the site as a whole. The pattern isn't good for design-heavy sites, where each page is supposed to look different because it's hard to find what can be used in the second stage. Other disadvantage is that there isn't some many tools to help non-programmers use this approach like the Template View has, so it become hard to use in a team with designers.

##Conclusion

I believe most of us use a Template View framework in our day to day work and is already used to it, but its good to know there is other ways to deal with view rendering and stuff, and how this works internally, because how knows when you gonna need use something like this?
