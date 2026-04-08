---
sidebar_position: 5
---

# Errors and Metadata

In Functional v1.0, failures are represented by typed `Error` objects.

This gives you explicit, structured failure handling instead of relying on generic messages or exceptions for control flow.

## Built-in Error Types

Common built-in types include:

- `ValidationError`
- `NotFoundError`
- `ConflictError`
- `UnauthorizedError`
- `UnauthenticatedError`
- `TimeoutError`
- `ExceptionalError`
- `AggregateError`

## Why Typed Errors Matter

- You can map specific error types to HTTP status codes.
- Tests become more precise (`expect ValidationError`, not just `expect failure`).
- Error handling logic is easier to maintain.

## Example

```csharp
using UnambitiousFx.Functional;
using UnambitiousFx.Functional.Errors;

Result<string> ValidateEmail(string email)
{
    if (string.IsNullOrWhiteSpace(email))
        return Result.Failure<string>(new ValidationError("Email is required"));

    if (!email.Contains('@'))
        return Result.Failure<string>(new ValidationError("Email format is invalid"));

    return Result.Success(email);
}
```

## Metadata

`Result` and `Result<T>` can carry metadata for contextual information.

```csharp
var result = Result.Success("ok")
    .WithMetadata("requestId", "req-001")
    .WithMetadata("traceId", "trace-xyz");
```

Typical metadata values:

- request/correlation IDs,
- timing and diagnostics,
- business context useful for logging.