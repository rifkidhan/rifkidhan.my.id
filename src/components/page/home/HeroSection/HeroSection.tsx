import dynamic from "next/dynamic";
import { FC } from "react";
import { LoadingDots } from "@/components/common";
import s from "./Hero.module.css";

const Loading = () => (
  <div className={s.loading}>
    <LoadingDots />
  </div>
);
const dynamicProps = {
  loading: Loading,
  ssr: false,
};

const HeroSection: FC = () => {
  const Animation = dynamic(() => import("@/components/common/Lottie"), {
    ...dynamicProps,
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
