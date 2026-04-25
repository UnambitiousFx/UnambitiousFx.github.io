---
sidebar_position: 1
---

# Functional (v1.0)

`UnambitiousFx.Functional` is a lightweight toolkit for explicit and composable application flows.

Use it when you want to:

- avoid exception-driven control flow,
- make success/failure explicit in method signatures,
- model optional values clearly,
- keep application logic easy to test.

## Core Types

- `Result`: success or failure (no success value).
- `Result<T>`: success or failure with a success value.
- `Maybe<T>`: a value is present (`Some`) or missing (`None`).

## Install

```bash
dotnet add package UnambitiousFx.Functional
```

Optional packages:

```bash
dotnet add package UnambitiousFx.Functional.AspNetCore
dotnet add package UnambitiousFx.Functional.xunit
```

## Typical Pipeline

```csharp
using UnambitiousFx.Functional;
using UnambitiousFx.Functional.Errors;

Result<User> CreateUser(CreateUserRequest request)
{
    return Validate(request)
        .Bind(valid => BuildUser(valid))
        .Bind(user => Save(user))
        .Tap(user => _logger.LogInformation("User {Id} created", user.Id))
        .Ensure(user => user.IsActive, new ValidationError("User is not active"));
}
```

## Principles

- Treat errors as values.
- Keep chains readable with `Bind`, `Map`, `Ensure`, and `Match`.
- Handle technical boundaries (HTTP, UI, messaging) at the edges.
- Keep domain and application logic pure and testable.

## Where to Go Next

1. [Result](/lib-functional/v1.0/result/)
2. [Maybe](/lib-functional/v1.0/maybe/)
3. [Errors and Metadata](/lib-functional/v1.0/failures-and-metadata)
4. [Functional.AspNetCore](/lib-functional/v1.0/aspnetcore/)
5. [Functional.xunit](/lib-functional/v1.0/xunit/)
