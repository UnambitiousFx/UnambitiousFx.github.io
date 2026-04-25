---
sidebar_position: 2
---

# Result

The `Result` type represents the outcome of an operation that can either succeed or fail with a failure object. It embodies
railway-oriented programming, providing a type-safe alternative to exceptions for control flow.

## Table of Contents

- [Introduction](#introduction)
- [Core Concepts](#core-concepts)
- [Simple Example](#simple-example)
- [API Reference](#api-reference)
- [Advanced Topics](#advanced-topics)
- [Best Practices](#best-practices)
- [See Also](#see-also)

## Introduction

Use `Result` when an operation can fail and you want that possibility to be explicit in the type system instead of
hidden in exception-driven control flow.

## Core Concepts

- `Result` models success/failure without a value.
- `Result<TValue>` models success/failure with a success value.
- Failures are typed objects that carry semantics and can be matched explicitly.
- Pipelines compose through `Bind`, `Map`, `Ensure`, `Recover`, and `Tap`.

## Simple Example

```csharp
Result<int> ParsePositive(string input) =>
    int.TryParse(input, out var value)
        ? value > 0
            ? Result.Success(value)
            : Result.FailValidation<int>("Value must be positive")
        : Result.FailValidation<int>("Input is not a number");

var result = ParsePositive("42")
    .Map(value => value * 2)
    .Ensure(value => value < 100, _ => new ValidationFailure("Value must be less than 100"));
```

## API Reference

The full API surface has been moved to a dedicated reference page so this guide can stay focused on concepts and
usage patterns.

- [Result API Reference](./api-reference)

## Advanced Topics

### Metadata

Results support attaching metadata for contextual information:

```csharp
// Add single key-value pair
var result = Result.Success()
    .WithMetadata("RequestId", "12345");

// Add multiple pairs
var result = Result.Success()
    .WithMetadata(
        ("RequestId", "12345"),
        ("UserId", "user-123")
    );

// Merge metadata
var result = Result.Success()
    .WithMetadata(existingMetadata);

// Use builder
var result = Result.Success()
    .WithMetadata(builder => {
        builder.Add("RequestId", "12345");
        builder.Add("Timestamp", DateTime.UtcNow);
    });

// Metadata is preserved through transformations
var result = GetData()
    .WithMetadata("Operation", "Fetch")
    .Bind(() => ProcessData()) // Metadata flows through
    .Map(x => x.ToString());
```

### LINQ Support

Results support LINQ query syntax:

```csharp
// Select (Map)
var result = from user in GetUser()
             select user.Name;

// SelectMany (Bind)
var result = from userId in GetUserId()
             from user in FetchUser(userId)
             select user;

// Where (filter with validation)
var result = from user in GetUser()
             where user.Age >= 18
             select user;
// Fails with ValidationFailure if predicate is false

// Complex queries
var result = from order in GetOrder()
             from customer in GetCustomer(order.CustomerId)
             where customer.IsActive
             from address in GetAddress(customer.AddressId)
             select new OrderDetails(order, customer, address);
```

## Best Practices

### 1. Use Railway-Oriented Programming

Chain operations and let failures propagate automatically:

```csharp
// Good
var result = GetUserId()
    .Bind(id => FetchUser(id))
    .Map(user => user.Email)
    .Ensure(email => email.Contains("@"),
            _ => new ValidationFailure("Invalid email"));

// Avoid manually checking each step
var userIdResult = GetUserId();
if (userIdResult.IsFailure) return userIdResult.ToResult();
// ...
```

### 2. Prefer Specific Failure Types

Use specialized failure factories for better semantics:

```csharp
// Good
return Result.FailNotFound("User", userId);
return Result.FailValidation("Email is required");

// Less clear
return Result.Failure("User not found");
```

### 3. Use Metadata for Context

Attach contextual information without polluting the result:

```csharp
return GetUser(id)
    .WithMetadata("UserId", id)
    .WithMetadata("Timestamp", DateTime.UtcNow);
```

### 4. Handle Failures at Boundaries

Keep most code using `Result`, convert to exceptions only at system boundaries:

```csharp
// In API controller
public IActionResult GetUser(string id)
{
    return GetUserById(id)
        .Match(
            success: user => Ok(user),
            failure: failure => failure switch
            {
                NotFoundFailure => NotFound(failure.Message),
                ValidationFailure => BadRequest(failure.Message),
                _ => StatusCode(500, failure.Message)
            }
        );
}
```

### 5. Leverage LINQ for Readability

Use LINQ syntax for complex chains:

```csharp
var result =
    from order in GetOrder(orderId)
    from customer in GetCustomer(order.CustomerId)
    from payment in ProcessPayment(order.Total)
    select new { order, customer, payment };
```

### 6. Use Tap for Side Effects

Don't break the chain for logging or other side effects:

```csharp
var result = GetUser(id)
    .Tap(user => _logger.LogInformation("User loaded: {Id}", user.Id))
    .Map(user => user.ToDto())
    .TapFailure(failure => _logger.LogError("Failed: {Error}", failure.Message));
```

### 7. Compensate for Transactional Rollbacks

Use `Compensate` for saga patterns or compensating transactions:

```csharp
var result = ReserveInventory(productId, quantity)
    .Bind(() => ChargePayment(amount))
    .Compensate(failure => ReleaseInventory(productId, quantity));
```

### 8. Combine for Parallel Operations

Use `Combine` when validating multiple independent results:

```csharp
var results = new[]
{
    ValidateName(input.Name),
    ValidateEmail(input.Email),
    ValidateAge(input.Age)
};

return results.Combine(); // Returns all validation errors if any fail
```

### 9. Type Safety with Constraints

`TValue` must be `notnull` - design your domain types accordingly:

```csharp
// Good
Result<User> GetUser(string id);
Result<IEnumerable<Order>> GetOrders();

// Not allowed
Result<string?> GetNullableValue(); // Compile error
```

### 10. Implicit Conversions

Leverage implicit conversions for cleaner code:

```csharp
public Result<User> CreateUser(string name)
{
    if (string.IsNullOrEmpty(name))
        return new ValidationFailure("Name required"); // Implicit conversion

    var user = new User(name);
    return user; // Implicit conversion
}
```

## See Also

- [Maybe](/lib-functional/maybe/)
- [Failures and Metadata](/lib-functional/failures-and-metadata)
- [ASP.NET Core Integration](/lib-functional/aspnetcore/)
- [xUnit Integration](/lib-functional/xunit/)
