---
layout: post
title: Growing OO Software, Guided by Tests - Maintaining the Test-Driven Cycle
---

This chapter is about how to keep the TDD proccess running, after we start it in our projects. This, and the other chapters are all about how to write tests as we build the system, how we use tests to get early feedback and how we ensure it that the tests continue to support change and to not become an obstacle to the development team.

##Separate Tests That Measure Progress from Those That Catch Regressions

The acceptance tests we write to describe a new feature and serves as a feedback, once passing, the acceptance test now represent a completed feature and should not fail again, but if it fails, it means that there is a regression, which means that you broken existing code.
We should organize the test suites to reflect different roles, unit and integration tests to support the development team(this tests should run quickly and should always pass), acceptance tests for completed features(to catch regressions and should always pass too, although they might take longer to run) and new acceptance tests represent work to do, and should not pass until the feature is fully implemented.

##Start Testing with the Simplest Success Case

We should start by testing the simplest success case. Once working we'll have a better idea of the real structure of the solution and can prioritize between handling any possible failures we noticed along the way.
The tests should be write as clear as possible to be used as an extension for documentation, so this documentation can be used by the development team.

##Develop from the Inputs to the Outputs

We start developing a feature by considering the events coming into the system that will trigger the new behavior.The end-to-end tests for the feature will simulate these events arriving. At the boundaries of our system, we will need to write one or more objects to handle these events. It's tempting to start by unit-testing new domain model objects and then trying to hook them into the rest of the application. It seems easier at the start but we’re more likely to get bitten by integration problems later. We will have wasted time building unnecessary or incorrect functionality, because we weren't receiving the right kind of feedback when we were working on it.

##Unit-Test Behavior, Not Methods

We all know that high test coverage does not guarantee a codebase that is easy to work with. We do better when we focus on the fatures that the object under test should provide, each of which may require collaboration with other objects, we need to know how to use the class to achieve a goal, which means the objects behavior should be right, and not the lines of code, because you could write some code without fully understand the problem and you will end up with a passing test for a wrong idea.

## Turning the Cycle

How much unit testing should we do, using mock objects to break external dependencies, and how much integration testing? It depends too much on the context of the team and its environment. The best we can get from the testing part of TDD (which is a lot) is the confidence that we can change the code without breaking it: Fear kills progress. The trick is to make sure that the confidence is justified. So we observe to see how TDD is working for us and adapt it to our testing strategy.
