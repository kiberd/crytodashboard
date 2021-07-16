/*global kakao*/
import React, { useEffect, useState } from 'react'
import './Location.css'

const Location = (props) => {

  const [map, setMap] = useState();

  // 지도 범위 재설정
  const bounds = props.bounds;
  const placeData = props.placeData;

  // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  if (typeof bounds !== "undefined") {
    map.setBounds(bounds);
  }

  if (typeof placeData !== "undefined") {

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







  useEffect(() => {

    // 최초 map setting
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(container, options);
    setMap(map);
  }, [])


  return (
    <div className="map">
      <div id="map" style={{ width: "auto", height: "600px" }} ></div>
    </div>
  )
}

export default Location;