# setmy-info-less

## Notes

**main.less** is starting point, that includes the rest of the files in correct order.

### Priciles

UI is divided in groups:

* **Default** is PC or wide UI, no elements shrinking, collapsing and hiding needed. For full visibility.
* **Phone**: is usual pocket and handheld smat phone devices.
* **Pad** usually a little wider UI, that can handle more elements but not all. Something can be hidden/shrunken.
* **Watch** usually hand watch UI-s.
* **Print** system for printing.

## Created

```
npm init --yes
npm i less --save-dev
npm i less-plugin-clean-css --save-dev
npm i express --save-dev
npm i jest --save-dev
npm i playwright --save-dev
npm i @playwright/test@latest --save-dev
npm i pug --save-dev
npm i @cucumber/cucumber --save-dev
npm i rimraf --save-dev
npx playwright install
```

## Development

```
npm install
# Or use 'ci' cub-command, to install by lock file. 
npm ci
npx playwright install
npm run build
npm run verify
#npm run e2e
#npm run cucumber
npm run clean
npm pack
npm login
npm publish
```
