---
layout: post
title: Summary of Domain Driven Design - Supple Design
---

To have a project accelerate as development proceeds, you need to have a design that is pleasure to work with, a supple design. Supple design is the complement to deep modeling, once you've dug out implicit concepts and made them explicit you have the raw material. A supple design reveals a deep underlying model that makes its potential clear. The client developer can flexibly use a minimal set of loosely coupled concepts to express a range of scenarios in the domain. Design elements fit together in a natural way with a result that is predictable, clearly characterized, and robust.

##Intention-Revealing Interfaces

If a developer have to dig into the code in order to know how to use an object effectively, the value of encapsulation is lost. It means that the new developer which had to do it will use his interpretation to understand what the code does, this can lead to concept corruption.

To obtain the value of explicitly modeling a concept in the form of a class or method, we must give these program elements names that reflect those concepts. The names of classes and methods are great opportunities for improving communication between developers, and for improving the abstraction of the system.

##Side Effect-Free Functions

In computer science, side effect is when the state of something changes, for instance, when you call a function passing an object and you this object's state, like passing things aroung by reference. This is not a good idea since the developer needs to know exactly what this function does in order to use it, and if the developer has to look at the implementation to use, it's not a good thing, as we saw in the previous topic. To help with this there are often alternative models and designs that do not call for an existing object to be modified at all. Instead, a new VALUE OBJECT, representing the result of the computation is created and returned. As VALUE OBJECTS are immutable, there are apart from initializers called only during creation, so all their operations are function (in this case, a function is an operation that doesn't have side effects)

##Assertions

Separating complex computations into functions without side effects cuts the problem down to size, but there is still a residue of commands on the objects that produce side effects, and anyone using them must understand their consequences. Assertions make side effects explicit and easier to deal with. Assertions describe state, not procedures, so they are easier to analyze. Class invariants help characterize the meaning of a class, and simplify the client developer's job by making the objects more predictable. If you trust the guarantee of a post-condition, you don't have to worry about how a method works. The effects of delegations should already be incorporated into the assertions. This can be done through unit testing and documentation.


