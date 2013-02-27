---
layout: post
title: Summary of Growing OO Software, Guided by Tests - Building on Third-Party Code
---

Our software always ends relying in third party code, through things such as standard APIs, libraries and frameworks, so we must check that we are using this third-party code correctly, with it pushing back at our design, we must find the best balance between elegance and practical use of someone else's ideias.

##Don't Mock Types You Can't Change

When we use third party code we usually don't have the source code, and when we does we don't have time to completly read it, so we have to rely on the documentation, which is in most cases incomplete or incorrect. Even with the source code, we preferer not to change the code, because is too much trouble too apply private patches every time there's a new version.

##Write an Adapter Layer

If we don't want to mock an external API, how can we test the code that drives it? We should write a layer of adapter objects, that uses the third-party API to implement these interfaces, we keep this layer as thin as possible, to minimize the amount of potentially brittle and hard-to-test code. There are some exceptions where mocking third-party libraries can be helpful. We might use mocks to simulate behavior that is hard to trigger, such as throwing exceptions.

##Mock Application Objects in Integration Tests

As described above, adapter objects are passive, reacting to calls from our code. Sometimes, adapter objects must call back to objects from the application. Event- based libraries, for example, usually expect the client to provide a callback object to be notified when an event happens. In this case we mock the callback interfaces defined in the application, to verify if the adapter is passing the events between the parts as expected.






