---
layout: post
title: Summary of Growing OO Software, Guided by Tests - Achieving Object-Oriented Design
---

The design principles discussed in the previous chapter apply to finding the right boundaries for an object so that it work as expected, for instance, a caller wants to know what an object does and what it depends on, but not how it works.

##How Writing a Test First Helps the Design

There are three aspects of TDD that help us achieve this design "rules". First, starting with a test means that we have to describe what we want to achieve before we consider how. This focus helps us maintain the right level of abstraction for the target object. If the intention of the unit test is unclear then we're probably mixing up concepts and not ready to start coding. It also helps us with information hiding as we have to decide what needs to be visible from outside the object. Seconds, to keep the unit tests understandable we have to limit their scope. Some tests are dozens of lines long, burying the point of the test somewhere in its setup. Such tests tell us that the component they're testing is too large and needs breaking up into smaller components. And the last one, to construct an object for a unit test, we have to pass its dependencies to it, which means that we have to know what they are. This encourages context independence, since we have to be able to set up the target object's environment before we can test it.

##Value Types

There is a difference between Values and Objects, values are immutable, so they're simpler and have no meaningful identity; Objects have state, so they have identity and relationships with each other. If we create a Item type that could be represented as a simple String, we can find all the code that is relevant for a change without having to chase through the code, specific types also reduce the risk of confusion, even the simplest ones, as one of the example showed, feet and metres can be represented as numbers but they're different things.

There are three basic techniques for introducing value types, which we've called: breaking out, budding off, and bundling up.

###Breaking out
When we find that some code in an object is becoming too complex, its a sign that we should be implementing multiple concerns and that can be break out into other objects or helper types.

###Budding off

When we want to mark a new domain concept in the code, we often introduce a placeholder type that wraps a single field, or maybe has no fields at all. As the code grows, we fill in more detail in the new type by adding fields and methods. With each type that we add, we're raising the level of abstraction of the code.

###Bundling up

When we notice that a group of values are always used together, we take that as a suggestion that there's a missing construct. A first step might be to create a new type with fixed public fields—just giving the group a name highlights the missing concept. Later we can migrate behavior to the new type, which might eventually allow us to hide its fields behind a clean interface, satisfying the "composite simpler than the sum of its parts" rule.

