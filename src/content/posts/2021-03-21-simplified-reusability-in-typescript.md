---
template: blog-post
title: Simplified Reusability in Typescript
slug: /simplified-reusability-in-typescript
date: 2021-03-21 15:47
description: How do you simplify you typescript software system? What are the
  different ways Software Engineers can leverage patterns to simplify the
  complexity in their systems?
featuredImage: ""
---
## Problem Statement

The reusability of a system can lead a system to be either simply complex or unmaintainable and complicated. The key difference between these two is that a complex system could mold itself to many different types of inputs while a complicated system is rigid and can be overwhelmed easily. In this blog, I want to explain a few processes for the implementation of simple reusability within a Typescript application and from there, I want to suggest methods that can be leveraged to reduce the complexity of adding to this framework.

## Factory Pattern

If you are in the software industry, it is likely you have heard of [the factory pattern](https://en.wikipedia.org/wiki/Factory_method_pattern). This is a tool that can be leveraged to provide a layer of [indirection](https://en.wikipedia.org/wiki/Indirection) between a service, view, or model class and the underlying implementation of domain logic. This provides a few key benefits:

1. Separation of responsibilities between the caller class and the callee class.
2. Improved testability by separating those responsibilities.
3. Reduced dependencies in the caller class as you don't need all the different implementation classes, just the factory.

This list is not comprehensive, but the above should signal the importance and why this pattern is widely used in software systems - especially object-oriented applications.

### Types of Implementation

Another aspect of working in the software industry would be the idea that there is single way of implementing something - there are always multiple approaches that can be taken with several ups and downsides. In this article, I will be going over a few methods that can be used to improve the flexibility of your system by implementing a factory pattern that is easily added to by updating few files rather than many.

## The Foundations of the Factory Pattern

Before we dive into different approaches for the implementation, I'd like to first give a high level overview of what scaffold components must be created in order to implement a factory pattern *in any language*.

1. Implementation class

   This class is responsible for the fundamental business logic that we want to encapsulate in a separate class.
2. Factory class

   This class is responsible for providing the ability to *retrieve* the implementation class based on an arbitrary input.
3. Caller class

   This class is responsible for asking the Factory class for the specific implementation. This class acts as an entry into the fundamental business logic that could differ between implementation classes.

There are optional additions to the above which will we see in the coming approaches. However, at a foundational level, these are the only three pieces of functionality necessary to implement the Factory pattern.

## Problem to be Solved

The requirement we are faced with is to have an implementation of feature logic that can be flexible as we will be integrating this feature logic with multiple services. 

The feature logic will be executed by the application based on a `string` constant.

Based on this `string` constant, the system should assume different implementation strategies of how things should be executed. We will have three types:

1. Legacy
2. Default
3. Permission-based

Legacy will be determined through the string: `legacy`. Default will be determined through the string: `default`. Permission-based will be determined through the string: `permission`.

With the above, we should have the required knowledge to complete this feature.

## Shared Code

Based on the above, we can have the following pieces of shared code:

1. Constant class

   The responsibility of this class will be a centralized area to hold the string values necessary to  retrieve the different implementations of this class.

   * Implementation class for all strategies

     * Code

       ```tsx
       class Constants {
         static EXPERIMENTAL: string = 'experimental';
         static DEFAULT: string = 'default';
       }
       ```

       Explanation: Through static variables, we have the ability to reuse the different inputs that will return the different implementation classes
2. Implementation class

   Regardless of the methodology we use for completing this example, the calling class to the factory class should not change - therefore, this can be considered shared code.

   * Implementation class for the first two strategies

     * Code

       ```tsx
       class ExperimentalFeature implements TypedFeature {
         private message: string;

           constructor(message: string) {
               this.message = message;    
           }
           
           describeFeature() {
               console.log(`state=[experimental]\tmessage=[${this.message}]`);
           }
       }

       // Implementation class Default
       class DefaultFeature implements TypedFeature {
          
          private message: string;

           constructor(message: string) {
               this.message = message;
           }
           
           describeFeature() {
               console.log(`state=[default]\tmessage=[${this.message}] will be defaulted.`);
           }
       }

       // Implementation class Permission
       class PermissionedFeature implements TypedFeature {
           constructor() {}
           
           describeFeature() {
               console.log(`state=[permissioned]\tmessage=[I don't have a message, you need permissions for me]`);
           }
           
       }
       ```

       Explanation: These classes implement the interface in the next bullet point. These classes simply implement a `console.log` to distinguish between the different implementations of the interfaces.
3. Interface

`Caveat:` Because we are using a typed language, we also must provide some sort of interface so that the compiler can understand the different methods available for the calling class. This would not be necessary if we were to use a language like Javascript.

* Implementation of the interface for the first two strategies

  * Code

    ```tsx
    interface TypedFeature {
      describeFeature(): void;
    }
    ```

[Full repl.it  available here](https://repl.it/@ewhipp/Factories-in-Typescript)

## The First Approach (if/else)

The first approach we will take is the simplest approach for showcasing the base level of necessities for this approach. 

```tsx
class IfFeatureFactory {
  getFeature(type?: string): TypedFeature {
        if (type === PublishConstants.EXPERIMENTAL) {
            return new ExperimentalFeature('experimental');
        } else if (type === PublishConstants.DEFAULT) {
          return new DefaultFeature('default');
        } else { 
          return new PermissionedFeature();
        }
    }
}
```

Explanation: In this case, we see that if we want to include a new approach, we will need to:

1. Add another if statement to this factory class
2. Add another Constant to `PublishConstants` and ensure these match up to the implementation code
3. Add the implementation of the interface

## The Second Approach (case statements)

The second approach is very similar to the first, the main difference being the consolidation of code characters. In reality, it has all of the compositional characteristics of the first approach.

```tsx
class CaseFeatureFactory {
    getFeature(type?: string): TypedFeature {
        switch(type) {
            case('experimental'): return new ExperimentalFeature('experimental');
            case('default'): return new DefaultFeature('default');
            default: return new PermissionedFeature();
        }
    }
}
```

Explanation: 

Explanation: In this case, we see that if we want to include a new approach, we will need to:

1. Add another case statement to this factory class
2. Add another Constant to `PublishConstants` and ensure these match up to the implementation code
3. Add the implementation of the interface

## The Third Approach (Modules)

This final approach is where we get into a bit more of a flexible and maintainable approach. The beauty of this implementation comes from the ability to dynamically add to the available implementations through the registration of an implementation class rather than updating the factory implementation. This is done through [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) and [modules](https://www.typescriptlang.org/docs/handbook/modules.html).

### A Slight Change to the Interface

Before starting this approach, we do need to make a small change to the interface we defined earlier in the article. This is because, instead of having to set dependencies and determine return types in the factory class, we want to consolidate this logic within the implementation of the interface. This will be done through the inclusion of two methods:

1. `setDependencies()` which will set any required dependencies for the implementation class to work as expected
2. `support()` which will utilize an arbitrary data type (a string in our use case) to determine what will return the current implementation of the interface

The above can be shown through the following code snippet:

```tsx
interface TypedFeature {
  describeFeature(): void;
  support(): string;
  setDependencies(): void;
}
```

### The Introduction of a Module and Corresponding Decorator

Our implementation will utilize modules to provide a specific [namespace](https://en.wikipedia.org/wiki/Namespace) for which our decorator can apply in an effort to consolidate the scope of our factory to a specific domain. This is done through the following code snippet:

```tsx
export module TypedFeature {
  // array of implementations of the interface
  let implementations: Constructor<TypedFeature>[] = [];

  // Generate a type that declares the composition of a constructor in TS
  type Constructor<T> = {
    new(...args: any[]): T;
    readonly prototype: T;
  }

  // getter the implementations of TypedFeature
  export function GetImplementations(): Constructor<TypedFeature>[] {
    return implementations;
  }

  // Annotation to register the implementations of TypedFeature
  export function register<T extends Constructor<TypedFeature>>(constructors: T) {
    implementations.push(constructors);
    return constructors;
  }
}
```

Explanation: The above code snippet does the following:

1. Create a module or namespace that can be used to give a specific scope that is different from the global scope. This is so that we do not have conflicts if we are to use this strategy for other parts of the domain our code set is working within.
2. Generate a [Typescript type alias](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases) that defines the compositional characters of a Constructor in Typescript
3. Declare an array that will hold all implementations of the `TypedFeature` interface

   1. Declare a Getter for the array
   2. Declare a register decorator that will only work if placed upon a class that properly implements the `TypedFeature` interface

### Implementing the Factory Pattern

Next, we need to implement a factory pattern that can leverage the changes above to properly generate the interface implementations and return an object that will easily update and retrieve the different implementations with minimal changes needed in the future. By minimal changes in the future, the only code updates that will be needed once this is setup, is adding an interface implementation of `TypedFeature` and adding `@TypedFeature.register` above the class itself.

We will do this through the following:

1. Create a private map that will be based on the following key-value pairs

   1. key: the string returned by the `support()` method of the `TypedFeature`
   2. value: the implementation of the `TypedFeature`
2. During construction of the factory map, return all implementations of `TypedFeature`s through the module method `TypedFeature.GetImplementations()`
3. Construct the implementation of the `TypedFeature`
4. Utilize the method `setDependencies()` to ensure the constructed implementation has all that is necessary to function properly
5. Utilize the map in step 1. and the implementation in step 3. to generate the key value pair of `{ supports() : implementation }`
6. Generate a method that allows public access into the map and returns the proper implementation along with a default if no implementation is found.

```tsx
class DynamicFactory {
		// 1
    readonly factoryMap = new Map();

    constructor() {
			// 2
      TypedFeatureMethod3.GetImplementations().forEach(implementation => {
			  // 3
        const currentImplementation = new implementation();
				// 4
        currentImplementation.setDependencies();
				// 5
        this.factoryMap.set(currentImplementation.support(), currentImplementation);
      })
    }

		// 6
    get(input?: string): TypedFeature {
      const feature = this.factoryMap.get(input);
      if (feature === undefined) {
        return new PermissionedFeature();
      }
      return feature;
    }

}
```

### Implementation classes used by the Factory

With the construction of our factory, we can now create implementations of our interfaces without ever needing a code change to the factory class itself. This does the following:

1. Consolidates implementation details to the interface implementation classes themselves

   1. Notice support() determines the return implementation rather than the string value in the factory
2. We no longer need to update the Factory class to add a new possible implementation; this is completed by means of the Decorator

The following are examples of the code necessary to generate a new `TypedFeature` in this implementation strategy.

* Example 1

  ```tsx
  @TypedFeature.register
  class DefaultFeature implements TypedFeature {
     
     private message: string;

    support(): string { return PublishConstants.DEFAULT }
      constructor(message: string) {
          this.message = message;
      }

      setDependencies() { 
        this.message = 'default';
      }
      
      describeFeature() {
          console.log(`state=[default]\tmessage=[${this.message}] will be defaulted.`);
      }
  }
  ```
* Example 2

  ```tsx
  @TypedFeature.register
  class ExperimentalFeature3 implements TypedFeature {
    private message: string;

    support(): string { return PublishConstants.EXPERIMENTAL}

      constructor(message: string) {
          this.message = message;    
      }

      setDependencies() { this.message = 'experimental';
      }
      
      describeFeature() {
          console.log(`state=[experimental]\tmessage=[${this.message}]`);
      }
  }
  ```
* Example 3

  ```tsx
  @TypedFeature.register
  class PermissionedFeature3 implements TypedFeature {
      constructor() {}

      setDependencies() { }
      
      support(): string { return ''; }
      describeFeature() {
          console.log(`state=[permissioned]\tmessage=[I don't have a message, you need permissions for me]`);
      }
      
  }
  ```

## Layer of Indirections

With these three examples we can see how layers of indirection allow us to generate multiple different implementation strategies without having to change higher level modules. This allows us a firm cutoff at different points in logic flow throughout our code bases. This provides us some ability to reason with where bugs might occur in our code set based on the feature we are working with, more control over dependencies, and easier testability through code segregation.

* If calling class

  ```tsx
  const ifFeatureFactory = new IfFeatureFactory();
  const experimentalFeature = ifFeatureFactory.getFeature(PublishConstants.EXPERIMENTAL);
  experimentalFeature.describeFeature();
  ```
* Case calling class

  ```tsx
  const caseFeatureFactory = new CaseFeatureFactory();
  const experimentalFeature = caseFeatureFactory.getFeature(PublishConstants.EXPERIMENTAL);
  experimentalFeature.describeFeature();
  ```
* Dynamic calling class

  ```tsx
  const dynamicFactory = new DynamicFactory();
  const experimentalFeature = dynamicFactory.get(PublishConstants.EXPERIMENTAL);
  experimentalFeature.describeFeature();
  ```

## Takeaways

The three implementation strategies depicted here are work towards the same outcome. However, the difference and key takeaway is the ability to maintain this code, and introduce new code that will leverage the history of the code-set in an easy and effective manner. As a brief overview, the patterns above:

1. Provide a layer of indirection between caller classes and the implementation code 
2. This layer provides

   1. Easier testability
   2. Separation of Responsibilities
   3. Flexibility
   4. Easier ability to debug and find errors

The key difference between the 1st and 2nd pattern with the 3rd pattern is that the 1st and 2nd pattern require the software engineer to maintain

1. The factory class
2. The implementation code

The 3rd pattern requires the software engineer to focus specifically on the implementation code without needing to worry about the factory code. This provides the software engineer with a level of reliability in the layer of indirection and the ability to focus specifically on the implementation code. These two factors provide the ability to create a simplified complex, and flexible system vs a complicated system.