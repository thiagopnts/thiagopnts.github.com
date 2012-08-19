---
layout: post
title: Growing OO Software, Guided by Tests - What is the point of TDD?
---

##What is the point of Test-Driven Development?

This book starts with a good citation:
"One must learn by doing the thing; for though you think you know it, you have no certainly, until you try."

And this happens a lot with TDD, everybody knows TDD, had heard about it somewhere, knows that use TDD is about to write the tests before everything, knows that this practice has a lot of advantages, but its hard to find someone that actually do TDD, and knows the "fundamentals", and for many development teams write tests isn't "real work". Its the famous phrase: "I already finished it, just need to test".

##Feedback Is the Fundamental Tool

The sooner we can get feedback about any aspect of the project, the better. Many teams in large organizations can release every few weeks, some teams release every few days or even hours, which gives them an order of magnitude increase in opportunities to receive and respond to feedback from real users. With that in mind, a project organized as a set of nested feedback loops, development is incremental and iterative.

##Practices That Support Change

We need constant testing to catch regression errors, so we can add new features without breaking the existing ones, through automated tests. Developers spend a lot of time just reading code, so the code must be readable(avoiding obscure one-liners, for example). To achieve this simplicity, we need to constantly refactor our code as we work with it, to improve and simplify its design, to remove duplication, and to ensure that it clearly expresses what it does, in this case the test suites are the feedback to our changes. TDD must be used as a design activity. We should use the tests to clarify our ideas about what we want the code to do.

##Test-Driven Development in a Nutshell

The heart of TDD is this cycle: write a test; write some code to get it working; refactor the code to be as simple as possible. Repeat. By refactoring, you must know that, it is about changing the internal structure of an existing body of code without changing its behavior. As we develop the system, we use TDD to give us feedback on the quality of both, its implementation and design. But a project fully covered with unit tests still can be a mess, it could happen when all the unit tests are passing but the code couldn't be integrated.
When implementing a feature, we start by writing an acceptance test, which exercises the functionality we want to build. While it's failing, an acceptance test demonstrates that the system does not yet implement that feature, when it passes, we're done. This generates an inner and outer feedback loop in TDD: Write an acceptance test -> write a test -> make the test pass -> (write a acceptance test or refactor), write a test, etc.

## Testing End-to-End

An end-to-end test interacts with the system only from the outside, which means, through its interface, by sending messages, by consuming web services and so on. End-to-end means more than just interacting with the system from the outside, it could be used in both, system and the process by which its built and deployed. An automated build, usually triggered by someone checking code into the source repository, will: check out the latest version; compile and unit-test the code; integrate and package the system; perform a production-like deployment into a realistic environment; and, finally, exercise the system through its external access points. This sounds like a lot of effort, but has to be done anyway repeatedly during the software’s lifetime.



