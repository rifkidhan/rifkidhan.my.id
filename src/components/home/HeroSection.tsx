<<<<<<< HEAD
import dynamic from "next/dynamic";

const HeroSection = () => {
	const Animation = dynamic(() => import("@/components/lottie/Bike"), {
		ssr: false,
	});
	return (
		<section className="heroImage isContainer">
			<Animation />
			<h1 className="heroImage_h1">
				<span>Hello!</span>
				My name is Rifki Ramadhan.
			</h1>
		</section>
	);
};

export default HeroSection;
=======
import Section from "./Section";

const HeroSection = () => {
	return (
		<div className="w-full flex flex-col items-center justify-center min-h-screen">
			<div className="bg-stone-900 w-full py-10">
				<Section>
					<h1 className="text-stone-200 text-center">RIFKIDHAN</h1>
				</Section>
			</div>
		</div>
	);
};

export default HeroSection;
>>>>>>> 9e54861 (Initial Commit)
