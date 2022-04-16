import s from "./Footer.module.css";
import { Twitter, Facebook, Email, Github } from "@components/icons";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className={s.root}>
      <div className="block">
        <p>© Rifkidhan 2021</p>
      </div>
      <ul className={s.socialMedia}>
        <li>
          <a
            href="https://twitter.com/rifkidhan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <Twitter className={s.socialMediaIcon} />
          </a>
        </li>
        <li>
          <a
            href="https://facebook.com/rifki303"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook className={s.socialMediaIcon} />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/rifkidhan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
          >
            <Github className={s.socialMediaIcon} />
          </a>
        </li>
        <li>
          <a
            href="mailto:rifkiramadhan.9428@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <Email className={s.socialMediaIcon} />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
