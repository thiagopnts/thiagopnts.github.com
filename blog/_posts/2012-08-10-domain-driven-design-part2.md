---
layout: post
title: Summary of Domain Driven Design - Isolating the Domain
---

As we know, the domain is where we put the business logic and solve the problems in our software, so it is the most important part, its importance is disproportionate to its size, even in huge projects, the models still isn't the biggest part our software, so we need to isolate it from the rest of the software, but you can say "Aren't we doing that by creating models?", and the answer is yes, but we need to organize it in a way to be able to look at the elements of our model and see them as a system.

##Layered Architecture

For an application to support the simple user act of selecting a cargo's destination form a list of cities, there must be a program that:

1. Draw a widget on the screen
2. Queries the database for all the possible cities
3. Interprets the user's input and validates it
4. associates the selected city with the cargo
5. commits the change to the database

All this code is in just one program, but just a little bit of it is related to the business of shipping. There are all sorts of ways a software might be divided, but the industry has converged in Layered Architectures, and specifically a few fairly standard layers(UI, Application Layer, Domain Layer). A good example of layered architecture is the TCP/IP protocol.

##Relating the Layers

Off course the layers can be connected, layers are meant to be loosely coupled, with design dependencies in only one direction, but when an object of a lower level needs to communicate upward (beyond answering a direct query), we need another architectural pattern for relating layers such as callbacks or observers. The Layered architecture is used in most systems today, under various layering schemes, however domain-driven design requires only one particular layer to exist: The domain layer.

##The Smart UI "Anti-Pattern"

Many software projects do take and should continue to take a much less sophisticated design approach that is called the Smart UI. But Smart UI is an alternate, mutually exclusive fork in the road, incompatible with the approach of domain-driven design. Which means that nothing applied in this book works with that approach. The principal advantage of this "pattern" is the fact that you can't migrate to another design approach except by replaceing the entire application.



