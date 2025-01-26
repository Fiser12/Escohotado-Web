import classNames from 'classnames';
import logo from '../../assets/svgs/signature.svg';
import Link from 'next/link';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
}

export const Logo: React.FC<Props> = ({ tabIndex, className, ...rest }) => {
    const homeUrl = '/';
    const divClass = classNames(
        'shrink',
        'min-w-0',
        'mr-4',
        className
    )
    return (
        <div className={divClass} {...rest}>
            <Link href={homeUrl} className="inline-block" tabIndex={tabIndex}>
                <img src={logo.src} alt="Antonio Escohotado" className="w-full max-w-[240px] h-auto object-contain" />
            </Link>
        </div>
    )
}