---
sidebar_position: 5
---

# Failures and Metadata

Functional uses typed failure objects so failure handling is explicit and composable.

## Built-in Failure Types

All built-in failures live in `UnambitiousFx.Functional.Failures` and implement the failure contract.

Common types:

- `Failure` (general purpose)
- `ValidationFailure`
- `NotFoundFailure`
- `ConflictFailure`
- `UnauthorizedFailure`
- `UnauthenticatedFailure`
- `TimeoutFailure`
- `ExceptionalFailure` (wraps exceptions)
- `AggregateFailure` (multiple failures)

## Failure Codes

Standard codes are available in `FailureCodes`:

- `FailureCodes.Failure`
- `FailureCodes.Exception`
- `FailureCodes.AggregateFailure`
- `FailureCodes.Validation`
- `FailureCodes.NotFound`
- `FailureCodes.Conflict`
- `FailureCodes.Unauthorized`
- `FailureCodes.Unauthenticated`
- `FailureCodes.Timeout`

## Example

```csharp
using UnambitiousFx.Functional;
using UnambitiousFx.Functional.Failures;

Result<string> ValidateEmail(string email)
{
    if (string.IsNullOrWhiteSpace(email))
        return Result.Failure<string>(new ValidationFailure("Email is required"));

    if (!email.Contains('@'))
        return Result.Failure<string>(new ValidationFailure("Email format is invalid"));

    return Result.Success(email);
}
```

## Metadata

Both `Result` and `Result<T>` support metadata to carry contextual information.

```csharp
var result = Result.Success("ok")
    .WithMetadata("requestId", "req-001")
    .WithMetadata("traceId", "trace-xyz")
    .WithMetadata(builder => builder
        .Add("feature", "checkout")
        .Add("region", "eu-west"));
```

Use metadata to attach:

- trace and correlation IDs
- timing and diagnostics
- domain context needed by logs and middleware

Metadata is immutable in practice: each `WithMetadata(...)` call returns a new result instance.