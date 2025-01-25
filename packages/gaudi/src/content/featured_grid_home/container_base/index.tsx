import classNames from "classnames";
import Link from 'next/link';

interface Props {
      children: React.ReactNode;
      href?: string | null;
      className?: string;
}

export const BaseCardContainer = (props: Props) => {

      const containerClass = classNames(
            "w-full h-full bg-white p-1 rounded border-solid border-[0.5px] border-gray-200",
            props.className
      );

      return <>
            {props.href &&
                  <Link className={containerClass} href={props.href}>{props.children}</Link>
            }
            {!props.href &&
                  <div className={containerClass}>
                        {props.children}
                  </div>
            }
      </>
};
