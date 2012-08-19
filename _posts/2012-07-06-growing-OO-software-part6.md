---
layout: post
title: Growing OO Software, Guided by Tests - Object-Oriented Style
---

So far this book talked a lot about how to get started with the development process and how to keep going using TDD. Now it starts to focus on OO design, an important thing when you start to refactor your code, or even when you start creating mock objects, code that is easy to maintain is more valuable than code easy to write, it means that implementing a feature in the most direct way can damage the maintainability of the system. This chapter focus on how to achieve a good software design even when its become tricky.

##Designing for Maintainability

With TDD we grow our systems slice by slice, as the code scales up, the only way we can continue to understand and maintain it is refactoring the code and structuring the functionality into objects, packages and etc. There is two principal heuristics to guide this approach:

###Separation of concerns

When we have to change the behavior of a system, we want to change as little code as possible. If all the relevant changes are in one area of code, we don't have to hunt around the system to get the job done, to achieve this we gather together code that will change for the same reason.

###Higher levels of abstraction

The best way for humans to deal with complexity is avoid it by working at higher levels of abstraction, that's why most people order food from a menu in terms of dishes, rather than detail the recipes used to create them.

Using this you can structure your application towards something like Cockburn’s "ports and adapters" architecture, in which the code for the business domain is isolated from its dependencies on technical infrastructure, such as databases and user interfaces.

##No And's, Or's, or But's

Every object should have a single, clearly defined responsibility; this is the "single responsability" principle, when implementing something this principle helps us decide whether to extend an existing object or create a new one. The heuristic here is that we should be able to describe what an object does without using any "and"s or "or"s, if find ourselves using this conjunctions, this object probably needs to be broken up into other objects.

##Composite Simpler Than the Sum of Its Parts

All objects in a system are composed of other objects, except for the primitive types built into the language(in some languages even the "primitive" types are objects). When composing objects into a new type, we want the new type to exhibit simpler behavior than all of its component parts considered together. The composite object's API must hide the existence of its component parts and the interactions between them, and expose a simpler abstraction to its peers, so, the API of a composite object should not be more complicated than any of its components.

