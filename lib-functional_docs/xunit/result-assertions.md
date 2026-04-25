---
sidebar_position: 2
---

# Result Assertion Patterns

Use fluent assertions to make success/failure expectations obvious.

## Success Assertions

```csharp
[Fact]
public void Parse_ValidValue_ReturnsSuccess()
{
    var result = Parse("42");

    result.ShouldBe()
        .Success()
        .Where(value => value == 42);
}
```

## Failure Assertions

```csharp
[Fact]
public void Parse_InvalidValue_ReturnsValidationFailure()
{
    var result = Parse("abc");

    result.ShouldBe()
        .Failure()
        .WhichIs<ValidationFailure>()
        .And(failure => Assert.Contains("integer", failure.Message));
}
```

## Pattern Tips

- Use `WhichIs<TFailure>()` to assert failure type explicitly.
- Use `And(...)` for focused assertions on failure details.
- Keep one behavior assertion per test.

## See Also

- [Maybe Assertion Patterns](./maybe-assertions.md)
- [Result](/lib-functional/result/)
