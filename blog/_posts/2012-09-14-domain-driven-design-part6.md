---
layout: post
title: Summary of Domain Driven Design - Making Implicit Concepts Explicit
---

This chapter like the last one is tiny and teach us how important is to make implicit concepts of the domain in explicit fields/relations/etc in the model and design. This transformations of domain models happens when developers recognize a concept that has been hinted or present implicitly in the design, so you can represent it explicitly in the model with one or more objects or relationships. This looks like a breakthrough, but the difference here is that it happens in the early stages of domain design, when the breakthrough happens after a lot of refactoring.

##Digging Out Concepts

This concepts can be discovered by listening to the language the team uses while speaking about the domain, which means sometimes you have to search them out. For example, a user have always talked about some item on a report, the item is compose by various objects, but you have never seen the need for an object for that. Then you realize the item on that report is an important domain concept. So, now you and the user understands each other more precisely, and demonstrations of model interaction to solve specific scenarios become more natural. This ends to a cleaner design.

So, basically what you have to do is listen to the language the domain experts use. You can take notes while he speaks and then ask him to clarify some points for you. This is not the old rule for "nouns are objects", hearing a new word produces a lead, which you follow up with the conversation, with the goal of discovery a useful concept. Or you can use it to avoid ubiquitous language which leads to misunderstand of concepts.

Eventually, the concept you need is not always floating on the surface, or in documents, you may have to dig. The place to dig is the most awkward part of your design, the place where the complicated things happen. You have to actively engage the domain experts in this search, which will validate your new ideas. Other way is to get the requirements from different domain experts or more than once from the same expert, even the same person provides information that is logically inconsistent after careful analysis, such contradictions, which we encounter a lot when digging into software requirements, can be a great clue to deeper models.

Constraints are a particularly important category of model concepts. They often emerge implicitly, so expressing them explicity can improve design. Sometimes it find a natural home in an object or method, even the simple ones should be documented and make it explicity.





