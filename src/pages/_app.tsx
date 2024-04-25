import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter,Prompt } from "next/font/google";

const inter = Prompt({
  subsets: ["latin"],
  weight: "400"
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
