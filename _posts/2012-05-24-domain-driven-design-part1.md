---
layout: post
title: Putting the Domain Model to Work
---

Today I started to read this book, it's about domain driven development, and it has a lot of good advices about development and how to build something useful in the best way possible.

##Crunching Knowledge

Software development it's not about computers or code, it's always about something else. For instance, when developing software for green peace to map all the area cleared, your software is about ecology, so how can you code for something you don't understand? You have to learn about the domain, and how to apply this knowledge when creating your models.
The first thing I learned was that your models will carry all the bussiness logic from your software(ok everyone knows that), but the new thing here is about the "conception" stage, don't using the "find the nouns" way of finding your models. Remeber you have to build this without know(yet) about the domain, so you will have to do this with the bussiness expert, usually is your client, which don't understand about software development, so you have to create your models in a way that your client understands it too, he will use specific words from his area, which you will have to learn, after sometime you and the business expert will start to understand each other.
In the end your models will be code this way, and with some guidance, you can even show some code to him for validation. There is were the beauty is. And this "crunching knowledge" as the author says, is one of the most cool things in software development. As a software engineer, you could work with all kind of things, in all areas, because everything needs a software.

##Communication and the Use of Language

On a project without a common language, developers have to translate for domain experts, and this translations ends turning into bottle necks, because developers tends to create abstractions that support their design but are not understood by the domain experts, and developers working on different parts of the problem work out their own design concepts and ways of describing the domain. A project faces serious problems when its language is fractured.
A solution is to use a "model-based" language, which should be used among developers to describe not only artifacts in the system, but tasks and functionality. This same model should supply the language for the developers and domain experts to communicate with each other, and for the domain experts to communicate among themselves about requirements, development planning and features.

##Binding Model and Implementation

As the project growls, the team ends to interprete the models of the diagrams in its own way, the project becomes chaotic and all the efforts made to make good models ends worthless. Most of its lost starts when the code begins, when developers are forced to come up with new abstractions for what was designed by the analists and it happens because wasn't given adequate access to domain experts for the developers.
If the design, or some central part of it, does not map to the domain model, that model is of little value, and the correctness of the software is suspect. At the same time, complex mappings between models and design functions are difficult to understand and, in practice, impossible to maintain as the design changes. A deadly divide opens between analysis and design so that insight gained in each of those activities does not feed into the other.


