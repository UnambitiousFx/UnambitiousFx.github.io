---
sidebar_position: 4
---

# Minimal API Patterns

This page shows practical patterns for Minimal APIs with functional return types.

## Query Endpoint Pattern

```csharp
using UnambitiousFx.Functional.AspNetCore.Http;

app.MapGet("/users/{id:guid}", async (Guid id, IUserService service) =>
    await service.GetUserAsync(id).ToHttpResult());
```

Use this pattern when reading resources and mapping failures automatically.

## Command Endpoint Pattern

```csharp
app.MapPost("/users", async (CreateUserRequest request, IUserService service) =>
    await service.CreateAsync(request).ToCreatedHttpResult(user => $"/users/{user.Id}"));
```

Use `ToCreatedHttpResult` when the success case creates a resource.

## Endpoint Design Tips

- Keep validation/business logic in services returning `Result`.
- Keep handlers thin and focused on binding + transport adaptation.
- Preserve metadata for tracing and diagnostics.

## See Also

- [Result](/lib-functional/v2.0/result/)
- [Custom Mappers and Policy Composition](./custom-mappers.md)
