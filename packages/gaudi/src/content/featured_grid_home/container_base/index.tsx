import classNames from "classnames";

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
                  <a className={containerClass} href={props.href}>{props.children}</a>
            }
            {!props.href &&
                  <div className={containerClass}>
                        {props.children}
                  </div>
            }
      </>
};
