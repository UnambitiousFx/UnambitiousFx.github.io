---
sidebar_position: 2
---

# HTTP Mapping Model and Defaults

This page explains how functional outcomes are translated to HTTP responses.

## Mapping Flow

1. Your endpoint returns `Result`, `Result<T>`, or `Maybe<T>`.
2. Adapter extensions (`ToHttpResult`, `ToActionResult`) inspect the outcome.
3. Success and failure branches are converted to HTTP status codes and bodies.

## Default Behavior

### Success Cases

- `Result.Success()` maps to success status based on configured policy.
- `Result<T>.Success(value)` maps to `200` with a serialized body.
- `Maybe<T>.Some(value)` maps to `200` with a serialized body.

### Failure Cases

Built-in mappings include:

- `ValidationFailure` -> `400`
- `NotFoundFailure` -> `404`
- `UnauthorizedFailure` -> `401`
- `UnauthenticatedFailure` -> `403`
- `ConflictFailure` -> `409`
- `ExceptionalFailure` -> `500`
- Unknown failure types -> `500`

## Why This Matters

Centralized mapping keeps HTTP concerns out of domain logic and ensures consistent behavior across endpoints.

## Next

- [Custom Mappers and Policy Composition](./custom-mappers.md)
- [Minimal API Patterns](./minimal-api-patterns.md)
- [MVC and Controller Patterns](./mvc-patterns.md)
