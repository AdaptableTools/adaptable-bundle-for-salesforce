# AdaptableInfinite with Vite

## Running for development

```sh
npm run dev
```

## Setting your license key

In the root folder, create a `.env.local` environment variable

```sh
VITE_ADAPTABLE_INFINITE_LICENSE_KEY=...
```

and add your license key.

After this step, we're ready to bundle the app

## Bundling for salesforce

Bundle the app

```sh
npm run build
```

then go to `/dist/assets`:
 - rename `index-<HASH>.js` to `index.js`
 - rename `index-<HASH>.css` to `index.css`

Then archive the two files into a single zip and upload to salesforce static resource.

Let's name this resource `adaptableinfinite` in salesforce.

## In your LWC project

```js
import { LightningElement, api } from "lwc";

import { loadScript, loadStyle } from "lightning/platformResourceLoader";
import AdaptableBundle from "@salesforce/resourceUrl/adaptableinfinite";

export default class Infinite extends LightningElement {
  @api name;

  connectedCallback() {
    Promise.all([
      loadScript(this, AdaptableBundle + "/index.js"),
      loadStyle(this, AdaptableBundle + "/index.css"),
    ]).then(() => {
      // @ts-ignore
      const el = this.refs.root;
      
      // NOTE the main.tsx file exposes 2 functions:

      // mountElement - the first fn
      window.mountElement(el);

      // renderApp - the second fn
      window.renderApp({
        adaptableId: "my app",
        defaultState: {
          dashboard: {
            top: {
              widgets: [
                {
                  id: "theme",
                  type: "theme"
                },
                {
                  id: "view",
                  type: "view"
                },

                {
                  id: "tabs-1",
                  type: "tabs",
                  value: {
                    tabs: [
                      {
                        name: "Tab 1",
                        widgets: [{ type: "view", id: "view" }]
                      }
                    ]
                  }
                }
              ]
            }
          },
          view: {
            currentViewId: "myView",
            views: [
              {
                id: "myView",
                label: "My First View"
              },
              {
                id: "myView2"
              }
            ]
          }
        }
      });
    });
  }
}
```
