import { type AppType } from "next/app";
import { api } from ":)/utils/api";
import ":)/styles/globals.css";
import NavBar from ":)/components/ui/navbar";
import { Toaster } from ":)/components/ui/sonner";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export default api.withTRPC(MyApp);
