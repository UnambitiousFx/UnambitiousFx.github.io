---
sidebar_position: 3
---

# Custom Mappers and Policy Composition

Use custom mappers when built-in failure mappings are not enough for your API contract.

## Add Custom Failure Mappings

```csharp
using UnambitiousFx.Functional.AspNetCore;
using UnambitiousFx.Functional.AspNetCore.Mappers;

builder.Services.AddResultHttp(options =>
{
    options.AddMapper<RateLimitFailure>(429);

    options.AddMapper<PaymentRequiredFailure>(failure => new FailureHttpResponse
    {
        StatusCode = 402,
        Body = new { message = failure.Message }
    });
});
```

## Configure Policy Defaults

Global behavior can be tuned with adapter policy options, for example:

- Non-generic `Result` success status (`200` vs `204`)
- `Maybe.None` handling (`404` vs `204`)

## Composition Guidelines

- Keep domain failures transport-agnostic.
- Map transport semantics in one place (startup/composition root).
- Prefer typed failures over message parsing for deterministic mapping.

## See Also

- [HTTP Mapping Model and Defaults](./http-mapping.md)
- [Failures and Metadata](/docs/functional/failures-and-metadata)
