import classNames from "classnames";
import { TelegramIcon } from "../icons/social/telegram_icon";
import { WhatssapIcon } from "../icons/social/whatsap_icon";
import { InstagramIcon } from "../icons/social/instagram_icon";
import { FacebookIcon } from "../icons/social/facebook_icon";
import { XIcon } from "../icons/social/x_icon";

interface Props {
  targetShare: string;
  children: React.ReactNode;
}

export const SocialCircle = (props: Props) => {
  const circleClass = classNames(
    'w-11 h-11 rounded-full flex justify-center items-center flex-wrap bg-gray-100 text-primary-900 hover:bg-gray-300 transition-colors duration-200'
  );
  return (
    <a href={props.targetShare} target="_blank" rel="noreferrer">
      <div className={circleClass}>{props.children}</div>
    </a>
  );
};

export const SocialMediaShare = () => {
  const url = encodeURIComponent("https://mi-sitio.com/post-increible");
  const title = encodeURIComponent("¡Mira este post increíble!");
  const hashtags = encodeURIComponent("DesarrolloWeb,ReactJS");

  const heightIcon = "h-5";

  return (
    <div className="flex gap-3">
      <SocialCircle
        targetShare={`https://t.me/share/url?url=${url}&text=${title}`}
      >
        <TelegramIcon className={heightIcon} />
      </SocialCircle>
      <SocialCircle
        targetShare={`https://api.whatsapp.com/send?text=${title}%20${url}`}
      >
        <WhatssapIcon className={heightIcon} />
      </SocialCircle>
      <SocialCircle
        targetShare={`https://www.instagram.com/?url=${url}`}
      >
        <InstagramIcon className={heightIcon} />
      </SocialCircle>
      <SocialCircle
        targetShare={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
      >
        <FacebookIcon className={heightIcon} />
      </SocialCircle>
      <SocialCircle
        targetShare={`https://twitter.com/intent/tweet?url=${url}&text=${title}&hashtags=${hashtags}`}
      >
        <XIcon className={heightIcon} />
      </SocialCircle>
    </div>
  );
};