---
sidebar_position: 1
---

# Result API Reference

This page contains the detailed API surface for `Result` and `Result<TValue>`.

## Core Types

### `Result`

A non-generic result representing success or failure without a value.

```csharp
public readonly partial record struct Result : IResult
```

### `Result<TValue>`

A generic result representing success with a value or failure with a failure object.

```csharp
public readonly partial record struct Result<TValue> : IResult
    where TValue : notnull
```

## Core Properties and Methods

| Member                                          | Description                                                             |
|-------------------------------------------------|-------------------------------------------------------------------------|
| `IsSuccess`                                     | Indicates whether the operation succeeded                               |
| `IsFailure`                                     | Indicates whether the operation failed                                  |
| `Metadata`                                      | Associated metadata                                                     |
| `TryGetFailure(out Failure? failure)`           | Attempts to extract the failure if failed                               |
| `TryGet(out TValue? value, out Failure? failure)` | Attempts to extract the success value and failure (`Result<TValue>` only) |
| `TryGetValue(out TValue? value)`                | Attempts to extract the success value (`Result<TValue>` only)           |
| `Match(success, failure)`                       | Pattern matches the result                                              |
| `Switch(success, failure)`                      | Executes actions based on state                                         |
| `IfSuccess(action)`                             | Executes the action if successful                                       |
| `IfFailure(action)`                             | Executes the action if failed                                           |
| `Deconstruct(...)`                              | Deconstructs the result into its components                             |
| `WithMetadata(...)`                             | Creates a new result with added/merged metadata                         |
| `ToResult()`                                    | Converts `Result<TValue>` to untyped `Result`                           |

## Extension Methods by Category

### Transformations

- `Bind`
- `Map`
- `Then`
- `Flatten`

### Failure Handling

- `Recover`
- `Compensate`
- `Try`
- `Ensure`

### Side Effects and Extraction

- `Tap`
- `TapIf`
- `TapFailure`
- `ValueOr`
- `ValueOrDefault`
- `ValueOrThrow`

### Utilities and LINQ

- `Combine`
- `Select`
- `SelectMany`
- `Where`

### Specialized Failure Factories

- `FailNotFound`
- `FailValidation`
- `FailUnauthenticated`
- `FailUnauthorized`
- `FailConflict`

## Async Support

All major operations support `Task<Result<T>>` and `ValueTask<Result<T>>` variants, including:

- `Map`, `Bind`, `Tap`
- `Match`, `Switch`
- `ValueOr`
- `Ensure`, `Recover`, `Compensate`
- Failure-side effects (`TapFailure`)

## Creation Patterns

```csharp
// Success
var ok = Result.Success();
var okValue = Result.Success(42);

// Failures
var fail = Result.Failure(new ValidationFailure("Invalid input"));
var failMessage = Result.Failure("Something went wrong");

// Implicit conversions
Result a = new ValidationFailure("Invalid");
Result<int> b = 42;
```

## Pattern Matching

```csharp
var text = result.Match(
    success: value => value.ToString(),
    failure: failure => $"Failure: {failure.Message}"
);
```

## See Also

- [Result](/docs/functional/result/)
- [Failures and Metadata](/docs/functional/failures-and-metadata)
