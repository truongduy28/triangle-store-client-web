import { appColors } from "@/constants/antd";
import {
  useResendVerifyCodeCustomer,
  useVerifyCustomer,
} from "@/hooks/tanstacks/useCustomer";
import { CreateCustomerResponse, ICustomer } from "@/interfaces/customer";
import { addAuth } from "@/redux/reducers/authReducer";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, message, Spin, Typography } from "antd";
import { useRouter } from "next/router";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";

interface Props {
  onBack: () => void;
  data: CreateCustomerResponse["data"] | undefined;
}

const VerifyForm = ({ onBack, data }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // API: Verify customer
  const { mutate, isPending } = useVerifyCustomer();

  //   API: Resend verify code
  const { mutate: resend, isPending: isResending } =
    useResendVerifyCodeCustomer();

  const isLoading = isPending || isResending;
  const inputRefs = [
    useRef<InputRef>(null),
    useRef<InputRef>(null),
    useRef<InputRef>(null),
    useRef<InputRef>(null),
    useRef<InputRef>(null),
    useRef<InputRef>(null),
  ];

  const [numsOfCode, setNumsOfCode] = useState<string[]>(Array(6).fill(""));
  const [times, setTimes] = useState(60);

  useEffect(() => {
    const time = setInterval(() => {
      setTimes((t) => t - 1);
    }, 1000);
    return () => clearInterval(time);
  }, []);

  const handleChangeNumsCode = (val: string, index: number) => {
    const newNumsOfCode = [...numsOfCode];
    newNumsOfCode[index] = val;
    setNumsOfCode(newNumsOfCode);

    if (val && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !numsOfCode[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    const code = numsOfCode.join("");
    if (code.length === 6) {
      mutate(
        { code, id: data?._id as string },
        {
          onSuccess: (data) => {
            message.success(data.message);
            dispatch(addAuth({ ...data.data, isRemember: true }));
            router.push("/");
          },
          onError: (error) => {
            message.error(error.message);
          },
        }
      );
    } else {
      message.error("Invalid code");
    }
  };

  const handleResendCode = async () => {
    const { _id, email } = data as ICustomer;

    resend(
      { email, id: _id },
      {
        onSuccess: (data) => {
          message.success(data.message);
          setTimes(60);
          setNumsOfCode([]);
        },
        onError: (error) => {
          message.error(error.message);
        },
      }
    );
  };

  return (
    <div className="px-10 w-3/4">
      <Button
        onClick={onBack}
        type="text"
        icon={<BsArrowLeft size={20} className="text-muted" />}
      >
        <Typography.Text>Back</Typography.Text>
      </Button>

      <div className="mt-4">
        <Typography.Title level={2} className="m-0">
          Enter OTP
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          We have shared a code to your registered email address
          {" " + data?.email}
        </Typography.Paragraph>
      </div>
      <div className="mt-4">
        <div className="flex justify-between">
          {inputRefs.map((ref, index) => (
            <Input
              key={index}
              showCount={false}
              ref={ref}
              value={numsOfCode[index]}
              onChange={(e) => handleChangeNumsCode(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              placeholder=""
              size="large"
              maxLength={1}
              disabled={isLoading}
              style={{
                fontSize: 32,
                fontWeight: "bold",
                width: "calc((100% - 90px) / 6)",
                textAlign: "center",
              }}
            />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <Button
          disabled={numsOfCode.join("").length < 6}
          loading={isPending}
          type="primary"
          size="large"
          className="w-full"
          onClick={handleVerify}
        >
          Verify
        </Button>
        <div className="mt-2 text-center">
          {times < 0 ? (
            <Button type="link" onClick={handleResendCode}>
              Resend code{" "}
              {isResending && (
                <Spin
                  indicator={
                    <LoadingOutlined
                      spin
                      style={{ color: appColors.blue.blue8 }}
                    />
                  }
                  size="small"
                />
              )}
            </Button>
          ) : (
            <Typography>Resend a new code: {times}s</Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyForm;
