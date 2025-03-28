import classNames from 'classnames';
import { Link } from '../../../common/links/link';
import { H3 } from '../../../common/headers/H3';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    author?: string;
    textLink: string;
    href: string;
}
export const HeadlineCard: React.FC<Props> = ({className, author, title, textLink, href, ...rest}) => {
    const containerClass = classNames(
        'w-full pt-4 border-solid border-b-[1px] border-gray-dark',
        className
    );

    return (
        <div className={containerClass} {...rest}>
            <div className='flex flex-col gap-1'>
                <p className='font-body text-xs text-black'>{author}</p>
                <H3 label={title} className='line-clamp-2'></H3>
            </div>
            <Link href={href} text={textLink} className="py-4" />
        </div>
    );
};