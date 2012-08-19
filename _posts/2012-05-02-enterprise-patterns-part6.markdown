---
layout: post
title: Patterns of Enterprise Application Architecture - Session State
---


<img src="http://ecx.images-amazon.com/images/I/511D6FdsbXL._AA160_.jpg" width="250" height="250" />

##Chapter 6 - Session State

This chapter talks about session states, it's interesting because I had some problems with this recently in a project I'm developing in the university. I think that if I had read this chapter before it, it could had saved me a couple hours of researching. But, as everything in life, the mistakes served to go deeper in the subject.

##The Value of Statelessness

So, what is stateless? An object has behavior and different states, so a true stateless object should be an object without states, it means no fields. But an object like this is awkward, however, this isn't what most people mean when they talk about statelessness. When people refer to a stateless server they mean an object that doesn't retain state between requests. An object may have fields, but when you invoke a method on a stateless server the values of the fields are undefined. An example could be a server that returns a web page telling you all about a book, you invoke it by accessing an URL, in the URL you supplu an ISBN number that the server uses to generate the HTTP response based on a database query to retrieve the object from db and show it to the user in a HTML page, once the job is done, these values become useless and don't influence to the state of the object. But what if you want to keep track of all ISBN viewed by some determined client IP? You gonna need an object that persist between requests, this should be a stateful object. This is a very costly approach, since statelessness fits better in the web(HTTP is a stateless protocol). With a stateless object server you can implement stateful objects, to keep a session state. This session state acts like a transaction and need to be committed to become record data. But we can have consistency problems as describe in the other post about concurrency if the same object has his state changed by two different sources. So, to store session state without losing the correct behavior we can use some patterns to help with it, as we will see below.

##Client Session State

This pattern has a simple idea, just store the session state on the client. It's how the cookies works, there are other several ways to do that, for instance, you can serialize the data into some hidden field on a web form(I always thought this was a ~gambiarra~ lol is there an equivalent to gambiarra in english? but I know there are some cases this could be used, like rails does I guess) or you can hold the data in a object on a rich client, which has been a good approach with JS mainly front-end apps. The problem with the cookies approach is that you are limited with the cookie's size, other problem is that cookies only works with a single domain, so if your site  is separeted into different domain names the cookies won't travel between them. The main disadvantage of using cookies is when you have to work with a large amount of data, because it has to be transferred in every request. There is also a security issue, all the data transferred through cookies can be sniffed and spoofed/changed.

##Server Session State

This approach is to keep the session state on the server's memory, or in a file on the file system or even in a single table in a database. You can have a kind of map in memory to hold the session ID and the session object can be retrieve from the map to process the request, obviously this consumes a lot of memory. To solve this problem you can serialize the object for a persist store, avoid loosing the object in case that some thing accur with the memory. Other way is creating a table to store the sessions indexed by the session ID, using this approach you will have to worry with the performance if your system have to handle a lot of clients simultaneously. Because it's simplicity, this pattern has been implemented by default in several application servers.

##Database Session State

This is another server-side storage approach, but it involves break the data into tables and fields and storing it like you would store common database entities. The data involved is typically a mix of session data that's only local to the current interaction and committed data that's relevant to all interactions. One of the key issues to consider here is the fact that session data is usually considered local to the session and shouldn't affect other parts of the system until the session as a whole is committed. The advantage here is the gain in performance, you will be using stateless objects on the server, thus enabling pooling and easy clustering. However, you'll pay with the time needed to pull the data in and out of the database.



