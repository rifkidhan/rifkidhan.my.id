import s from './Feature.module.css';
import dynamic from 'next/dynamic';
import { imageUrl } from '@libs/directus';
import { FC } from 'react';
import { LoadingDots } from '@components/common';
import Markdown from 'markdown-to-jsx';
import type { HomeFeature } from '@libs/data/types';

interface Features {
  features: HomeFeature[];
}

const Loading = () => (
  <div className="loading">
    <LoadingDots />
  </div>
);

const dynamicProps = {
  loading: Loading,
  ssr: false
};

const Animation = dynamic(() => import('@components/common/Lottie'), {
  ...dynamicProps
});

const FeatureSection: FC<Features> = ({ features }) => {
  return (
    <div className={s.root}>
      <div className={`${s.heading} isContainer`}>
        <h3>Do you need your own website?</h3>
        <h2>Make your website without dizzie</h2>
      </div>
      <div className={`${s.features} isContainer`}>
        {features?.map((feature) => (
          <div key={feature.id} className={s.feature}>
            <div className={s.featureAnimation}>
              <div>
                <Animation
                  src={`${imageUrl}/${feature.animation.filename_disk}`}
                />
              </div>
            </div>
            <div className={s.featureText}>
              <h4 className={s.featureTextTitle}>{feature.title}</h4>
              <Markdown className={s.featureTextDescription}>
                {feature.content}
              </Markdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
