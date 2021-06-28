import React, { useState, useEffect } from 'react'
import 'bulma/css/bulma.min.css';
import '../Price/FuturesPrices.css'

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Binance = require('node-binance-api')
const binance = new Binance().options({
  APIKEY: 'SLhtSQEGGz8xEt8HYQqrZym1ucWnWPafM6RH8LUBJZNfPlXNV0vI2UcVqtjKkGFT',
  APISECRET: 'WoE5zO8KCb82tOutzxlHnKc6YeeFGHfi9fsuQeQRWsvvEEX1unFfXT3QR7MBfP6t'
})



function FuturesPrices() {


  const [marketNames, setmarketNames] = useState([]);
  const [targetMarket, settargetMarket] = useState();
  const [targetPrice, settargetPrice] = useState();

  useEffect(() => {

    async function fetchMyAPI() {

      let response = await binance.futuresPrices()
      let keys = Object.keys(response);

      setmarketNames(keys);
      settargetMarket(keys[0]);
      handleTargetPrice(keys[0]);
    }
    fetchMyAPI()
  }, []);

  
  const handleMarketSelect = (name) => {
    settargetMarket(name);
    handleTargetPrice(name);
  }

  const handleTargetPrice = (arg) => {
      async function fetchMyAPI() {
        let response = await binance.futuresPrices();
        settargetPrice(response[arg]);
      };
      fetchMyAPI();
  }
  



  return (

    <div class="columns is-desktop">
      <div class="column is-one-fifth">

        <div className="marketList">

          <div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                <span>{targetMarket}</span>
                <span class="icon is-small">
                  <FontAwesomeIcon icon={faAngleDown} />
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu4" role="menu">
              <div class="dropdown-content">

                {marketNames.map((name) => (
                  <>
                    <div class="dropdown-item">
                      <a onClick={(e) => handleMarketSelect(name)}>
                        {name}
                      </a>
                    </div>
                    <hr class="dropdown-divider"></hr>
                  </>
                ))}







              </div>
            </div>
          </div>








        </div>

      </div>

      <div class="column is-one-fifth">

        <div className="currentPrice">
          {targetPrice}
        </div>

      </div>


      <div class="column">

        <div className="priceInfo">
          priceInfo
        </div>

      </div>
    </div>

  );
}


export default FuturesPrices



