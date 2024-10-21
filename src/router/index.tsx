import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import routes from "./routes";
import DashboardPage from "~/pages/Dashboard";
import NewUserPage from "~/pages/NewUser";
import { CadastroProvider } from "~/Context";

const Router = () => {
  return (
    <div style={{ marginTop: 64 }}>
      <CadastroProvider>
        <HashRouter>
          <Switch>
            <Route exact path={routes.dashboard} component={DashboardPage} />
            <Route exact path={routes.newUser} component={NewUserPage} />
            <Route
              exact
              path={routes.history}
              component={() => <div>History</div>}
            />

            <Route exact path="*">
              <Redirect to={routes.dashboard} />
            </Route>
          </Switch>
        </HashRouter>
      </CadastroProvider>
    </div>
  );
};

export default Router;
