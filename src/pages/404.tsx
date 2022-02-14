import Head from "next/head";
import dynamic from "next/dynamic";

export default function NotFound() {
	const Animation = dynamic(
		() => import("@/components/lottie/NotFoundAnimate"),
		{ ssr: false }
	);
	const Header = dynamic(() => import("@/components/display/HeaderError"));
	const Footer = dynamic(() => import("@/components/display/Footer"));
	return (
		<>
			<Header />
			<main className="isContainer">
				<Head>
					<title>404 | Rifkidhan</title>
				</Head>
				<section className="flex flex-col min-h-screen items-center justify-center py-10">
					<div className="w-1/2 mb-5">
						<Animation />
					</div>
					<h3 className="font-semibold uppercase">Empat Nol Empat</h3>
					<p>Halaman yang kamu cari tidak ada.</p>
				</section>
			</main>
			<Footer />
		</>
	);
}
