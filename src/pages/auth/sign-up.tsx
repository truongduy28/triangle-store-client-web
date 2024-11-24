import { useCreateCustomer } from "@/hooks/tanstacks/useCustomer";
import { CreateCustomerPayload } from "@/interfaces/customer";
import { getBgUrlFromPathname, getLastSegment } from "@/utils/pathname";
import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import AuthLayout from "./_components/AuthLayout";
import VerifyForm from "./_components/VerifyForm";

const { Title, Text } = Typography;
const SignUpPage = () => {
  const [isVerificationMode, setIsVerificationMode] = useState(false);
  const lastSegment = getLastSegment();
  const bannerUrl = getBgUrlFromPathname(
    isVerificationMode ? "verify" : lastSegment
  );

  // API: Sign up new customer
  const { mutate, isPending, data } = useCreateCustomer();

  const [form] = Form.useForm();

  useEffect(() => {
    setIsVerificationMode(!!data?.data);
  }, [data]);

  const handleSubmit = (value: CreateCustomerPayload) => {
    mutate(value, {
      onSuccess: () => {
        if (data && data.data) {
        }
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };

  return (
    <AuthLayout banner={bannerUrl}>
      {isVerificationMode ? (
        <VerifyForm
          data={data?.data}
          onBack={() => setIsVerificationMode(false)}
        />
      ) : (
        <div className="px-10 w-3/4">
          <div className="mb-5">
            <Title level={2} className="!mb-0">
              Create New Account
            </Title>
            <Text type="secondary">Please enter details</Text>
          </div>
          <Form
            disabled={isPending}
            form={form}
            name="signup"
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark={false}
            size="small"
          >
            <Form.Item
              name="firstName"
              label="First Name"
              className="mb-3"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input size="large" placeholder="Robert" className="rounded-lg" />
            </Form.Item>

            <Form.Item
              name="lastName"
              className="mb-3"
              label="Last Name"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input size="large" placeholder="Fox" className="rounded-lg" />
            </Form.Item>

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
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                size="large"
                className="rounded-lg"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Should accept terms & conditions")
                        ),
                },
              ]}
            >
              <Checkbox>
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </Link>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                loading={isPending}
                type="primary"
                className="mt-4 w-full"
                onClick={form.submit}
                style={{ paddingTop: "18px", paddingBottom: "18px" }}
              >
                Signup
              </Button>
            </Form.Item>
            <div>
              <Text type="secondary">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:underline"
                >
                  Login here
                </Link>
              </Text>
            </div>
          </Form>
        </div>
      )}
    </AuthLayout>
  );
};

export default SignUpPage;
