import Logo from "@/components/Logo";
import React from "react";

const AuthLayout = ({
  children,
  banner,
}: {
  children: React.ReactNode;
  banner: string;
}) => {
  return (
    <div className="w-screen h-screen flex items-center">
      <div
        className="w-7/12 bg-blue-300 h-full bg-cover relative"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute top-8 left-8">
          <Logo />
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default AuthLayout;
