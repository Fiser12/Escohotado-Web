
import { H1 } from "gaudi";
import './tailwind.scss'

type Args = {
    children: React.ReactNode
}

const Layout = ({ children }: Args) => (
    <div>
        <H1 label={"Antonio Escohotado"}/>
    </div>
)

export default Layout
