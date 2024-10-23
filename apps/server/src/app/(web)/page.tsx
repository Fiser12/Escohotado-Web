
import { H1, SubscriptionCard } from "gaudi";
import './tailwind.scss'

type Args = {
    children: React.ReactNode
}

const Layout = ({ children }: Args) => (
    <div>
        <H1 label={"Antonio Escohotado"}/>
        <SubscriptionCard
            price= '49.99€'
            title= 'Plan Básico'
            features = {[
              'Acceso a la newsletter',
              'Acceso anticipado a los vídeos',
              'Acceso a parte del contenido',
            ]}
            mainCard={false}
        
        />
    </div>
)

export default Layout
