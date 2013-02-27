---
layout: post
title: Patterns of Enterprise Application Architecture - Putting It All Together
---


<img src="http://ecx.images-amazon.com/images/I/511D6FdsbXL._AA160_.jpg" width="250" height="250" />

##Chapter 8 - Putting It All Together 

This post is like a summary of the other posts, here we will sweep everything together and start to answer the tricky question of what patterns to use when designing an enterprise application, the advice here is one that we already gave in the other posts, use this advice to prod your thinking, but don't use it as a replacement for your thinking. Even if you don't like the full story of extreme programming, you should still consider this three technical practices: continous integration, test driven development and refactoring.

##Starting with the Domain Layer

The start of the process is deciding which domain logic approach to go with. The three main contenders are Transaction Script, Table Module and Domain Model. As said in the post that describe this patterns, to choose between them you have to consider the complexity of your domain logic, something that is hard to quantify and qualify in the beginning of the project, but there is other factors in the decision, in particular, the difficulty of the connection with a database. The simplest of the three patterns(Transaction Script), fits with the procedural model that most people are still comfortable with, which is easy to build on top of a relational database. However as your logic gets more complicated your difficulties multiply exponentially.

Other option is the Domain Model pattern. The biggest difficult is to learning how to use a domain model. This pattern requires skill if it's to be done well, done poorly it's a disaster. The second big fault of a Domain Model is its connection to a relational database. But for many, mostly nontechnical, reasons an object database isn't a possible choice for a enterprise application.

The Table Module represents an attractive middle ground between these poles. It can handle domain logic better than Transaction Scripts and is less complex than Domain Model. It works nicely  by playing to the stringths of the relational databse and representing a reasonable factoring of the domain logic.

##Down to the Database Layer

Since we decided that the Table Module has the better approach for our enterprise application we have to choose how to connect to our data source.
To connect to the database using the Table Module pattern we can choose the Table Data Gateway, where we will hava an object that acts as a gateway to a database table. You usually don't need any of the other O/R mapping patterns in this context.

##The Presentation Layer

In many ways the presentation is relatively independent of the choice of the lower layers. You just have to care if you will provide a rich client interface or a HTML browser interface. A rich client will give you a nicer UI, but will usually take more effort to program, but that's because they tend to be more sophisticated. If you go the HTML route, you have to decide how to structure your application, the better approach is using the Model View Controller pattern, as the underpinning for your design.

##Some Technology-Specific Advice

In this chapter the author also gives some technology specific tips, most for J2EE and .NET. To the java people, the main point is that you don't need EJBs to build a great enterprise application, you can do it just using POJOs and JDBC, since J2EE provides great design alternatives. In the .NET world, the hype is all about Web services, but he says that there's no real reason to make the Web server and the domain logic into separate processes in a .NET application, it's better to use a pattern like Remote Facade.
