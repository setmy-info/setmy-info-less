# setmy-info-less

## Notes

**main.less** is starting point, that includes the rest of the files in correct order.

### Priciles

UI is divided in groups:

* **Default** is PC or wide UI, no elements shrinking, collapsing and hiding needed. For full visibility.
* **Phone**: is usual pocket and handheld smartphone devices.
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
#Inside verify
#npm run e2e
npm run clean
npm pack
npm login
npm publish
```

## Load order

@import "values.less";
    ...
    @import "colors/index.less";
    @import "fonts/index.less";
    ...
@import "html/index.less";
    @import "html.less";
    @import "html-extended.less";
@import "utility/index.less";
    @import "visibility.less";
    @import "spacing.less";
    @import "spacing2.less";
    @import "sizing.less";
    @import "spacing3.less";
    @import "layout.less";
    @import "scroll.less";
    @import "text.less";
    @import "cursor.less";
    @import "layout2.less";
    @import "text2.less";
    @import "sizing3.less";
    @import "panels.less";
    @import "sizing2.less";
    @import "visual-style.less";
    @import "layout3.less";
    @import "notes.less";
    @import "visual-style2.less";
@import "devices/index.less";
    @import "print.less";
    @import "watch.less";
    @import "phone.less";
    @import "pad.less";
@import "components/application.less";


## Changed

In case web development doesnt work, need to check:

verticalStrechPanel -> verticalStretchPanel
horisontalStrechPanel -> horizontalStretchPanel

+ some more other possible changes
