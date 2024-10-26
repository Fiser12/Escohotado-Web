import logo from '../../assets/svgs/signature.svg';

type Args = {
    tabindex?: number,
}

export const Logo = ({ tabindex }: Args): JSX.Element => {
    const homeUrl = '/';

    return (
        <div className="flex-shrink min-w-0 mr-4">
            <a href={homeUrl} className="inline-block" tabIndex={tabindex}>
                <img src={logo.src} alt="Antonio Escohotado" className="w-full max-w-[240px] h-auto object-contain" />
            </a>
        </div>
    )
}