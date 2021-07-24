//グローバルCSS
import '../styles/global.css'

//_app.jsを機能させるときはサーバーを再起動させる必要がある
export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}