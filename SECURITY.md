## Dependency overrides (npm)

This project uses npm `overrides` to temporarily address security
vulnerabilities reported in development-only dependencies introduced
by `@wordpress/scripts`.

These dependencies are used only during local build, linting, and testing.
They are not bundled or shipped with the WordPress plugin.

### Current overrides

- minimatch → 10.2.1  
  Reason: Fixes ReDoS vulnerability (GHSA-3ppc-4f35-3m26 / CVE-2026-26996)

- ws → 8.18.0  
  Reason: Transitive dependency vulnerability in dev tooling

- puppeteer-core → 22.0.0  
  Reason: Transitive dependency vulnerability in dev tooling

- @babel/runtime → 7.26.10  
  Reason: Security advisory in older transitive versions

### Review policy

Overrides are reviewed during routine dependency updates and removed
once upstream packages (e.g. `@wordpress/scripts`) adopt patched versions.
