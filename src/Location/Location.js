/*global kakao*/
import React, { useContext, useEffect, useState } from 'react'
import './Location.css'
import { Context } from "../context";



const Location = (props) => {




  const [map, setMap] = useState();
  const { place, contextDispatch } = useContext(Context);

  // 지도 범위 재설정
  const bounds = props.bounds;
  const placeData = props.placeData;

  // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  if (typeof bounds !== "undefined") {
    map.setBounds(bounds);
  }


  // 맨 처음 로딩될때 -> 선택된 장소가 없을때는 모든 마커를 그림
  if (typeof placeData !== "undefined" && place == '') {

    for (let i = 0; i < placeData.length; i++) {

      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(placeData[i].y, placeData[i].x)
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + placeData[i].place_name + '</div>');
        infowindow.open(map, marker);
      });
    }

  }

  else {

    // 마커를 생성하고 지도에 표시합니다
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x)
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.open(map, marker);
    });

  }



  // 새로 검색어 들어왔을때
  useEffect(() => {

    // place 값 초기화 -> 모든 마커 그림 
    contextDispatch({ type: "CHANGE", value: '' });

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(container, options);

    setMap(map);
  }, [props.placeData])


  // 리스트 중 클릭했을때 -> 맵 초기화시켜줘야함
  useEffect(() => {

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(container, options);
    setMap(map);
  }, [place])






  return (
    <div className="map">
      <div id="map" style={{ width: "auto", height: "600px" }} ></div>
    </div>
  )
}

export default Location;