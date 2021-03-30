---
template: blog-post
title: "Breaking Down the Agile Manifesto: Why JIRA != Agile"
slug: /breaking-down-the-agile-manifesto
date: 2021-03-29 22:51
description: The agile manifesto is not the same thing as using JIRA. We need to
  remember that the manifesto is comprised of core principles that should drive
  the work we set out to accomplish.
---
<!--StartFragment-->

### Problem Statement

I have worked for companies in the past that have touted they are an [agile](https://agilemanifesto.org/) shop, however, when you start to dive deeper into the project management principles of the company: they use JIRA, Trello, Monday, or some other project management tool but do not conform to the principles and practices that provide a framework of agility in the context of software management.

In this post, I want to break down the agile manifesto as I understand it.

### What is Agile?

I think human beings try to understand the world to deal with its complexity. This is ultimately where the mischaracterization or lack of understanding of agile comes from. The idea of agile is that you can create a shared understanding between all of your pillars such that, when discussing the creation of software, you can move from feature to feature in an quick & flexible manner.

What does this mean?

The idea of agile is just like the word: agility. To be an agile firm when producing a product, you must have a shared understanding between your product team, your engineering team, and your business stakeholders. Without this, the entire concept is meaningless.

Think about it.

If you are working in a cross-functional team, but have no way of properly communicating about the domain, understanding the priorities, for whom (which customer) the priority of the week effects, and the different steps that are necessary to pull together all of the pieces - how can you reasonably track the amount of time the initiative is going to take? This is why shared understanding is a core principle of agile. It is in the first line of the manifesto:

> Individuals and interactions over processes and tools

### Scapegoating

The problem with this first line is that it is vague. However, I think this is done intentionally. The problem arises from the fact that many organizations will take this statement to mean that they no longer need to create documentation or generate any artifacts to produce a meaningful software project. However, this is just not the case. My interpretation of this statement is that you prioritize the method in which a team of people will acquire a shared understanding of the objective *based on the individuals* and not rely on a simple process or tool to provide that context.

Picture the following scene, I'm sure we've all been there. You have three people who are working on the same project, they've just agreed: they are on the same page. However, person one believes that the requirements will ultimately produce the output of a square. Person two believes the requirements will ultimately produce the output of a circle. Person 3 believes the requirements will ultimately produce the output of a triangle.

Do you see the situation here?

Instead of continuing, the idea would be to produce a shared understanding between these three people. Why don't they draw a diagram of what they expect? Create something in the many tools that we have? Explain their individual understanding of what the requirements entail. Visualization can be a key feature of a well-functioning team.

Now, the next line of the manifesto might go against everything I've just said.

> Working software over Comprehensive Documentation

Or does it?

### Clean Code

The previous quote is yet another reason many people argue that providing documentation just isn't agile. You have to maintain that documentation, you have to revisit it when a new engineer comes on board, sometimes hot fixes occur and the documentation is forgotten. However, I think this gets away from the meaning of the statement.

There is a keyword in the quote: comprehensive.

The idea is not that an engineering organization should never hold itself accountable for documenting software because there isn't time or the features are more important. The idea is that there is more than one way to document your project. One way is through [clean code best practices](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882). One principle I always try to adhere to is the idea that comments are not necessary for private or non-published applications. When code requires a comment, you can probably write the code in a more meaningful way.

This is one example of documentation.

One of the first things I like to do when joining a project is looking through the test suite. Properly written tests with declarative test suite names and test cases are another form of documentation.

You don't always need to have packets of requirements to classify your project as well-documented. In my experience, a good test suite, declarative code, and a high-level architecture diagram are enough to get the idea as a new engineer.

From a product management perspective, this could be personas, well-written stories with acceptance criteria that are properly allocated to versioned epics or initiatives along with a vision statement.

Generally, I've only seen comprehensive written documentation benefit the business stakeholders which isn't a bad thing - but generally, users, product, and engineering will be a larger impetus to the determination and completion of upcoming priorities.

### Understanding your Outcome

> Customer collaboration over Contract negotiation

The next line in the manifesto determines something that I have found some organizations tend to forget. The collaborative nature that agile requires is not about adding meetings and determining the nitty-gritty detail of where a button should go or what the size of the text should be. Collaboration with your users is about understanding your impact on your user base and how to achieve it. Put in another way, you should not focus on the output of contract negotiation, instead, focus on the outcome from customer collaboration.

When we are building software, we are changing the world with each completed feature. When we use tools like JIRA, Trello, Notion, and any other project management tool of your fancy, we tend to focus on the output. What was our velocity this sprint? How many tasks were completed this week?

This mindset shifts our focus away from outcomes to output. If we are creating an application that is supposed to generate lifesaving information or track the quality of an important product, does it matter for our customer how many tickets we completed this week?

The focus on collaboration is about understanding what your goal is - what outcome are you looking for?

### Agility vs. Rigidity

The final line of the agile manifesto:

> Responding to change over following a plan

The final step of the manifesto is where the culmination of the above practices *allows* a team to pivot quickly. If a collection of people working towards the same goal have:

1. A shared understanding
2. A set of tools, historical documentation, or artifacts that reinforce that understanding
3. A purpose or outcome they are aiming to produce collectively

They will have the ability to respond to change quickly.

Think about it, if you have personas, diagrams, well-written tasks, clean code, tested code, and a vision for what you are trying to produce, changing the code to respond to a newly requested feature or critical bug should be easy.

With personas, you have an understanding of who is affected by this change.

With diagrams and a vision, you understand the high-level organization of your domain's complexity.

With well-written tasks, you can break up the complexity into smaller trackable work that moves toward a specific outcome.

With clean, tested code, you can be sure that your architecture is understandable, and tested. New changes that might break old code will be found and you can go home on Friday night knowing you won't get a call because of the pivot your team had to make on Wednesday.

### Conclusion

When I initially started writing this article, I had no intention of breaking down the agile manifesto line by line. I was planning to discuss the concept that a project management tool does not inherently mean you are following the project management framework you think you are. I've seen many organizations try to execute by implementing agile-fall, a deadly combination of waterfall and agile. These two methodologies are complete contradictions and the projects that follow them tend to be combative and inefficient.

While I don't think one or the other is better, I do think specific projects are better off as waterfall projects and others as agile projects. In the end, if you plan to execute using the agile methodology, follow the manifesto but don't use it as an excuse for not doing what you know you need to do.

<!--EndFragment-->