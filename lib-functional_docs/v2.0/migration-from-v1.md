---
sidebar_position: 1
---

# Migrate from V1 to V2

This guide helps you migrate existing `UnambitiousFx.Functional` code from v1 to v2.

The migration is mostly straightforward. Most pipeline APIs (`Bind`, `Map`, `Ensure`, `Tap`, `Match`) stay familiar.

## 1. Update Packages

Update package references to v2:

```bash
dotnet add package UnambitiousFx.Functional
dotnet add package UnambitiousFx.Functional.AspNetCore
dotnet add package UnambitiousFx.Functional.xunit
```

If you pin versions centrally, update them in your `Directory.Packages.props`.

## 2. Move from `Failures` to `Errors`

In v2, use the `Errors` namespace and error types.

Before:

```csharp
using UnambitiousFx.Functional.Failures;

return Result.Failure<User>(new ValidationFailure("Email is required"));
```

After:

```csharp
using UnambitiousFx.Functional.Errors;

return Result.Failure<User>(new ValidationError("Email is required"));
```

## 3. Rename Common Types

Most failure types have direct error equivalents:

- `Failure` -> `Error`
- `ValidationFailure` -> `ValidationError`
- `NotFoundFailure` -> `NotFoundError`
- `ConflictFailure` -> `ConflictError`
- `UnauthorizedFailure` -> `UnauthorizedError`
- `UnauthenticatedFailure` -> `UnauthenticatedError`
- `ExceptionalFailure` -> `ExceptionalError`
- `AggregateFailure` -> `AggregateError`
- `TimeoutFailure` -> `TimeoutError`

## 4. Check Result State Access

In v2, the result state property is `IsFaulted` (instead of `IsFailure`).

Before:

```csharp
if (result.IsFailure)
{
    // ...
}
```

After:

```csharp
if (result.IsFaulted)
{
    // ...
}
```

`IsSuccess` remains available.

## 5. Keep Existing Pipeline Style

Most composition code can stay as-is:

```csharp
return Validate(input)
    .Bind(DoWork)
    .Ensure(x => x.IsValid, new ValidationError("Invalid state"))
    .Tap(_ => logger.LogInformation("done"));
```

## 6. ASP.NET Core Mapping

If you use `Functional.AspNetCore`, verify mappings use error types (`ValidationError`, `NotFoundError`, etc.).

The default HTTP mapping behavior still follows standard semantics (400/404/409/500...).

## 7. xUnit Assertions

The assertion style still starts with `ShouldBe()`.

Update typed assertions to use error names from v2.

## Quick Migration Checklist

- Update NuGet package versions.
- Replace `using UnambitiousFx.Functional.Failures;` with `using UnambitiousFx.Functional.Errors;`.
- Rename `*Failure` types to `*Error` types.
- Replace `IsFailure` checks with `IsFaulted`.
- Run tests and confirm HTTP mapping expectations.

## See Also

- [Functional Overview](./)
- [Result](./result/)
- [Maybe](./maybe/)
- [Errors and Metadata](./failures-and-metadata)