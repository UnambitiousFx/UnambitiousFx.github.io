---
sidebar_position: 1
---

# Getting Started

UnambitiousFx is a collection of lightweight, modular .NET libraries designed to simplify web API development — with Native AOT support and zero unnecessary overhead.

## Install

Pick only what you need:

```bash
# Core functional primitives
dotnet add package UnambitiousFx.Functional

# ASP.NET Core integration (optional)
dotnet add package UnambitiousFx.Functional.AspNetCore

# xUnit assertion helpers (optional)
dotnet add package UnambitiousFx.Functional.xunit
```

## Quick Example

Model an operation that can fail without using exceptions:

```csharp
using UnambitiousFx.Functional;
using UnambitiousFx.Functional.Failures;

static Result<int> ParsePositiveInt(string input)
{
    if (!int.TryParse(input, out var value))
        return Result.FailValidation<int>("Input is not a valid integer");

    if (value <= 0)
        return Result.FailValidation<int>("Value must be positive");

    return Result.Success(value);
}

var result = ParsePositiveInt("42")
    .Map(value => value * 2)
    .Ensure(value => value < 100, _ => new ValidationFailure("Value must be less than 100"));

result.Match(
    success: value => Console.WriteLine($"Result: {value}"),
    failure: error  => Console.WriteLine($"Error: {error.Code} — {error.Message}")
);
```

Errors are values. Pipelines stay linear. No exceptions for control flow.

## Core Concepts

| Concept                   | What it does                                  |
| ------------------------- | --------------------------------------------- |
| `Result` / `Result<T>`    | Explicit success/failure without exceptions   |
| `Maybe<T>`                | Optional values without scattered null checks |
| `Bind` / `Map` / `Ensure` | Composable pipeline operations                |
| `Recover` / `Tap`         | Side-effects and fallback paths               |

## Libraries

### Functional

Functional programming primitives for explicit, composable .NET workflows.

→ [Functional docs](/lib-functional/) — versions, full API reference, ASP.NET Core and xUnit integration.

### Synapse *(work in progress)*

A lightweight in-process mediator and message-driven primitive set.

→ [Synapse on GitHub](https://github.com/unambitiousfx/unambitious/tree/main/Synapse) — source, examples, and tests.

## What to Read Next

1. [Result](/lib-functional/result/) — railway-oriented pipelines.
2. [Maybe](/lib-functional/maybe/) — optional-value flows.
3. [Failures and Metadata](/lib-functional/failures-and-metadata) — structured error modeling.
4. [ASP.NET Core integration](/lib-functional/aspnetcore/) — HTTP mapping for endpoints.

