---
sidebar_position: 1
---

# Functional.AspNetCore

`UnambitiousFx.Functional.AspNetCore` converts `Result` and `Maybe<T>` to HTTP responses for both Minimal APIs and MVC.

## Introduction

Use this package to keep application logic in `Result`/`Maybe` form and map outcomes to HTTP consistently at the API
boundary.

## Core Concepts

- Domain and application services return `Result` or `Maybe<T>`.
- Transport mapping is centralized through adapters (`ToHttpResult` and `ToActionResult`).
- Failure-to-status mapping remains explicit and customizable.

## Install

```bash
dotnet add package UnambitiousFx.Functional.AspNetCore
```

## Setup

Register services once:

```csharp
builder.Services.AddResultHttp();
```

## Simple Example

Namespace: `UnambitiousFx.Functional.AspNetCore.Http`

```csharp
using UnambitiousFx.Functional.AspNetCore.Http;

app.MapGet("/users/{id:guid}", async (Guid id, IUserService service) =>
    await service.GetUserAsync(id).ToHttpResult());

app.MapGet("/profiles/{id:guid}", async (Guid id, IProfileService service) =>
    await service.TryGetProfileAsync(id).ToHttpResult());

app.MapPost("/users", async (CreateUserRequest request, IUserService service) =>
    await service.CreateAsync(request).ToCreatedHttpResult(user => $"/users/{user.Id}"));
```

## Advanced Concepts

- [HTTP Mapping Model and Defaults](./http-mapping.md)
- [Custom Mappers and Policy Composition](./custom-mappers.md)
- [Minimal API Patterns](./minimal-api-patterns.md)
- [MVC and Controller Patterns](./mvc-patterns.md)

## MVC Controllers

Namespace: `UnambitiousFx.Functional.AspNetCore.Mvc`

```csharp
using UnambitiousFx.Functional.AspNetCore.Mvc;

[ApiController]
[Route("api/users")]
public sealed class UsersController : ControllerBase
{
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> Get(Guid id, [FromServices] IUserService service)
        => await service.GetUserAsync(id).ToActionResult();
}
```

## Default Error Mapping

Built-in failure mappings:

- `ValidationFailure` -> 400
- `NotFoundFailure` -> 404
- `UnauthorizedFailure` -> 401
- `UnauthenticatedFailure` -> 403
- `ConflictFailure` -> 409
- `ExceptionalFailure` -> 500
- unhandled failures -> 500

## See Also

- [Result](/lib-functional/result/)
- [Maybe](/lib-functional/maybe/)
- [Failures and Metadata](/lib-functional/failures-and-metadata)