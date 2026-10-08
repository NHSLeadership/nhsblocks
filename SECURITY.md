# Security

We take security and the protection of private data extremely seriously. If you believe you have found a vulnerability or other issue which has compromised or could compromise the security of any of our systems or private data managed by our systems, please do not hesitate to contact us using the method outlined below.

## Table of Contents

- [Security](#security)
  - [Table of Contents](#table-of-contents)
  - [Reporting a vulnerability](#reporting-a-vulnerability)
  - [General Security Enquiries](#general-security-enquiries)
  - [Dependency overrides (npm)](#dependency-overrides-npm)
    - [Current overrides](#current-overrides)
    - [Known accepted risks](#known-accepted-risks)
    - [Review policy](#review-policy)

## Reporting a vulnerability

If you believe you have found a security issue in this repository, please report it using GitHub's private vulnerability reporting:

1. [Report a vulnerability](https://github.com/NHSLeadership/nhsblocks/security/advisories/new)
2. Provide details of the issue and steps to reproduce

This creates a private channel for discussion and allows us to coordinate a fix before any public disclosure.

## General Security Enquiries

If you have general enquiries regarding our cybersecurity, please reach out to us at [cybersecurity@nhs.net](mailto:cybersecurity@nhs.net)

## Dependency overrides (npm)

This project uses npm `overrides` to temporarily address security
vulnerabilities reported in build-time dependencies, mainly those
introduced by `@wordpress/scripts`.

These dependencies are used only during local development and build
(building, linting, testing and compiling CSS). They are **not bundled
or shipped** with the WordPress plugin. Running
`npm audit --omit=dev` reports no vulnerabilities.

### Current overrides

- serialize-javascript → ^7.0.5  
  Reason: Addresses high-severity vulnerabilities reported in
  transitive usage via `copy-webpack-plugin`. Development-only.

- uuid → ^11.1.1  
  Reason: Addresses a vulnerability in UUID generation and buffer
  handling (GHSA-w5hq-g745-h8pq) present in transitive development
  dependencies used by `webpack-dev-server`. Development-only.

- shell-quote → ^1.12.0  
  Reason: Addresses a vulnerability (TODO: advisory ID) in transitive
  development dependencies. Development-only.

- katex → 0.19.0  
  Reason: Addresses a vulnerability (TODO: advisory ID) in transitive
  development dependencies. Development-only.

- smol-toml → 1.9.0  
  Reason: Addresses a vulnerability (TODO: advisory ID) in transitive
  development dependencies. Development-only.

- js-yaml → 5.4.3  
  Reason: Addresses a vulnerability (TODO: advisory ID) in transitive
  development dependencies. Development-only.

- postcss-selector-parser → 7.1.6  
  Reason: Addresses a vulnerability (TODO: advisory ID) in a transitive
  dependency of `cssnano`. `cssnano` is declared under `dependencies`
  but is used at build time only, to generate `style.min.css`. It is
  not executed at runtime and is not shipped with the plugin.

### Known accepted risks

- braces (<= 3.0.3) — GHSA-vfj7-8cjw-p6xm / CVE-2026-93687  
  Issue: Stack exhaustion (denial of service) when parsing deeply nested
  brace patterns.  
  Status: No patched version of `braces` has been released, so it cannot
  be resolved with an override or `npm audit fix`. The
  `npm audit fix --force` suggestion downgrades `@wordpress/scripts` to
  an unsupported version and is not used.  
  Exposure: `braces` is present only via `@wordpress/scripts`
  (`fast-glob` → `micromatch` and `webpack-dev-server` → `chokidar`).
  It is a build-time dependency, is not shipped with the plugin, and is
  only exercised by local build tooling. `npm audit --omit=dev`
  reports 0 vulnerabilities.  
  Action: Residual risk accepted. Once a patched `braces` is released,
  add an override and remove this entry.  
  Tracking: [micromatch/braces#70](https://github.com/micromatch/braces/issues/70)

### Review policy

Overrides are reviewed during routine dependency updates and removed
once upstream tooling (e.g. `@wordpress/scripts`) adopts patched
versions natively.

Where possible, overrides are applied only to build-time tooling
dependencies and are validated by running the project's build, linting,
and test processes after installation.

Any remaining npm audit findings are assessed on a case-by-case basis.
Where vulnerabilities exist only within build-time dependencies and
are not included in the distributed plugin package, the project may
accept the residual risk while awaiting upstream remediation.