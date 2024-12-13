import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import { AuthProvider } from "@/contexts/AuthContext";


export default function App({ Component, pageProps }) {
  const router = useRouter(); 
  const is404Page = router.pathname === "/404";

  return (
    <>
      <AuthProvider>
        {!is404Page && <Navbar />}
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
