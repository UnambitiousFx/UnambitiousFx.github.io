---
sidebar_position: 2
---

# Functional

UnambitiousFx.Functional is a lightweight functional programming toolkit for .NET.

It gives you core building blocks for explicit, composable workflows:

- `Result` / `Result<T>` for explicit success-failure flows.
- `Maybe<T>` for optional values without null checks everywhere.

## Packages

```bash
dotnet add package UnambitiousFx.Functional
```

For web APIs:

```bash
dotnet add package UnambitiousFx.Functional.AspNetCore
```

For test assertions with xUnit:

```bash
dotnet add package UnambitiousFx.Functional.xunit
```

## Quick Start

```csharp
using UnambitiousFx.Functional;
using UnambitiousFx.Functional.Failures;

static Result<int> ParsePositiveInt(string input)
{
	if (!int.TryParse(input, out var value))
		return Result.Failure<int>(new ValidationFailure("Input is not a valid integer"));

	if (value <= 0)
		return Result.Failure<int>(new ValidationFailure("Value must be positive"));

	return Result.Success(value);
}

var result = ParsePositiveInt("42")
	.Map(value => value * 2)
	.Ensure(value => value < 100, new ValidationFailure("Value must be less than 100"));

result.Match(
	success: value => Console.WriteLine($"Success: {value}"),
	failure: error => Console.WriteLine($"Failure: {error.Code} - {error.Message}")
);
```

## Design Principles

- Errors are values, not exceptions used for control flow.
- Pipelines are composable through `Bind`, `Map`, `Ensure`, `Recover`, and `Tap`.
- APIs are async-friendly with `Task` and `ValueTask` overloads.
- Domain intent is explicit in type signatures.

## Next Steps

Follow this path from fundamentals to advanced integration:

1. Read [Result](/docs/functional/result/) for railway-oriented pipelines.
2. Read [Maybe](/docs/functional/maybe/) for optional-value flows.
3. Read [Failures and Metadata](/docs/functional/failures-and-metadata) for error modeling and contextual data.
4. Read [ASP.NET Core](/docs/functional/aspnetcore/) for HTTP mapping and web API integration.
5. Read [xUnit](/docs/functional/xunit/) for assertion patterns in tests.
