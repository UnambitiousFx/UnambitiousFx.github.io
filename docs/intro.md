---
sidebar_position: 1
---

# UnambitiousFx Documentation

UnambitiousFx is a set of small, focused .NET libraries for building explicit, composable application flows with minimal runtime overhead.

This page is the documentation nexus: start here, then jump directly to the library or topic you need.

## Choose a Library

### Functional

Functional primitives for predictable control flow:

- `Result` and `Result<T>` for explicit success/failure
- `Maybe<T>` for optional values without null noise
- composable operations like `Map`, `Bind`, `Ensure`, `Recover`, and `Tap`

Start here:

- [Functional docs](/lib-functional/)
- [Result guide](/lib-functional/result/)
- [Maybe guide](/lib-functional/maybe/)
- [Failures and Metadata](/lib-functional/failures-and-metadata)
- [ASP.NET Core integration](/lib-functional/aspnetcore/)

### Synapse _(work in progress)_

Lightweight in-process messaging primitives (commands, queries, events, pipelines, streaming).

Start here:

- [Synapse docs](/lib-synapse/)
- [Synapse source on GitHub](https://github.com/unambitiousfx/unambitious/tree/main/Synapse)

## Quick Install

Install only the packages you need:

```bash
# Core functional primitives
dotnet add package UnambitiousFx.Functional

# ASP.NET Core integration
dotnet add package UnambitiousFx.Functional.AspNetCore

# xUnit assertions
dotnet add package UnambitiousFx.Functional.xunit
```

For all UnambitiousFx libraries:

- Stable versions are available on [NuGet.org](https://www.nuget.org/).
- Pre-release versions are available on [MyGet](https://www.myget.org/F/unambitiousfx/api/v3/index.json).

## Navigate by Goal

| Goal                                      | Go to                                                          |
| ----------------------------------------- | -------------------------------------------------------------- |
| Model success/failure without exceptions  | [Result](/lib-functional/result/)                              |
| Represent optional values cleanly         | [Maybe](/lib-functional/maybe/)                                |
| Standardize error contracts and metadata  | [Failures and Metadata](/lib-functional/failures-and-metadata) |
| Return HTTP responses from domain results | [ASP.NET Core integration](/lib-functional/aspnetcore/)        |
| Add fluent assertions in tests            | [xUnit integration](/lib-functional/xunit/)                    |
| Explore mediator-style app flows          | [Synapse docs](/lib-synapse/)                                  |

## Recommended Reading Order

1. [Functional overview](/lib-functional/)
2. [Result](/lib-functional/result/)
3. [Maybe](/lib-functional/maybe/)
4. [Failures and Metadata](/lib-functional/failures-and-metadata)
5. [ASP.NET Core integration](/lib-functional/aspnetcore/)
6. [Synapse docs](/lib-synapse/)
