import { useLottie } from "lottie-react";
import WorkAndLifeBalance from "./WorkAndLifeBalance.json";

const Yoga = () => {
	const option = {
		animationData: WorkAndLifeBalance,
		loop: true,
		autoplay: true,
	};
	const { View } = useLottie(option);
	return View;
};

export default Yoga;
