---
sidebar_position: 1
---

# Result

`Result` and `Result<T>` represent operations that can either succeed or fail.

They make failure explicit in your API and help you compose operations safely.

## When to Use Result

Use `Result` when an operation can fail and you want that fact to be visible in the type signature.

Examples:

- validation,
- business rules,
- repository calls,
- external service calls.

## Minimal Example

```csharp
using UnambitiousFx.Functional;
using UnambitiousFx.Functional.Errors;

Result<int> ParsePositiveInt(string input)
{
    if (!int.TryParse(input, out var value))
        return Result.Failure<int>(new ValidationError("Input is not a valid number"));

    if (value <= 0)
        return Result.Failure<int>(new ValidationError("Value must be positive"));

    return Result.Success(value);
}
```

## Most Used Operations

- `Map`: transform success value.
- `Bind`: chain another operation returning `Result`.
- `Ensure`: add an additional validation rule.
- `Recover`: provide fallback on failure.
- `Tap`: run a side effect when successful.
- `Match`: handle both success and failure.

## Composed Example

```csharp
Result<Order> CreateOrder(CreateOrderRequest request)
{
    return ValidateRequest(request)
        .Bind(valid => LoadUser(valid.UserId))
        .Ensure(user => user.IsActive, new ValidationError("User is inactive"))
        .Bind(user => SaveOrder(user, request))
        .Tap(order => _metrics.Increment("orders.created"));
}
```

## Error Types

Functional includes a set of built-in error types:

- `ValidationError`
- `NotFoundError`
- `ConflictError`
- `UnauthorizedError`
- `UnauthenticatedError`
- `ExceptionalError`

You can also define your own error types for domain-specific failures.

## Good Practices

- Return `Result` from application/domain services.
- Keep exceptions for truly exceptional scenarios.
- Convert `Result` to HTTP/UI responses only at boundaries.
- Prefer specific error types over generic error messages.