import classNames from 'classnames';
import logo from '../../assets/svgs/signature.svg';
import Link from 'next/link';
import Image from 'next/image';

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
            <Link href={homeUrl} className="inline-block w-full max-w-[180px] h-auto" tabIndex={tabIndex}>
                <Image
                    src={logo.src}
                    alt="Antonio Escohotado"
                    width={240}
                    height={240}
                />
            </Link>
        </div>
    )
}