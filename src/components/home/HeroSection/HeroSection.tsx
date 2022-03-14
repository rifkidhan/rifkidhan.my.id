import dynamic from "next/dynamic";
import s from "./Hero.module.css";

const HeroSection = () => {
  const Animation = dynamic(() => import("@/components/display/Lottie"), {
    ssr: false,
  });
  return (
    <section className={`${s.root} isContainer`}>
      <Animation src="lottie/Bike.lottie" />
      <h1 className={s.h1}>
        <span>Hello!</span>
        My name is Rifki Ramadhan.
      </h1>
    </section>
  );
};

export default HeroSection;
