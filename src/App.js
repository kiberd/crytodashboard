/*global kakao*/
import './App.css';
import 'bulma/css/bulma.min.css';
import React, { useState, useEffect, useRef, useContext } from 'react'


import './Location/Location.js'
import Location from './Location/Location.js';
import List from './List/List.js'


import { Context } from "./context";



function App() {


  useEffect(() => {

    // 마운트 된 후 카카오 서비스 객체 선언후 상태값에 주입
    const ps = new kakao.maps.services.Places();
    getCurrentPosition();
    setPs(ps);

  }, [])

  const { visablestatus, visablestatusroute, myposition, contextDispatch } = useContext(Context);




  // 검색 키워드 ref
  const keywordInput = useRef();
  // 검색 결과 상태값
  const [resultData, setResultData] = useState();

  // 지도에 마커 찍기위해 넘겨줄 placedata
  const [placeData, setPlaceData] = useState();

  // 지도 범위 재설정 위한 상태값
  const [bounds, setBounds] = useState();

  // 카카오 서비스 객체 상태값 
  const [ps, setPs] = useState();


  // 검색 버튼 누르면 키워드 서치 call
  const searchPlaces = () => {

    // 지도 화면 on
    contextDispatch({ type: "CHANGEVISABLE", visablestatus: { visable: true, url: '' } });
    contextDispatch({ type: "CHANGEVISABLEROUTE", visablestatusroute: { visable: false, url: '' } });
    const keyword = keywordInput.current.value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
    }

    else {
      ps.keywordSearch(keyword, placesSearchCB);

    }
  }

  const getCurrentPosition = () => {
    console.log(navigator);
    if (navigator) {
      
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        contextDispatch({ type: "SETPOSITION", myposition: { lat: position.coords.latitude, lng: position.coords.longitude } });
      });
    }
    else {
      alert('내 위치를 가져올 수 없습니다.');
    }
  }

  // Callback function after search
  const placesSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {

      const bounds = new kakao.maps.LatLngBounds();

      // 지도 범위 계산 (bounds)
      for (let i = 0; i < data.length; i++) {
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      // 지도 범위 상태값 set
      setBounds(bounds);
      // 마커 데이터 상태값 set
      setPlaceData(data);
      // 검색 결과 리스트로 넘겨줄 상태값에 set
      setResultData(data);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

      alert('검색 결과가 존재하지 않습니다.');
      return;

    } else if (status === kakao.maps.services.Status.ERROR) {

      alert('검색 결과 중 오류가 발생했습니다.');
      return;

    }
  }

  return (

    <div className="App">

      <div class="columns is-desktop">
        <div class="column is-full">

          <div className="App-header">
            <div class="columns is-desktop">
              <div class="column is-2">
                <input class="input" type="text" placeholder="키워드 입력" ref={keywordInput}></input>
              </div>
              <div class="column is-1">
                <a class="button is-primary" onClick={searchPlaces}>검색</a>
              </div>
              <div class="column is-1">
                <a class="button is-primary" onClick={getCurrentPosition}>내 위치</a>
              </div>

            </div>
          </div>

        </div>
      </div>

      <hr></hr>
      {
        visablestatusroute.visable ?
          <div class="columns is-desktop">
            <div class="column">
              <a class="button is-small is-link" style={{ marginBottom: 1 + 'em' }} onClick={searchPlaces}>돌아가기</a>
              <iframe src={visablestatusroute.url} width='100%' height='750px' ></iframe>
            </div>
          </div>
          :
          <>
            <div class="columns is-desktop">
              <div class="column is-three-fifths">
                <div className="App-section">
                  {
                    visablestatus.visable ?
                      <Location placeData={placeData} bounds={bounds}></Location>
                      :
                      <>
                        <a class="button is-small is-link" style={{ marginBottom: 1 + 'em' }} onClick={searchPlaces}>돌아가기</a>
                        <iframe src={visablestatus.url} width='100%' height='750px' ></iframe>
                      </>
                  }
                </div>
              </div>
              <div class="column">
                <div className="App-aside">
                  <List resultData={resultData}></List>
                </div>
              </div>
            </div>
          </>

      }

      {/* 
      <hr></hr>
      <div class="columns is-desktop">
        <div class="column is-full">
          <div className="App-footer">
            History
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default App;
