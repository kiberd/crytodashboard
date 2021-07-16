import React, { useState, useEffect } from 'react'

// Node Binance API
// https://github.com/binance-exchange/node-binance-api

const Binance = require('node-binance-api')
const binance = new Binance().options({
  APIKEY: 'SLhtSQEGGz8xEt8HYQqrZym1ucWnWPafM6RH8LUBJZNfPlXNV0vI2UcVqtjKkGFT',
  APISECRET: 'WoE5zO8KCb82tOutzxlHnKc6YeeFGHfi9fsuQeQRWsvvEEX1unFfXT3QR7MBfP6t'
})

// BTCUSDT - price
const FuturesAccount = () => {

  const [accountinfo, setAccountinfo] = useState([])

    useEffect(() => {

      async function fetchMyAPI() {

        let response = await binance.futuresAccount();


        console.log(response);

        // setAccountinfo(response);
      }

      fetchMyAPI();

    }, [accountinfo])

    return <div>{accountinfo}</div>

}

export default FuturesAccount