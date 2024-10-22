
import { Button } from "gaudi/button";
import './tailwind.scss'

type Args = {
    children: React.ReactNode
}

const Layout = ({ children }: Args) => (
    <div>
        <Button label='2'></Button>
    </div>
)

export default Layout
