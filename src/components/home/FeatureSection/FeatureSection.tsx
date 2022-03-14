import s from "./Feature.module.css";
import dynamic from "next/dynamic";
import { imageUrl } from "@/libs/constant";

type Feature = {
  id: string;
  title: string;
  description: string;
  animation: {
    filename_disk: string;
  };
};

type Features = {
  features: Feature[];
};

const Animation = dynamic(() => import("@/components/display/Lottie"), {
  ssr: false,
});

const FeatureSection = ({ features }: Features) => {
  return (
    <div className={s.root}>
      <div className={`${s.heading} isContainer`}>
        <h3>Do you need your own website?</h3>
        <h2>Make your website without dizzie</h2>
      </div>
      <div className={`${s.features} isContainer`}>
        {features.map((feature: Feature) => (
          <div key={feature.id} className={s.feature}>
            <div className={s.featureText}>
              <h4 className={s.featureTextTitle}>{feature.title}</h4>
              <div
                className={s.featureTextDescription}
                dangerouslySetInnerHTML={{ __html: `${feature.description}` }}
              />
            </div>
            <div className={s.featureAnimation}>
              <div className="m-auto w-4/5 md:w-full">
                <Animation
                  src={`${imageUrl}/${feature.animation.filename_disk}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
