---
layout: post
title: Domain Driven Design - A Model Expressed in Software
---

This chapter starts with a discussion about the issues involved to design associations between objects. They are simple to conceive and draw, but implementing them always end up in problems or bad design. This part is focused on making distinctions among the three patterns of model elements that express the model: Entities, Value, Objects and Services.

##Associations

The interaction between modeling and implementation is particularly tricky with the associations between objects.

For example, a one-to-many association migth be implemented as a collection in an instance variable. But the design is not necessarily so direct. The design has to specify a particular traversal mechanism whose behavior is consistent with the association in the model. There are at least three ways of making associations more tractable:

1. Imposing a traversal direction
2. Adding a qualifier, effectively reducing multiplicity.
3. Eliminating nonessential associations

For example, a country has had many presidents, so it's a one-to-many relation, but with can change the direction of this relation from adding just the a `Country ->* President`, avoiding a "Dilma is president of which country?" use. We can go even futher, as we know a country has only one president at a time, this qualifies a one-to-one relation `Country -> President`, based on a period. So the question turns to a "Who was the president of Brazil in 2010?"

##Entities


Some objects are not defined primarily by their attributes. They represent a thread of identity that runs through time and often across distinct representations. An object must be distinguished from other objects even though they might have the same attributes. Mistaken identity can lead to data corruption. An object that is defined primarily by its identity is called an entity.

##Value Objects

Many objects have no conceptual identity. These objects describe some characteristic of a thing. A Value Object is an object that representes a descriptive aspect of the domain with no conceptual identity. They are instantiated to represent elements of the design that we care about only for what they are, not who or which they are.

Value Objects are often passed as parameters in messages between objects. They are frequently transient, created for an operation and then discarded. So, an object can be classified as a Value Object when you care only about the attributes of a model, so it should not have any identity and should be immutable.

##Services

"Sometimes, it just isn't a thing."

There are important domain operations that can't find a natural home in an Entity or Value Object. Some of these are activities or action, not things, but since our modeling paradigm is objects, we try to fit them into objects anyway.

A good service has three characteristics

1. The operation relates to a domain concept that is not a natural part of an Entity or Value Object
2. The interface is defined in terms of other elements of the domain model.
3. The operation is stateless

The statelessness here means that any client can use any instance of a particular Service without regard to the instance's individual history.

This pattern favors interface simplicity over client control and versatility. It provides a medium grain of functionality very useful in packaging components of large or distributed systems. And sometimes a Service is the most natural way to express a domain concept.

##Modules

Modules are an old, established design element. There are technical considerations, but congnitive overload is the primary motivation for modularity. Everyone uses Modules, but a few treat them as a full-fledged part of the model. Code gets broken down into all sorts of categories, from aspects of the technical architecture to developers work assignments. Even developers who refactor a lot tend to content themselves with Modules conceived early in the project.
