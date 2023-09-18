import * as React from "react";
import * as ReactDOM from "react-dom/client";
import router from "./router.jsx";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US"; 
import {
  RouterProvider,
} from "react-router-dom";



ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider 
  locale={enUS}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
);