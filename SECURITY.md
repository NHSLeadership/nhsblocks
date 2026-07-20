# Security

We take security and the protection of private data extremely seriously. If you believe you have found a vulnerability or other issue which has compromised or could compromise the security of any of our systems or private data managed by our systems, please do not hesitate to contact us using the method outlined below.

## Table of Contents

- [Security](#security)
  - [Table of Contents](#table-of-contents)
  - [Reporting a vulnerability](#reporting-a-vulnerability)
  - [General Security Enquiries](#general-security-enquiries)
  - [Dependency overrides (npm)](#dependency-overrides-npm)
    - [Current overrides](#current-overrides)
    - [Review policy](#review-policy)

## Reporting a vulnerability

If you believe you have found a security issue in this repository, please report it using GitHub's private vulnerability reporting:

1. [Report a vulnerability](https://github.com/NHSLeadership/nhsblocks/security/advisories/new)
2. Provide details of the issue and steps to reproduce

This creates a private channel for discussion and allows us to coordinate a fix before any public disclosure.

## General Security Enquiries

If you have general enquiries regarding our cybersecurity, please reach out to us at [cybersecurity@nhs.net](cybersecurity@nhs.net)

## Dependency overrides (npm)

This project uses npm `overrides` to temporarily address security
vulnerabilities reported in development-only dependencies introduced
by `@wordpress/scripts`.

These dependencies are used only during local development
(build, linting, and testing). They are **not bundled or shipped**
with the WordPress plugin.

### Current overrides

- minimatch → ^10.2.3  
  Reason: Addresses a ReDoS vulnerability in glob matching used by
  ESLint and webpack-related tooling.

- webpack-dev-server → ^5.2.1  
  Reason: Patches known dev-server vulnerabilities (e.g. CVE-2025-30359 /
  CVE-2025-30360). Development-only.

- serialize-javascript → ^7.0.5  
  Reason: Addresses high-severity vulnerabilities reported in
  transitive usage via `copy-webpack-plugin`. Development-only.

- linkify-it → ^5.0.2  
  Reason: Addresses a high-severity vulnerability (GHSA-22p9-wv53-3rq4)
  affecting markdown link parsing in transitive development dependencies
  used by `markdownlint` and `@wordpress/scripts`. Development-only.

- adm-zip → ^0.6.0
  Reason: Addresses a high-severity vulnerability involving crafted ZIP
  files causing excessive memory allocation (GHSA-xcpc-8h2w-3j85) in
  transitive development dependencies used by `@wordpress/scripts`.
  Development-only.

- markdown-it → ^14.3.0  
  Reason: Addresses a vulnerability affecting markdown parsing
  (GHSA-6v5v-wf23-fmfq) in transitive development dependencies used by
  `markdownlint` and `@wordpress/scripts`. Development-only.

- uuid → ^11.1.1  
  Reason: Addresses a vulnerability in UUID generation and buffer
  handling (GHSA-w5hq-g745-h8pq) present in transitive development
  dependencies used by `webpack-dev-server`. Development-only.

### Review policy

Overrides are reviewed during routine dependency updates and removed
once upstream tooling (e.g. `@wordpress/scripts`) adopts patched
versions natively.

Where possible, overrides are applied only to development-time tooling
dependencies and are validated by running the project's build, linting,
and test processes after installation.

Any remaining npm audit findings are assessed on a case-by-case basis.
Where vulnerabilities exist only within development dependencies and
are not included in the distributed plugin package, the project may
accept the residual risk while awaiting upstream remediation.

