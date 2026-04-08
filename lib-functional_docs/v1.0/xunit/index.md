---
sidebar_position: 4
---

# Functional.xunit

`UnambitiousFx.Functional.xunit` provides fluent assertion helpers for functional types in tests.

It improves readability and keeps tests focused on behavior.

## Install

```bash
dotnet add package UnambitiousFx.Functional.xunit
```

## Result Assertions

```csharp
using UnambitiousFx.Functional.xunit;

var result = service.CreateUser(request);

result.ShouldBe().Success();
result.ShouldBe().Failure();
```

## Typed Error Assertions

```csharp
result.ShouldBe()
    .Failure()
    .ValidationError();
```

## Maybe Assertions

```csharp
using UnambitiousFx.Functional.xunit;

maybeUser.ShouldBe().Some();
maybeUser.ShouldBe().None();
```

## Predicate-Based Checks

```csharp
result.ShouldBe()
    .Success()
    .Where(user => user.Email.EndsWith("@example.com"));
```

## Why Use It

- clearer intent in tests,
- less repetitive test boilerplate,
- better failure messages for functional flows.