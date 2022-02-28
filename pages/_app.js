
import { SessionProvider } from "next-auth/react";
import "../css/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;