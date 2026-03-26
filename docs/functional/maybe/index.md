---
sidebar_position: 3
---

# `Maybe<T>`

`Maybe<T>` is a functional type that represents an optional value: either **Some** value of type `T`, or **None** (the
absence of a value). It provides a type-safe alternative to null references and enables composable operations on
potentially missing values.

## Table of Contents

- [Introduction](#introduction)
- [Core Concepts](#core-concepts)
- [Simple Example](#simple-example)
- [API Reference](#api-reference)
- [Advanced Topics](#advanced-topics)
- [Best Practices](#best-practices)
- [See Also](#see-also)

## Introduction

Use `Maybe<T>` when a value may legitimately be absent and that absence should be handled explicitly.

## Core Concepts

### When to Use

- **Null Safety**: Replace nullable types with explicit optionality
- **API Design**: Signal that a value may or may not be present (e.g., configuration values, cache lookups)
- **Database Queries**: Represent optional results (e.g., `FindById` returning `Maybe<User>`)
- **Validation**: Chain operations that may fail to produce a value
- **Parsing**: Handle optional or invalid input gracefully

### Key Characteristics

- **Zero-Allocation**: Implemented as `readonly record struct` for minimal overhead
- **Type Safety**: Forces explicit handling of the None case at compile time
- **Composable**: Supports functional composition with `Map`, `Bind`, `Filter`, etc.
- **LINQ Integration**: Supports query syntax via `Select`, `SelectMany`, and `Where`

## Simple Example

```csharp
Maybe<User> GetUser(Guid id) => _cache.TryGetValue(id, out var user)
    ? Maybe.Some(user)
    : Maybe.None<User>();

var displayName = GetUser(userId)
    .Map(user => user.Name)
    .ValueOr("Guest");
```

## API Reference

The full API surface has been moved to a dedicated reference page so this guide can stay focused on concepts and
practical usage.

- [Maybe API Reference](/docs/functional/maybe/api-reference)

## Advanced Topics

### Async Pipelines

`Maybe<T>` supports async pipelines with `ValueTask<Maybe<T>>` and `Task<Maybe<T>>` overloads.

```csharp
ValueTask<Maybe<User>> userTask = GetUserAsync(id);

Maybe<string> name = await userTask.Map(u => u.Name);
Maybe<Profile> profile = await userTask.Bind(u => GetProfileAsync(u.ProfileId));
```

## Best Practices

### Do

- ✅ Use `Maybe<T>` for optional values that genuinely may or may not exist
- ✅ Chain operations with `Bind` and `Map` for clean, composable code
- ✅ Use LINQ query syntax for complex chains with multiple binds
- ✅ Prefer `ValueOr` for simple defaults and `OrElse` for complex fallback logic
- ✅ Convert to `Result<T>` when you need to provide error context

### Don't

- ❌ Use `Maybe<T>` for error conditions—use `Result<T>` instead
- ❌ Mix `Maybe<T>` with nullable types unnecessarily
- ❌ Use `Case` property directly—prefer `Match`, `ValueOr`, or pattern matching
- ❌ Nest `Maybe<Maybe<T>>`—use `Bind` to flatten

### Real-World Examples

#### Configuration Value

```csharp
public Maybe<int> GetMaxRetries() =>
    _configuration["MaxRetries"]
        .Map(int.TryParse)
        .Filter(x => x > 0);

int maxRetries = GetMaxRetries().ValueOr(3);
```

#### Database Query

```csharp
public async ValueTask<Maybe<User>> FindUserByEmail(string email)
{
    var user = await _dbContext.Users
        .Where(u => u.Email == email)
        .FirstOrDefaultAsync();

    return user; // Implicit conversion from User? to Maybe<User>
}

var result = await FindUserByEmail("user@example.com")
    .Map(u => new UserDto(u.Id, u.Name))
    .ToResult("User not found");
```

#### Chaining Operations

```csharp
var orderTotal = await GetUser(userId)
    .Bind(user => GetCart(user.CartId))
    .Filter(cart => cart.Items.Any())
    .Map(cart => cart.Items.Sum(i => i.Price))
    .TapSome(total => _logger.LogInformation("Order total: {Total}", total))
    .ValueOr(0m);
```

#### LINQ Query with Multiple Sources

```csharp
var profileData =
    from user in GetUser(id)
    from settings in GetSettings(user.SettingsId)
    from avatar in GetAvatar(user.AvatarId)
    where settings.IsPublic
    select new PublicProfile(user.Name, avatar.Url, settings);
```

## See Also

- [Result](/docs/functional/result/) - For operations that can fail with errors
- [Failures and Metadata](/docs/functional/failures-and-metadata) - For typed failure modeling and contextual metadata
