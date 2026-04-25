---
sidebar_position: 4
---

# Async Assertion Patterns

Use the same fluent style for async pipelines after awaiting the value.

## Async Result Example

```csharp
[Fact]
public async Task CreateUser_ValidInput_ReturnsSuccess()
{
    var result = await _service.CreateUserAsync("alice@example.com");

    result.ShouldBe()
        .Success()
        .Where(user => user.Email == "alice@example.com");
}
```

## Async Maybe Example

```csharp
[Fact]
public async Task FindUser_UnknownEmail_ReturnsNone()
{
    var maybe = await _service.FindUserAsync("missing@example.com");

    maybe.ShouldBe().None();
}
```

## Pattern Tips

- Await first, then assert.
- Keep assertions deterministic by avoiding timing-dependent side effects.
- Prefer explicit data setup over implicit shared state.

## See Also

- [Result Assertion Patterns](./result-assertions.md)
- [Maybe Assertion Patterns](./maybe-assertions.md)
