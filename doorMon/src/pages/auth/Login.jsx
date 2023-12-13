import { ConfigProvider, notification } from "antd";
import { LoginForm, ProFormCheckbox, ProFormText } from "@ant-design/pro-form";
import gbhlIcon from "../../images/logo/gbhl-icon.png";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


export default function Login() {
  
    const navigation = useNavigate();
  
    return (
      <ConfigProvider
        locale={{
          locale: "en",
        }}
      >
        <div
          style={{
            height: "100vh",
            width: "100vw",
            position: "absolute",
            paddingTop: "100px",
          }}
        >
          <LoginForm
            logo={gbhlIcon}
            title="GBHL Door Monitor"
            subTitle="Please login to get started"
            initialValues={{
              autoLogin: true,
            }}
            onFinish={(values) => {
                console.log(values);
                notification.success({
                    message: "Login Successful",
                    description: "You have successfully logged in.",
                });
                navigation("/app/dashboard", { replace: true });
            }}
          >
            <ProFormText
              name="email"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              
              placeholder={"Email Address"}
              rules={[
                {
                  required: true,
                  message: "Please enter your username!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"Password"}
              rules={[
                {
                  required: true,
                  message: "Please enter your password！",
                },
              ]}
            />
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="rememberme">
                Remember me
              </ProFormCheckbox>
              <Link
                style={{
                  float: "right",
                }}
                to="/auth/forgot-password"
              >
                Forgot password
              </Link>
            </div>
          </LoginForm>
        </div>
      </ConfigProvider>
    );
  }
  