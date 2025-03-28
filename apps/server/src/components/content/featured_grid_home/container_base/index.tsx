import classNames from "classnames";
import Link from 'next/link';

interface Props {
      className?: string;
      children: React.ReactNode;
      href?: string | null;
}

export const BaseCardContainer: React.FC<Props> = ({className, href, children}) => {

      const containerClass = classNames(
            "w-full h-full bg-white p-1 rounded border-solid border-[0.5px] border-gray-200",
            className
      );

      return <>
            {href &&
                  <Link className={containerClass} href={href}>{children}</Link>
            }
            {!href &&
                  <div className={containerClass}>
                        {children}
                  </div>
            }
      </>
};
