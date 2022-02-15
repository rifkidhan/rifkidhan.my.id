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
