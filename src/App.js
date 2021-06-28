import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.min.css';

import FuturesPrices from './Price/FuturesPrices';


import FuturesAccount from './FutuersAccount';
import { red } from '@material-ui/core/colors';

function App() {
  return (
    
    <div className="App">


      <div class="columns is-desktop">
        <div class="column is-full">

          <div className="App-header">
            <FuturesPrices></FuturesPrices>
          </div>

        </div>
      </div>


      <div class="columns is-desktop">
        <div class="column is-four-fifths">
          <div className="App-section">
            Chart
          </div>
        </div>
        <div class="column">
          <div className="App-aside">
            Order
          </div>
        </div>
      </div>


      <div class="columns is-desktop">
        <div class="column is-full">
          <div className="App-footer">
            History
          </div>
        </div>
      </div>









    </div>
  );
}

export default App;
