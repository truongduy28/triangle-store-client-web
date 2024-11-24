import { useLoginCustomer } from "@/hooks/tanstacks/useCustomer";
import { addAuth } from "@/redux/reducers/authReducer";
import { getBgUrlFromPathname, getLastSegment } from "@/utils/pathname";
import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AuthLayout from "./_components/AuthLayout";

const { Title, Text } = Typography;

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const lastSegment = getLastSegment();
  const bannerUrl = getBgUrlFromPathname(lastSegment);

  const [isRemember, setIsRemember] = useState(false);

  // API: Login customer
  const { mutate, isPending } = useLoginCustomer(); // Replace with your actual login hook

  const handleSubmit = (value: { email: string; password: string }) => {
    mutate(value, {
      onSuccess: (data) => {
        message.success(data.message);
        dispatch(addAuth({ ...data.data, isRemember: true }));
        router.push("/");
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };

  return (
    <AuthLayout banner={bannerUrl}>
      <div className="px-10 w-3/4">
        <div className="mb-5">
          <Title level={2} className="!mb-0">
            Login
          </Title>
          <Text type="secondary">Please enter your credentials</Text>
        </div>
        <Form
          disabled={isPending}
          form={form}
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
          size="small"
        >
          <Form.Item
            name="email"
            label="Email Address"
            className="mb-3"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              size="large"
              placeholder="robertfox@example.com"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            className="mb-3"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              size="large"
              className="rounded-lg"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Checkbox
              onChange={(e) => setIsRemember(e.target.checked)}
              value={isRemember}
            >
              Remember me
            </Checkbox>
          </Form.Item>

          <div className="mb-4">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Form.Item>
            <Button
              loading={isPending}
              type="primary"
              className="mt-4 w-full"
              onClick={form.submit}
              style={{ paddingTop: "18px", paddingBottom: "18px" }}
            >
              Login
            </Button>
          </Form.Item>

          <div className="text-center">
            Don't have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-blue-600 hover:underline"
            >
              Sign up now!
            </Link>
          </div>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
