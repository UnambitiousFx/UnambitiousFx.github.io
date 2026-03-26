---
sidebar_position: 5
---

# MVC and Controller Patterns

Use MVC adapters when your project uses controllers and `IActionResult`.

## Basic Controller Pattern

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

## Controller Guidance

- Return `IActionResult` and adapt from functional outcomes at the boundary.
- Keep services free of MVC-specific constructs.
- Reuse the same mapping configuration across Minimal APIs and MVC.

## Common Use Cases

- Legacy controller-based APIs adopting functional error handling.
- Mixed codebases using both controller and Minimal API endpoints.

## See Also

- [HTTP Mapping Model and Defaults](./http-mapping.md)
- [Minimal API Patterns](./minimal-api-patterns.md)
