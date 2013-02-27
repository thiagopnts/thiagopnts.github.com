---
layout: post
title: Summary of Domain Driven Design - The Life Cycle of a Domain Object
---

Every object has a life cycle. An object is born, it likely goes throgh various states, and it eventually dies.

The challenges here:

1. Maintaining integrity throughout the life cycle
2. Preventing the model from getting swamped by the complexity of managing the life cycle

This chapter address these issues through three patterns. The first one is Aggregate pattern to avoid a chaotic tangled web of objects, the second is the Factory pattern, to create and reconstitute complex objects, and the last one will be the Repository pattern.

Although repositories and factories do not themselves come from the domain, they have meaningful roles in the domain design. These constructs complete the Model-Driven Design by giving us accessible handles on the model objects.

##Aggregates

Minimalist design of associations helps simplify traversal and limit the explosion of relationships somewhat, but most business domains are so interconnected that we still end up tracing long, deep paths through object references.

The problem is acute in a system with concurrent access to the same objects by multiple clients. With many users consulting and updating different objects in the system, we have to prevent simultaneous changes to interdependent objects. Getting the scope wrong has serious consequences.
An Aggregate is a cluster of associated objects that we treat as a unit for the purpose of data changes. Each Aggregate has a root and a boundary. The boundary defines what is inside the Aggregate. The root is a single, specific Entity contained in the Aggregate. The root is the only member of the Aggregate that outside objects are allowed to hold references to, although objects within the boundary may hold references to each other. Entities other than the root have local identity, but that identity needs to be distinguishable only within the Aggregate, because no outside object can ever see it out of the context of the root Entity.

Aggregates mark off the scope within which invariants have to be maintained at every stage of the life cycle. The following patterns, Factory and Repository, operate on aggregates, encapsulating the complexity of specific life cycle transitions.

##Factories

We should use this pattern when the creation of some object or an entire Aggregate becomes complex, the factories provide encapsulation. Much of the power of objects rests in the intricate configuration of their internals and their associations. An object should be distilled until nothing remains that does not relate to its meaning or support its role in interactions. This mid-life cycle responsibility is plenty. You can have a lot of problems if you overload a complex object with responsibility for its own creation (and this doesn't make sense).

Complex object creation is a responsibility of the domain layer, yet that task does not belong to the objects that express the model. There are some cases in which an object creation and assembly corresponds to a milestone significant in the domain, such as "open a bank account." But object creation and assembly usually have no meaning in the domain they are just a necessity of the implementation. So you have to add something to the domain design that is not a Enitity, a Value Object, or a Service. The factory encapsulates de knowledge needed to create a complex object, providing an interface that reflects the goals of the client and an abstract view of the created object.

##Repositories

To do anything with an object, you have to hold a reference to it. How do you get that reference? One way is to create the object, as the creation operation will return a reference to the new object. A second way is to traverse an association. You start with an object you already know and ask it for an associated object. Any object-oriented program is going to do a lot of this, and these links give object models much of their expressive power. But you have to get that first object. From a technical point of view, retrieval of a stored object is really a subset of creation, because the data from the database is used to assemble new objects. Indeed, the code that usually has to be written makes it hard to forget this reality. But conceptually, this is the middle of the life cycle of an Entity and the repository enters here. A Customer object does not represent a new customer just because we stored it in a database and retrieved it. To keep this distinction in mind, we refer to the creation of an instance from stored data as reconstitution.

A Repository represents all objects of a certain type as a conceptual set. It acts like a collection, except with more elaborate querying capability. Objects of the appropriate type are added and removed, and the machinery behind the Repository inserts them or deletes them from the database. This definition gathers a cohesive set of responsibilities for providing access to the roots of AGGREGATES from early life cycle through the end.