---
sidebar_position: 1
---

# UnambitiousFx

UnambitiousFx is a small collection of lightweight, performance-focused .NET libraries.

The goal is straightforward: help you build reliable, efficient applications with APIs that stay simple and predictable.

## Design Priorities

- Simplicity over framework-heavy abstractions.
- Correctness through explicit modeling.
- Low allocations and practical runtime efficiency.

## Libraries

### Functional

Functional provides composable primitives for success/failure and optional flows:

- `Result` and `Result<T>` for explicit operation outcomes.
- `Maybe<T>` for optional values without scattering null checks.
- ASP.NET Core integration for HTTP mapping.
- xUnit helpers for expressive assertions.

Read the Functional docs: [Functional](/docs/functional/)

### Synapse (WIP)

Synapse is a lightweight in-process mediator and message-driven primitive set.

Documentation pages for Synapse are still in progress.

For now, see source, examples, and tests in the repository: [Synapse Folder](https://github.com/unambitiousfx/unambitious/tree/main/Synapse)

## Quick Start

Install Functional:

```bash
dotnet add package UnambitiousFx.Functional
```

For ASP.NET Core integration:

```bash
dotnet add package UnambitiousFx.Functional.AspNetCore
```

For xUnit assertions:

```bash
dotnet add package UnambitiousFx.Functional.xunit
```

## Where To Go Next

1. Start with [Functional Overview](/docs/functional/).
2. Explore [Result](/docs/functional/result/) and [Maybe](/docs/functional/maybe/).
3. Use [ASP.NET Core integration](/docs/functional/aspnetcore/) for endpoint mapping.
