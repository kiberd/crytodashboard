/*global kakao*/
import './App.css';
import 'bulma/css/bulma.min.css';
import React, { useState, useEffect, useRef } from 'react'


import './Location/Location.js'
import Location from './Location/Location.js';
import List from './List/List.js'


import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function App() {


  useEffect(() => {

    // 마운트 된 후 카카오 서비스 객체 선언후 상태값에 주입
    const ps = new kakao.maps.services.Places();
    setPs(ps);

  }, [])



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

    const keyword = keywordInput.current.value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
    }

    else {
      ps.keywordSearch(keyword, placesSearchCB);

    }
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {


      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      const bounds = new kakao.maps.LatLngBounds();

      // 지도 범위 계산 (bounds)
      for (let i = 0; i < data.length; i++) {
        // displayMarker(data[i]);
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

  // 지도에 마커를 표시하는 함수입니다
  const displayMarker = (place) => {

    // // 마커를 생성하고 지도에 표시합니다
    // var marker = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(place.y, place.x)
    // });

    // // 마커에 클릭이벤트를 등록합니다
    // kakao.maps.event.addListener(marker, 'click', function () {
    //   // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    //   infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
    //   infowindow.open(map, marker);
    // });


  }

  return (

    <div className="App">

      <div class="columns is-desktop">
        <div class="column is-full">

          <div className="App-header">
            <div class="columns is-desktop">
              <div class="column is-1">
                <div class="dropdown is-hoverable">
                  <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                      <span>반경 선택</span>
                      <span class="icon is-small">
                        <FontAwesomeIcon icon={faAngleDown} />
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                    <div class="dropdown-content">
                      <div class="dropdown-item">
                        <a> 500m </a>
                        <hr class="dropdown-divider"></hr>
                        <a> 1km </a>
                        <hr class="dropdown-divider"></hr>
                        <a> 5km </a>
                        <hr class="dropdown-divider"></hr>
                        <a> 10km </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column is-2">
                <input class="input" type="text" placeholder="키워드 입력" ref={keywordInput}></input>
              </div>
              <div class="column is-1">
                <a class="button is-primary" onClick={searchPlaces}>검색</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      <hr></hr>


      <div class="columns is-desktop">

        <div class="column is-three-fifths">
          <div className="App-section">
            <Location placeData={placeData} bounds={bounds}></Location>
          </div>
        </div>


        <div class="column">
          <div className="App-aside">
            <List resultData={resultData}></List>
          </div>
        </div>


      </div>

      <hr></hr>


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
