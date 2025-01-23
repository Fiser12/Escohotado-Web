import classNames from 'classnames';

interface Props {
      className?: string;
}

export const PlayIcon: React.FC<Props> = ({
      className = '',
}) => {
      const iconClass = classNames(
            className,
      );

      return (
            <svg
                  viewBox="0 0 27 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={iconClass}
            >
                  <path d="M25.9534 15.3176C27.1781 16.1049 27.1781 17.8951 25.9534 18.6824L3.97014 32.8137C2.63912 33.6694 0.888672 32.7137 0.888672 31.1314L0.888672 2.86862C0.888672 1.28631 2.63912 0.330631 3.97015 1.18625L25.9534 15.3176Z" fill="currentColor" />
            </svg>
      );
};
