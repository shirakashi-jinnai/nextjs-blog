//グローバルCSS
import "../styles/global.css";
import { AppProps } from "next/dist/next-server/lib/router/router";

//_app.jsを機能させるときはサーバーを再起動させる必要がある
function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App