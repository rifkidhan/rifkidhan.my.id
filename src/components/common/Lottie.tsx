import Script from "next/script";
import { FC } from "react";

interface Props {
  src: string;
}

const Lottie: FC<Props> = ({ src }) => {
  return (
    <div>
      <Script
        src="https://unpkg.com/@dotlottie/player-component@1.0.0/dist/dotlottie-player.js"
        strategy="afterInteractive"
      />
      <dotlottie-player
        src={src}
        autoplay
        loop
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default Lottie;
