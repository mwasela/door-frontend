import ProLayout from "@ant-design/pro-layout";
import gbhlIcon from "../images/logo/gbhl-icon.png";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FiBriefcase, FiUsers } from "react-icons/fi";


export default function MainLayout() {
    const navigate = useNavigate();
    return (
        <ProLayout
            logo={gbhlIcon}
            title="GBHL Door Monitor"
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
            ]}
            menuItemRender={(item, dom) => <Link to={item.path} onClick={()=>{
                navigate(item.path);
              }}>{dom}</Link>}
            >
            <Outlet />

        </ProLayout>

    )
}
