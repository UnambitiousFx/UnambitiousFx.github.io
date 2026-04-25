---
sidebar_position: 2
---

# Package Feeds

This page explains where to get UnambitiousFx packages and how to enable pre-release packages with a custom feed.

## Release Channels

- Stable versions are available on [NuGet.org](https://www.nuget.org/).
- Pre-release versions are available on [MyGet](https://www.myget.org/F/unambitiousfx/api/v3/index.json).

## Add the Pre-release Feed

Add the UnambitiousFx MyGet feed to your NuGet sources:

```bash
dotnet nuget add source https://www.myget.org/F/unambitiousfx/api/v3/index.json \
  --name UnambitiousFx-MyGet
```

Check that the source is registered:

```bash
dotnet nuget list source
```

## Install a Pre-release Package

Use a pre-release version suffix when installing a package:

```bash
dotnet add package UnambitiousFx.Functional --version 2.1.0-preview.1
```

You can replace the package name and version with any UnambitiousFx library package and available pre-release version.

## Optional: nuget.config Setup

If you prefer repository-level configuration, add the feed to your nuget.config file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
    <add key="UnambitiousFx-MyGet" value="https://www.myget.org/F/unambitiousfx/api/v3/index.json" />
  </packageSources>
</configuration>
```

With this configuration in place, restore and install commands can resolve both stable and pre-release package sources.
