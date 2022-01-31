import Head from "next/head";
import dynamic from "next/dynamic";
import { Container } from "@/components/display";

export default function NotFound() {
	const Animation = dynamic(() => import("@/components/lottie/Yoga"));
	return (
		<Container>
			<Head>
				<title>404 | Rifkidhan</title>
			</Head>
			<div className="flex flex-col min-h-screen items-center justify-center py-10">
				<div className="w-1/2 mb-5">
					<Animation />
				</div>
				<h3 className="font-semibold uppercase">Empat Nol Empat</h3>
				<p>Halaman yang kamu cari belum ada.</p>
			</div>
		</Container>
	);
}
