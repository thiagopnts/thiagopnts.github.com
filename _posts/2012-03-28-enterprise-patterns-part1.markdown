---
layout: post
title: Patterns of Enterprise Application Architecture - Layering
---

For this week I was asked to start to read Patterns of Enterprise Application Architecture from [Martin Fowler](http://martinfowler.com), starting with the Introduction and the Chapter 1 - Layering. I've already had used this book a couple of times for reference but never had read like this, chapter after chapter.

## Introduction

<img src="http://ecx.images-amazon.com/images/I/511D6FdsbXL._AA160_.jpg" width="250" height="250" />

I used grow my interest in a book depending on the introduction section because it's like an extension of the preface and the author can write more widely about all the contents of the book, showing what it has to offer and this book's introduction is a good one. The author says more about patterns, going beyond the UML representation or code, with a pattern's definition and other not technical benefits for who is using/know patterns, for instance if someone says "this class is a Remote Facade" and you know the pattern Remote Facade you don't need more information about it because you already know what it is for, or if you don't know you already know what you need to know, so design patterns creates a vocabulary about design. This section also describes how the information is organized in the book, divide in "How it Works","When to Use", "Further Reading" and a implementation example, in its simplest form.

## Chapter 1 - Layering

This chapter starts talking about on how this approach works, the most know example is the TCP/IP model which the application layer is built on top of the transport layer which uses services from the layer below and so on, without know there are others layers below the one which is providing service. This give us some benefits: Turns easy to maintain several parts of the code, you can replace one layer with alternative implementations of the basic service without crashing everything.

On the other hand, this approach have some downsides. This layering causes some dependencies between them, for instance, if you change the API of one layer you have to change it in the layer which uses this services, and all these layers can harm performance.

It also presents the three principal layers, which are the presentation, responsible to displaying information, domain for the system's logic and data source where the communication with databases, messaging systems, happens. But where you separete them depends on the complexity of your system. In systems where there are no users, the presentation is an external interface for a service your system offers. There is just a steady rule, the domain and data source should never be dependent on the presentation, this made easy to replace it for different kinds of presentations. The author also discuss about choosing where to run the presention layer(browser, sure!), putting some concerns on the UX and user needs.

So, that is it for the Introduction and Chapter 1, next week I'll talk about the Chapter 2 - Organizing Domain Logic.
