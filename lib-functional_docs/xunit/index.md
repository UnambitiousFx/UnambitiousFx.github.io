---
sidebar_position: 1
---

# Functional.xunit

`UnambitiousFx.Functional.xunit` adds fluent assertions for `Result` and `Maybe<T>` in xUnit tests.

## Introduction

Use this package to make tests expressive and intention-revealing:

- Assert success and failure without verbose boilerplate.
- Inspect typed failures with fluent chaining.
- Keep async and sync assertions consistent.

## Install

```bash
dotnet add package UnambitiousFx.Functional.xunit
```

## Core Concepts

Every assertion starts from `ShouldBe()` and then narrows the expected case:

- `result.ShouldBe().Success()` for success branches
- `result.ShouldBe().Failure()` for failure branches
- `maybe.ShouldBe().Some()` and `maybe.ShouldBe().None()` for optional values

This style keeps tests readable while still enabling deep checks through `Where`, `WhichIs<TFailure>()`, and `And(...)`.

## Simple Example

```csharp
using UnambitiousFx.Functional.Failures;
using UnambitiousFx.Functional.xunit;

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

## Advanced Concepts

- [Result Assertion Patterns](./result-assertions.md)
- [Maybe Assertion Patterns](./maybe-assertions.md)
- [Async Assertion Patterns](./async-assertions.md)
- [Test Organization and Diagnostics](./test-organization.md)

## Async Support

The package includes assertion extensions for `ValueTask<Result<T>>` and `ValueTask<Maybe<T>>`.

Use the same `ShouldBe()` pattern after awaiting values in your tests.

## See Also

- [Result](/lib-functional/result/)
- [Maybe](/lib-functional/maybe/)
- [Failures and Metadata](/lib-functional/failures-and-metadata)
