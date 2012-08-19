---
layout: post
title: Patterns of Enterprise Application Architecture - Organizing Domain Logic
---

<img src="http://ecx.images-amazon.com/images/I/511D6FdsbXL._AA160_.jpg" width="250" height="250" />

## Chapter 2 - Organizing Domain Logic

This chapter describe several ways for how to organize the domain logic and it relies into three primary patterns: Transaction Script, Domain Model and Table Module. Describing each approach and its biggest advantages and disadvantages, and showing how it interacts using other patterns like Gateway, RecordSet and Data Mapper.

##Transaction Script Pattern

The simplest approach to organize domain logic is using the Transaction Script, this pattern is essentially a procedure that takes the input from the presentation, processes it with validations and stores in the database. It then replies with data to the presentation layer. The fundamental organization is of a single procedure for each action that a user might want to do. You can use classes instead of procedures to use this pattern in an object-oriented fashion. The most common is to have several Transaction Scripts in a single class, where each method defines a subject area of related Transational Scripts. To identify the TSs you can think as each database transaction can be turned into a TS. The biggest advantage is its simplicity, organizing logic this way is good for applications with only a small amount of logic, this helps keeping the code clean and understandable, but increasing the complexity a amount of logic it keeps hard to keep it in a well-designed state, other problem to beware is the code duplication that could happen since the transaction seems to be fairly similar. When the domain logic gets more complex its time to use the Domain Model pattern.

##Domain Logic Pattern

This pattern has an OO style(which can be implemented as an Entity Bean in J2EE apps), it divides the logic into objects, in the simplest form, it looks like one object for each database table. A rich Domain Model can look different from the database design, with inheritance, strategies and other patterns, this approach is better for a more complex logic but its more harder to map to the database. A good ideia is to use a simple domain model with the Active Record pattern and the Data Mapper pattern for the complex ones. Since the bussiness logic can change, it's importante to be able to modify, build, and test this layer easily, so you'll want the minimum of coupling from the domain to other layers. A common concern is about overloading a domain object, you'll notice that some behavior is similar to every model and it could be good to isolate it in other object. The problem is that it creates code hard to maintain, and the other developers tend to not see it in the model and duplicate the code, and the duplication can quickly lead to complexity and inconsistency. So, the advice here is to only fix the bloating in the models when, and if, it becomes a problem.

##Table Module Pattern

One of the problems with the Domain Model pattern is the interface with relational databases, as a result is needed a lot of work to pull data in and out of the database as the complex of domain logic grows. The Table Module pattern organizes domain logic with one class per table and a single instance of a class contains the various methods to act on data. The main difference is that if with you have various objects using the Domain Logic pattern each one is responsible for itself, while using the table module, you will have to deal just if one instance to do the work for all the objects, it acts like a facade where you can do the CRUD and the object is unaware of the operations. This pattern gives you an interface that acts on the passed data. This pattern can be an instance with a collection of static methods, you can then use this instance to manipulate the data. The word table in the pattern name suggests that you have one Table Module per table in the database, while this is true in some cases it isn't recommended because the structure of the Table Module doesn't depends on the structure of the tables in the database but more on the virtual tables perceived by the applications, usually represented with some data structure resulted from some other query.

#Conclusion

As all things in software architecture you can choose what to use and how to use it to solve your problem, you can even use these three patterns combined if you need, as the author says, a good solution is implement the Domain Logic using Transaction Scripts on it. So it's up to you to decide the best approach to solve your problem. Next week I will talk about the Chapter 3.
