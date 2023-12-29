import ProLayout from "@ant-design/pro-layout";
import gbhlIcon from "../images/logo/icon.png";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FiBriefcase, FiUsers } from "react-icons/fi";
import { useEffect } from "react";



export default function MainLayout() {
    const navigate = useNavigate();
    const token = localStorage.getItem("gate-token");
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);
    return (
        <ProLayout
            logo={gbhlIcon}
            title="Bulkstream Door Monitor"
            layout="mix"
            menuDataRender={() => [
                {
                    path: "/",
                    name: "Home",
                    icon: <FiBriefcase />,
                },
                {
                    path: "/about",
                    name: "About",
                    icon: <FiUsers />,
                },
                {
                    path: "/Doors",
                    name: "Doors",
                    icon: <FiUsers />,
                },
                {
                    path: "/login",
                    name: "Logout",
                    icon: <FiUsers />,
                },
            ]}
            menuItemRender={(item, dom) => <Link to={item.path} onClick={()=>{
                navigate(item.path);
              }}>{dom}</Link>}
            >
            <Outlet />

        </ProLayout>

    )
}
