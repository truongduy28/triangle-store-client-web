import Url from "@/assets/images/logo/6bae59252f485a71cb2944ebf153ef44.png";
import { Typography } from "antd";
import Image from "next/image";
interface Props {
  className?: string;
}

const { Title } = Typography;
const Logo = ({}: Props) => {
  return (
    <div className="flex items-center" style={{ gap: "10px" }}>
      <Image src={Url} alt="Logo" width={90} />
      <Title
        level={2}
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
