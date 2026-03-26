---
sidebar_position: 3
---

# Maybe Assertion Patterns

`Maybe<T>` assertions keep optional-value behavior explicit in tests.

## Some Assertions

```csharp
[Fact]
public void FindUser_ExistingUser_ReturnsSome()
{
    var maybe = FindUser("john@example.com");

    maybe.ShouldBe()
        .Some()
        .Where(user => user.Email == "john@example.com");
}
```

## None Assertions

```csharp
[Fact]
public void FindUser_UnknownUser_ReturnsNone()
{
    var maybe = FindUser("missing@example.com");

    maybe.ShouldBe().None();
}
```

## Pattern Tips

- Use `Some().Where(...)` when validating projected fields.
- Use `None()` for absence without leaking implementation details.
- Pair with `Result` assertions when converting optional values to failures.

## See Also

- [Result Assertion Patterns](./result-assertions.md)
- [Maybe](../maybe.md)
