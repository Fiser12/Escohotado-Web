import classNames from 'classnames';
import { Link } from '../../../common/links/link';
import { H3 } from '../../../common/headers/H3';

interface Props {
    title: string;
    author?: string;
    textLink: string;
    href: string;
}
export const HeadlineCard = (props:Props) => {
    const containerClass = classNames(
        'w-full pt-4 border-solid border-b-[1px] border-gray-dark'
    );

    return(
        <div className={containerClass}>
            <div className='flex flex-col gap-1'>
                <p className='font-body text-xs text-black'>{props.author}</p>
                <H3 label={props.title} className='line-clamp-2'></H3>
            </div>
            <Link href={props.href} text={props.textLink} className="py-4" />
        </div>
    );
};