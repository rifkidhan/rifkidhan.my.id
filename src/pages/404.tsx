import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";
import { Footer } from "@/components/common";
import Link from "next/link";

export default function NotFound() {
  const Animation = dynamic(() => import("@/components/common/Lottie"), {
    ssr: false,
  });
  return (
    <>
      <NextSeo
        nofollow={true}
        noindex={true}
        title="Not Found"
        description="Page Not Found"
      />
      <main className="isContainer">
        <section className="mb-10 flex min-h-screen flex-col items-center justify-center gap-10">
          <div className="mb-5 w-1/2 dark:rounded-full dark:bg-stone-50">
            <Animation src="lottie/NotFoundAnimate.lottie" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold uppercase">Empat Nol Empat</h3>
            <p>Halaman yang kamu cari tidak ada.</p>
          </div>
          <Link href={"/"}>
            <a className="border border-stone-900 py-3 px-5 transition-all duration-300 hover:bg-stone-900 hover:text-stone-50 dark:border-stone-50 dark:hover:bg-stone-50 dark:hover:text-stone-900">
              Kembali ke Home
            </a>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
