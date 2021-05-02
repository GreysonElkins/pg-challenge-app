import { Route, Switch } from 'react-router-dom'
import Home from './home'
import UserDirectory from './userDirectory'

const importedRoutes = [ Home, UserDirectory ]

const allRoutes = importedRoutes.map(({ path, component }, i) => (
  <Route key={`route-${i}`} exact path={path} component={component} />
))

const Routes = () => (
  <Switch>
    {allRoutes}
  </Switch>
)

export default Routes