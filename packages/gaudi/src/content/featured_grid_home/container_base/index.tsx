import classNames from "classnames";

interface Props {
      children: React.ReactNode;
      className?: string;
}

export const BaseCardContainer = (props: Props) => {

      const containerClass = classNames(
            "w-full h-full bg-white p-1 rounded",
            props.className
      );

      return (
            <div className={containerClass}>
                  {props.children}
            </div>
      );

};
