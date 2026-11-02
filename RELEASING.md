# Releasing NHS Blocks

Many websites rely on this plugin, including a large number of NHS sites. Follow every step below for each release.

## 1. Set the new version

```bash
npm run set-version 2.1.0
```

This writes the version into every file: `package.json`, `package-lock.json`, `nhsblocks.php`, `readme.txt`, `style.scss` and `style.css`.

Do not edit version numbers by hand.

This command does not commit or create a git tag. You commit, and the tag is made on GitHub at release time.

Do not use `npm version`. It only changes `package.json` and `package-lock.json`.

## 2. Add a changelog entry

In `readme.txt`, under `== Changelog ==`, add `= 2.1.0 =` with a short list of changes.

## 3. Check the Nightingale minimum version

In `nhsblocks.php`, find `$required` in `nhsblocks_nightingale_version_notice()`.

- If this plugin release **needs** a newer Nightingale theme, change it to that version.
- Otherwise, leave it as it is.

## 4. Build and check

```bash
npm run build
npm run build-scss && npm run compress-scss
npm run check-version
```

`check-version` must say **Version check passed**.

## 5. Test

- Test with the Nightingale theme **and** with another theme.

## 6. Release

- Open a pull request. The **Version check** on GitHub must pass.
- After merging, create a GitHub release with the tag `v2.1.0` (with a "v", like earlier releases).
- Publishing the release deploys to WordPress.org. The deploy stops if the tag does not match the version in the files.
