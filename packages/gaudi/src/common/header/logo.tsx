import logo from '../../assets/svgs/signature.svg';


interface Props {
    tabindex?: number,
}

export const Logo: React.FC<Props> = ({ tabindex }) => {
    const homeUrl = '/';

    return (
        <div className="shrink min-w-0 mr-4">
            <a href={homeUrl} className="inline-block" tabIndex={tabindex}>
                <img src={logo.src} alt="Antonio Escohotado" className="w-full max-w-[240px] h-auto object-contain" />
            </a>
        </div>
    )
}