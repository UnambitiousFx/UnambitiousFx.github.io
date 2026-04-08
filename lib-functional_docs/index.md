---
sidebar_position: 2
---

# Functional

Functional is a lightweight, performance-focused toolkit for explicit and composable application flows in .NET.

It provides:

- `Result` and `Result<T>` for explicit success/failure outcomes.
- `Maybe<T>` for optional values without scattered null checks.
- ASP.NET Core integration for HTTP mapping.
- xUnit helpers for expressive assertions.

## Choose a Version

Use the version that matches your project:

:::tip v1.0 - Current Stable
Recommended for production workloads.

[Open v1.0 docs](/lib-functional/v1.0/)
:::

:::caution v2.0 - Pre-release
Use this version to evaluate upcoming changes and new APIs.

[Open v2.0 docs](/lib-functional/v2.0/)
:::

## Install

Core package:

```bash
dotnet add package UnambitiousFx.Functional
```

Optional packages:

```bash
dotnet add package UnambitiousFx.Functional.AspNetCore
dotnet add package UnambitiousFx.Functional.xunit
```

## Suggested Path

1. Start with the version page matching your project.
2. Explore `Result` and `Maybe` in that version.
3. Add ASP.NET Core and xUnit packages as needed.
