# setmy-info-less-enterprise

Meta-package that compiles the complete SMI LESS stack into a single CSS file. Installing
this package brings in all Layer 0 and Layer 1 packages as dependencies and produces one
`main.min.css` that contains everything: base resets, frame layouts, UI states, form helpers,
table styles, and dashboard widget layout.

**For what:** Distributing a single pre-compiled CSS bundle to enterprise intranet and
internal web applications. Instead of managing individual package CSS load order in HTML,
teams include one file and get the full SMI LESS feature set. The compiled output is suitable
for internal tools, employee portals, admin dashboards, back-office systems, and any
browser-based application intended for use inside an organisation rather than the public web.

**For who:**
- **Enterprise application teams** building internal tools where the full feature set
  is wanted without per-feature CSS management overhead.
- **Intranet and ops teams** deploying standardised look-and-feel across multiple internal
  web applications from a single versioned CSS artifact.
- **CI/CD pipelines** that need one file to copy to a CDN or static server.

## Install

```shell
npm i setmy-info-less-enterprise
```

## Dependencies

Pulls in the full stack automatically:

| Package | Role |
|---|---|
| `setmy-info-less` | Base tokens, resets, utility classes |
| `setmy-info-less-extended` | IDE frame layout |
| `setmy-info-less-ui` | Interaction states, typography, positioning |
| `setmy-info-less-forms` | Form resets and helpers |
| `setmy-info-less-data` | Table and data display |

## Usage

One link tag replaces all individual package links:

```html
<link rel="stylesheet" href="node_modules/setmy-info-less-enterprise/dist/main.min.css">
```

## Development

```shell
npm run build
npm run lint:less
```

Note: `verify`, `e2e`, and `cucumber` scripts are intentionally absent — this is a
compilation-only package with no unique CSS classes of its own to test.
