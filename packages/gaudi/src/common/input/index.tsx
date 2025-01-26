import classNames from "classnames";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
      label: string;
      text?: string;
      placeholder: string;
      state?: 'enabled' | 'disabled';
      className?: string;
      children?: React.ReactNode;
}

export const InputForm: React.FC<Props> = ({className, state, placeholder, text, children, ...rest}) => {

      const containerClass = classNames(
            'w-full p-1 flex items-center bg-white rounded border-solid font-normal text-base min-h-10',
            className,
            {
                  // Enabled
                  'border border-primary-900': state === 'enabled',
                  // Disabled
                  'border-0.5 border-gray-disabled': state === 'disabled',
            }
      );

      const inputClass = classNames(
            'grow min-w-0 bg-transparent outline-none placeholder-gray-500 placeholder-gray-disabled px-2',
            className,
      );

      return (
            <div className={containerClass} {...rest}>
                  <input
                        type="text"
                        placeholder={placeholder}
                        defaultValue={text}
                        disabled={state === 'disabled'}
                        className={inputClass}
                  />
                  {children}
            </div>
      );
};