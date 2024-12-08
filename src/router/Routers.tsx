import CustomHeader from "@/components/header/CustomHeader";
import { Layout } from "antd";

const Routers = ({ Component, pageProps }: any) => {
  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <CustomHeader />
      <Component pageProps={pageProps} />
    </Layout>
  );
};

export default Routers;
