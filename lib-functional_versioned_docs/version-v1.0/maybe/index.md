---
sidebar_position: 3
---

# Maybe

`Maybe<T>` represents an optional value:

- `Some(T)` when a value exists,
- `None` when it does not.

It is a clear alternative to nullable values and repetitive `null` checks.

## When to Use Maybe

Use `Maybe<T>` when missing data is normal and not an error.

Common cases:

- cache lookups,
- optional configuration,
- search operations that may not find data.

## Minimal Example

```csharp
using UnambitiousFx.Functional;

Maybe<User> FindUser(Guid id)
{
    var user = _repository.FindById(id);
    return user is not null ? Maybe.Some(user) : Maybe.None<User>();
}

var displayName = FindUser(userId)
    .Map(user => user.DisplayName)
    .ValueOr("Guest");
```

## Most Used Operations

- `Map`: transform value when `Some`.
- `Bind`: chain functions returning `Maybe<T>`.
- `Filter`: keep value only when predicate matches.
- `Match`: handle `Some` and `None` branches.
- `ValueOr`: provide default value.
- `ToResult`: convert optional value into `Result<T>` when you need an error.

## Converting to Result

```csharp
using UnambitiousFx.Functional.Errors;

Result<User> GetUserOrFail(Guid id)
{
    return FindUser(id)
        .ToResult(new NotFoundError($"User {id} was not found"));
}
```

## Good Practices

- Use `Maybe<T>` for optional data, not for errors.
- Use `Result<T>` when you need failure reasons.
- Keep `Maybe<T>` pipelines short and readable.