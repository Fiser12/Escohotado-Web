import classNames from "classnames";
import Image from "next/image";
import { BaseCardContainer } from "../../container_base";
import "./style.css";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
      alt?: string | null;
      mediaHref: string;
}

export const FeaturedMedia: React.FC<Props> = ({ className, mediaHref, title, ...rest }) => {
      const ImageClass = classNames('object-cover');

      return (
            <BaseCardContainer className={`base-container-axis-media ${className}`} {...rest}>
                  <Image
                        width={400}
                        height={600}
                        layout="responsive"
                        src={mediaHref}
                        alt={title ?? ""}
                        className={ImageClass}
                  />
            </BaseCardContainer>
      );
};