import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MainLayout from "./Layouts/MainLayout";
import Doors from "./pages/Doors";
import Login from "./pages/auth/Login";
import { Layout } from "antd";



const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/Doors", element: <Doors />}
      ],
    },
    {path: "/login", element: <Layout><Login /></Layout>},
  ]);
  

  export default router;