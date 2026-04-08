---
sidebar_position: 3
---

# Functional.AspNetCore

`UnambitiousFx.Functional.AspNetCore` helps you convert `Result` and `Result<T>` into HTTP responses.

This keeps business logic independent from transport concerns.

## Install

```bash
dotnet add package UnambitiousFx.Functional.AspNetCore
```

## Setup

Register the HTTP mapping services once at startup:

```csharp
builder.Services.AddResultHttp();
```

## Minimal API Example

```csharp
using UnambitiousFx.Functional.AspNetCore.Http;

app.MapGet("/users/{id:guid}", async (Guid id, IUserService service) =>
    await service.GetUserAsync(id).ToHttpResult());

app.MapPost("/users", async (CreateUserRequest request, IUserService service) =>
    await service.CreateUserAsync(request)
        .ToCreatedHttpResult(user => $"/users/{user.Id}"));
```

## MVC Example

```csharp
using Microsoft.AspNetCore.Mvc;
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

By default, common errors map to standard HTTP status codes:

- `ValidationError` -> `400`
- `NotFoundError` -> `404`
- `UnauthorizedError` -> `401`
- `UnauthenticatedError` -> `403`
- `ConflictError` -> `409`
- `ExceptionalError` -> `500`

You can provide custom mappers for project-specific policies.