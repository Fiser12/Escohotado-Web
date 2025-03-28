import classNames from "classnames";
import Image from "next/image"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
      coverHref: string;
      isSelected?: boolean;
      className?: string;
}

export const CirclePhoto: React.FC<Props> = ({ coverHref, isSelected = false, className }) => {
      const containerClass = classNames('bg-white rounded-full aspect-square p-1 hover:border-primary-300 transition-all duration-300 ease-in-out', className,
            {
                  'border-2 border-primary-300 h-16': isSelected,
                  'border border-gray-disabled h-20': !isSelected,
            }
      )

      return (
            <div className={containerClass}>
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                              fill
                              src={coverHref}
                              alt="Photo"
                              className="object-cover"
                        />
                  </div>
            </div>
      );
}