import {
  AdaptableInfinite,
  AdaptableState,
  DashboardState,
} from "@adaptabletools/adaptable-infinite-react";
import { data, columns } from "./frameworks";

import packageJson from "@adaptabletools/adaptable-infinite-react/package.json";

const licenseKey = import.meta.env.VITE_ADAPTABLE_INFINITE_LICENSE_KEY;

export type AppProps = {
  adaptableId?: string;
  defaultState?: AdaptableState;
};
export default function SimpleDemo(props: AppProps) {
  console.log("rendering ", packageJson.name, packageJson.version);
  const dashboard: DashboardState = {
    top: {
      widgets: [
        {
          id: "theme",
          type: "theme",
        },
        {
          id: "view",
          type: "view",
        },

        {
          id: "tabs-1",
          type: "tabs",
          value: {
            tabs: [
              {
                name: "Tab 1",
                widgets: [{ type: "view", id: "view" }],
              },
            ],
          },
        },
      ],
    },
  };

  const adaptableId = "adaptable-1";
  return (
    <AdaptableInfinite
      data={data}
      adaptableId={props.adaptableId ?? adaptableId}
      licenseKey={licenseKey}
      defaultState={Object.assign(
        {},
        {
          primaryKey: "id",
          globalEntities: {
            availableColumns: columns,
          },
          dashboard,
          view: {
            currentViewId: "myView",
            views: [
              {
                id: "myView",
                label: "My View",
              },
              {
                id: "myView 2",
                label: "My View 2",
              },
            ],
          },
        },
        props.defaultState || {}
      )}
    />
  );
}
