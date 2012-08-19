---
layout: post
title: Patterns of Enterprise Application Architecture - Concurrency
---

<img src="http://ecx.images-amazon.com/images/I/511D6FdsbXL._AA160_.jpg" width="250" height="250" />

##Chapter 5 - Concurrency

This chapter talks about concurrency, one of most tricky parts of software development. It don't pretend to give a general treatment of concurrency(for that it could need at least a book), but it introduces concurrency issues for enterprise application development. Once its done with the brief introduction about concurrency, we will start to talk about the patterns for handling concurrency. All the problems here discussed can be imagined like the problems that a control version tool deal.

##Concurrency Problems

The essential problems of concurrency are the problems that concurrency control systems try to prevent. The bigger problem here is that these system often create a new set of problems in their solutions. The First and simplest problem is called Lost updates. It happens, for instance, when someone is editing one file, then someone else starts to edit the same file and finish it before the first one, so the first one don't get the changes made by the other, and when he save his version will be write over the other version, updated early. The other problem is a inconsistent read. It occurs when you read two things that are correct pieces of information but not correct at the same time. For instance, if you read a value from A and then read a value from B to get a value C, if the A's value change while you are reading the B's value, your C value will be incorrect. Since the concurrency problems have been around for a while there are various solutions. For enterprise applications two solutions are particularly important: isolation and immutability. The problems accur when two active agents has access to the same data, one workaround here is data isolatio, partitioning the data so that any piece of it can only be accessed by one agent. This technique is used by operating systems to manage the memory used by processes. But what if we can't isolate all the mutable data? Then we have two approachs: optimistic and pessimistic concurrency control.

Using the optimistic locking Bob and Alice can edit the same file freely and the first one to finish can save it, and when the second one finish it's commit will be rejected and it comes to how wrote it to to figure out what to do to merge then. With the pessimistic locking whoever checks out the file first prevents anyone else from edit it. This approach can generate a deadlock since the other process who wants to access some locked resource can stay waiting forever and goes to starvation. A good way to think about it is that an optimistic lock is about conflict detection while a pessimistic lock is about conflict prevention.

##Other approachs for handling concurrency problems

If your locking strategy requires that an object be loaded in order to be locked, such as in the optimist lock, locking a large group affects performance, and with the pessimistic lock a large lock set is a management headache and increases lock table contention. A Coarse-Grained Lock allows you to manage the concurrency of a group of objects together in a single lock without having to load all the members of the group in order to lock them. Other way is using the Implicit Lock, which saves the developer from having to manage locks directly, since one line that a developer forget to lock something can break the entire application, so you let the lock for your application framework.


