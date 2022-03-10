import Head from "next/head";
import dynamic from "next/dynamic";
import { Footer } from "@/components/display";

export default function NotFound() {
  const Header = dynamic(
    () => import("@/components/display/Header/HeaderError")
  );
  const Animation = dynamic(() => import("@/components/display/Lottie"), {
    ssr: false,
  });
  return (
    <>
      <Header />
      <main className="isContainer">
        <Head>
          <title>404 | Rifkidhan</title>
        </Head>
        <section className="flex min-h-screen flex-col items-center justify-center py-10">
          <div className="mb-5 w-1/2">
            <Animation src="lottie/NotFoundAnimate.lottie" />
          </div>
          <h3 className="font-semibold uppercase">Empat Nol Empat</h3>
          <p>Halaman yang kamu cari tidak ada.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
