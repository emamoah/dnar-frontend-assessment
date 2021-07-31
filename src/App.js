import UIContextProvider from 'contexts/UIContext';
import CoinInfo from 'pages/CoinInfo';
import Home from 'pages/Home';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <UIContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/coin/:coin_id" component={CoinInfo} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </UIContextProvider>
    </div>
  );
}

export default App;
