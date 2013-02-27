---
layout: post
title: Growing OO Software, Guided by Tests - Test-Driven Development with Objects
---

##A Web of Objects

The OO design focuses more on the communication between objects than on the objects themselves. An object communicates by messages: It receives messages from other objects and reacts by sending messages to other objects as well, returning a value or exception to the original sender, for instance. A system is built by creating objects and plugging them together so that they can send messages to one another.

When designing a system, it’s important to distinguish between values that model unchanging quantities or measurements, and objects that have an identity, might change state over time, and model computational processes. In the OO languages that we all use, the confusion is that both concepts are implemented through the same language construct, the classes. Values are immutable instances that model fixed quantities. They have no individual identity, so two value instances are effectively the same if they have the same state. This means that it makes no sense to compare the identity of two values; doing so can cause some subtle bugs. Objects, on the other hand, use mutable state to model their behavior over time. Two objects of the same type have separate identities even if they have exactly the same state now, because their states can diverge if they receive different messages in the future.

##Follow the Messages

We can enjoy this high-level approach only if the objects used, are well designed, this means that the objects can be aesily pluggable. In practice, this means that they follow common communication patterns and that the dependencies between them are made explicit. A communication pattern is a set of rules that govern how a group of objects talk to each other: the roles they play, what messages they can send and when, and so on. In languages like Java, we identify object roles with (abstract) interfaces, rather than (concrete) classes—although interfaces don’t define everything we need to say.

##Unit-Testing the Collaborating Objects

How can we test objects without exposing any of its internal state? One option is to replace the target object’s neighbors in a test with substitutes, or mock objects. We can specify how we expect the tested object will behave to communicate with the others mock objects for a event, this is called "Specifications Expectations". During the test the mock objects will assert that they have been called as expected. We can use the term mockery for the object that holds the context of a test, creates mock objects, and manages expectations. 
