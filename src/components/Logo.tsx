import Url from "@/assets/images/logo/6bae59252f485a71cb2944ebf153ef44.png";
import { Typography } from "antd";
import Image from "next/image";
import { useMemo } from "react";
interface Props {
  className?: string;
  size?: "large" | "small" | "default";
}

const { Title } = Typography;
const Logo = ({ className, size = "default" }: Props) => {
  const width = useMemo(() => {
    switch (size) {
      case "large":
        return 110;
      case "small":
        return 35;
      default:
        return 90;
    }
  }, [size]);

  const textLevel = useMemo(() => {
    switch (size) {
      case "large":
        return 1;
      case "small":
        return 5;
      default:
        return 2;
    }
  }, [size]);
  return (
    <div className={"flex items-center " + className} style={{ gap: "10px" }}>
      <Image src={Url} alt="Logo" width={width} />
      <Title
        level={textLevel}
        className="border-l-2 border-black pl-2 uppercase"
        style={{ borderLeft: "solid 1px", margin: 0 }}
      >
        Triangle <br />
        Store
      </Title>
    </div>
  );
};

export default Logo;
