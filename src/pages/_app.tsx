import store from "@/redux/store";
import "@/styles/globals.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#000",
            },
          }}
        >
          <StyleProvider hashPriority="high">
            <Component {...pageProps} />
          </StyleProvider>
        </ConfigProvider>
      </Provider>
    </QueryClientProvider>
  );
}
