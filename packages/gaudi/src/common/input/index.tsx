import classNames from "classnames";

interface Props {
      label: string;
      text?: string;
      placeholder: string;
      state?: 'enabled' | 'disabled';
      className?: string;
      children?: React.ReactNode;
}

export const InputForm = (props: Props) => {

      const containerClass = classNames(
            'w-full p-1 flex items-center bg-white rounded border-solid font-normal text-base min-h-10',
            props.className,
            {
                  // Enabled
                  'border border-primary-900': props.state === 'enabled',
                  // Disabled
                  'border-0.5 border-gray-disabled': props.state === 'disabled',
            }
      );

      const inputClass = classNames(
            'grow min-w-0 bg-transparent outline-none placeholder-gray-500 placeholder-gray-disabled px-2',
            props.className,
      );

      return (
            <div className={containerClass}>
                  <input
                        type="text"
                        placeholder={props.placeholder}
                        defaultValue={props.text}
                        disabled={props.state === 'disabled'}
                        className={inputClass}
                  />
                  {props.children}
            </div>
      );
};