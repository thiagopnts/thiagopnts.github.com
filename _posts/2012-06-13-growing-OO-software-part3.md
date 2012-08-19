---
layout: post
title: Growing OO Software, Guided by Tests - An Introduction to the Tools
---

The book is about techniques to guide the development of OO software using tests, and it's not about specific technologies, but to demonstrate some techniques in action the book uses some technologies, such as JUnit 4, Hamcrest and jMock2 frameworks.

##A Minimal Introduction to JUnit 4

I believe that everybody that got an OO course, has some experience with JUnit framework, in this section we can see some features this framework provide for us, such as expected exceptions and test fixtures.

###Expecting Exceptions

The @Test annotation supports an optional parameter `expected` that declares that this test case expect an exception, with this the test fails if it doesn't throw an exception or if throws a different exception than the expected one.

###Test Fixtures

This is a great feature but under used many times, which provides a fixed state at the start of a test, this ensures that a test is repeatable, so every time a test run it starts with the same state so it can produce the same results. A fixture must be set up before the test runs and torn down after it. The fixture is managed by the class that defines the test. JUnit use the @Before to set the things up, and @After to tear down the fixture.

###Hamcrest Matchers and assertThat()

Hamcrest is a framework for writing declarative match criteria, it's used by others testing frameworks such as JUnit and jMock. A Hamcrest matcher reports whether an object matches or not some criteria. In practice those matchers are used in combination with JUnit's assertThat(), which uses matchers to say if a assertion fails. The most useful feature of Hamcrest is defining new criteria by combining existing matchers. The not() method is a factory function that creates a matcher that reverses the sense of any matcher passed to it. Matchers are designed so that when they’re combined, both the code and the failure messages are self-explanatory. The Hamcrest is also extensible, you can write your own matcher if you need.

###jMock2: Mock Objects

jMock2 plugs into JUnit (and other test frameworks) providing support for mock objects. This framework creates mock objects dinamically, so you don't have to write your own implementations of the types you want. The core concepts of the jMock are the mockery, mock objects and expectations. A mockery represents the context of the object under test, its neighboring objects, the mock objects stand in for the real neighbors of the object under test while it runs and a expectations decribes how the object under test should invoke its neighbors during the test.

##Conclusion

Although the book introduce only tools from the Java world, all this kinds of frameworks can be found in all the common programming language, its good to know the first then when you need something like this in other languages you already know where to look, since most of the implementations are based on this.




