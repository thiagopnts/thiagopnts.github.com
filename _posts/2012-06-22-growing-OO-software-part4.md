---
layout: post
title: Growing OO Software, Guided by Tests - Kick Starting the Test-Driven Cycle
---

The entire TDD process was described in the other posts, with that we can assume we can grow the system by just slotting the tests for new features into an existing infrastructure, but what about the very first feature, before we have the infrastructure? As an acceptance test, it must run end-to-end to give us the feed back we need about the system's external interfaces, which means we have to implement a whole automated build and deploy environments for our test cycle and this is a lot of work to do before we can even see the first test fail. Even looking weird you had to automate the build and deploy process from a nonexistent system.

##First, Test a Walking Skeleton

It's hard to write and pass the first acceptance test, because the architecture, the tests and the production code are all moving. One of the symptoms of an unstable development environment is that there is no obvious first place to look when something fails. We can split this into two smaller problems. First, work out how to build, deploy and test a "walking skeleton", then use that infrastructure to write the acceptance tests for the first meaningful feature. After that, everything will be in place for test-driven development of the rest of the system.

But what is a Walking Skeleton? It's a is an implementation of the thinnest possible slice of real functionality that we can automatically build, deploy, and test end-to-end, it should include just enough of the automation, the major components and communication mechanisms to allow us to start working on the first feature.

##Deciding the Shape of the Walking Skeleton

To build the walking skeleton you will need to make high-level design decisions for you application, we can't automate the build, deploy, and test cycle without some idea of the overall structure. We don't need much detail yet, just a broad-brush picture of what major system components will be needed to support the first planned release and how they will communicate. The rule of thumb is that we should be able to draw the design for the walking skeleton in a few minutes on a whiteboard.

##Conclusion

Build the walking skeleton can be a lot of work if you're building a huge application, and it can bring the "chaos" to your application in the first steps of the software development, but as this chart shows, this will save you a lot of problems in the final steps of the development process, so it's another tradeoff, but I believe that is better to have that chaos moment far away from the deadline date.

<img src="/images/tddchart.png"/>
