---
sidebar_position: 1
---

# Maybe API Reference

This page contains the detailed API surface for `Maybe<T>`.

## Core Types

### `Maybe<T>`

`Maybe<T>` models an optional value as either Some or None.

## Core Properties and Methods

| Member       | Description                                       |
|--------------|---------------------------------------------------|
| `IsSome`     | `true` if the value is present                    |
| `IsNone`     | `true` if the value is absent                     |
| `Case`       | Value if present, otherwise `default`             |
| `Some(out)`  | Pattern matching with out parameter               |
| `Match(...)` | Executes one of two branches based on state       |
| `IfSome(...)` | Executes action if value is present              |
| `IfNone(...)` | Executes action if value is absent               |

## Extension Methods by Category

### Transformations

- `Map`
- `Bind`
- `Filter`
- `Where`

### Side Effects and Extraction

- `Tap`
- `TapSome`
- `TapNone`
- `ValueOr`
- `OrElse`

### Utilities and LINQ

- `ToResult`
- `Select`
- `SelectMany`
- `Where`

## Async Support

All major operations support `Task<Maybe<T>>` and `ValueTask<Maybe<T>>` variants, including:

- `Map`, `Bind`, `Filter`
- `TapSome`, `TapNone`
- `ValueOr`, `OrElse`
- `Match`, `Switch`
- `ToResult`

## Creation Patterns

```csharp
// Static factories
Maybe<int> some = Maybe.Some(42);
Maybe<int> none = Maybe.None<int>();

// Implicit conversions
Maybe<string> fromNull = null;
Maybe<string> fromValue = "hello";
```

## Pattern Matching

```csharp
var message = maybe.Match(
    some: value => $"Found: {value}",
    none: () => "Not found"
);

var output = maybe
    .Map(x => x.ToString())
    .ValueOr("n/a");
```

## See Also

- [Maybe](../maybe.md)
- [Result](../result.md)
