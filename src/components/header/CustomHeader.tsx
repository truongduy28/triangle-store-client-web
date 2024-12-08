import { Button, Dropdown, Flex, Space, Typography } from "antd";
import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import { IoHeartOutline, IoSearch } from "react-icons/io5";
import CategoryPanel from "./CategoryPanel";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const { Text } = Typography;

const CustomHeader = () => {
  const router = useRouter();
  const nav = [
    {
      label: <CustomLink to="/" label="Home" />,
      key: "home",
    },
    {
      label: (
        <Dropdown placement="bottom" dropdownRender={() => <CategoryPanel />}>
          <Space size={2}>
            <Text className="cursor-pointer font-semibold text-base">Shop</Text>{" "}
            <DownOutlined />
          </Space>
        </Dropdown>

        // <CustomLink to="/shop" label="Shop" />
      ),
      key: "shop",
    },
    {
      label: <CustomLink to="/story" label="Story" />,
      key: "story",
    },
    {
      label: <CustomLink to="/blog" label="Blog" />,
      key: "blog",
    },
    {
      label: <CustomLink to="/contact" label="Contact" />,
      key: "contact",
    },
  ];
  return (
    <div>
      <Flex justify="space-between" className="px-[10%] py-3">
        <Logo size="small" />
        <Space size={"large"}>
          {nav.map((item) => (
            <div key={item.key}>{item.label}</div>
          ))}
        </Space>
        <Space size={"middle"}>
          <Button icon={<IoSearch size={24} />} type="text" />
          <Button icon={<IoHeartOutline size={24} />} type="text" />
          <Button type="primary" onClick={() => router.push("/auth/login")}>
            Login
          </Button>
        </Space>
      </Flex>
    </div>
  );
};

export default CustomHeader;

const CustomLink = ({ to, label }: { to: string; label: string }) => (
  <Link className="!text-black font-semibold text-base" href={to}>
    {label}
  </Link>
);
