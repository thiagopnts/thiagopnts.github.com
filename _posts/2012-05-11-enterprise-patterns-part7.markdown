---
layout: post
title: Patterns of Enterprise Application Architecture - Distribution Strategies
---

<img src="http://ecx.images-amazon.com/images/I/511D6FdsbXL._AA160_.jpg" width="250" height="250" />

##Chapter 7 - Distribution Strategies

This chapter is about object distribution, it's like when you need to run different services in different boxes, this services can be objects, or a set of objects running in different machines, this improves performance because if one box component gets too busy we can add extra boxes for it, using a load balancer. In this chapter we learn why this architecture sucks, and what to do when we need a distribuited architecture.

##Remote and Local Interfaces

The primary reason that the distribuition in boxes doesn't work has to do with a fundamental fact of computers. A procedure call within a process is very fast. A procedure call between two separate processes is orders of magnitude slower. Make that a process running on another machine and you can add another order of magnitude or two, depending on the network. This means that the interface for a remote object should be different from a local one. For instance, in a local object, we create an interface for it to access each class' fields individually, through gets and sets, but in a remote object we will want to set all the field with just one request, and not individually as the local object interface approach, the remote approach focus on minimizing the calls, instead flexibility and extendibility. As we said before that putting each service in a box it's not good, this is because that you will have another bottle neck when sending messages to the remote objects. A good solution is use clustering, which means run all the services locally and run other instances on multiple nodes.

##Working with the Distribution Boundary

As you design your system you try to keep everything locally in a single process, but if you end up needing to distribute something you can isolate this objects and create an interface to use it, this interface will act like a facade for the distributed objects, this is a pattern called Remote Facade. Using a Remote Facade helps minimize the difficulties that the remote interface introduces. This way only the objects that really need a remote service will get the different interface, and this facade can mime a local interface for the other developers. Another known pattern is the Data Transfer Object, it's used when you not only need to invoke remote methods, but when you need to transfer objects too. This is normally used when you have different processes running, because this pattern acts like the channel between the process to share the object.

##Interfaces for Distribution

When this book was written, the interfaces for distributed components have been based on remote procedure calls, but today we see a lot of interfaces based on XML/JSON over HTTP, it's the famous REST interfaces. This is a handy approach for several reasons, it easily allows a  lot of data to be sent, in structured form, in a single roundtrip. Since remote calls need to be minimized, this is a good thing. Another good thing is that all common programming languages has XML/JSON parses so different plataforms can interact between, through it.

##Conclusion

Always keep everything together when possible, but when you have to distribute it through multiple processes, you can keep the system clean creating an remote interface for the services that need make/receive remote calls and other interface for the local object to keep everything simple using regular OO. As you saw you can do it easily nowadays using REST.
