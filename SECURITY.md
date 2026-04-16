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

- serialize-javascript → ^8.0.1  
  Reason: Addresses high-severity vulnerabilities reported in
  transitive usage via `copy-webpack-plugin`. Development-only.

### Review policy

Overrides are reviewed during routine dependency updates and removed
once upstream tooling (e.g. `@wordpress/scripts`) adopts patched
versions natively.
