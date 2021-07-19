/*global kakao*/
import React, { useContext, useEffect, useState, useRef } from 'react'
import './Location.css'
import { Context } from "../context";

const Location = (props) => {


  const containerRef = useRef(null);

  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);
  const { place, position, visablestatus, contextDispatch } = useContext(Context);


  // 지도 범위 재설정
  const bounds = props.bounds;
  const placeData = props.placeData;



  // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });



  // 마커를 생성하고 지도위에 표시하는 함수
  function addMarker(position, index) {

    // 마커를 생성
    const marker = new kakao.maps.Marker({
      position: position
    });

    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow, index));
    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

    // 마커가 지도 위에 표시되도록 설정
    marker.setMap(map);
    let newMarker = markers;
    newMarker.push(marker);
    setMarkers(newMarker);

  }

  // 인포윈도우를 표시하는 클로저를 만드는 함수
  function makeOverListener(map, marker, infowindow, index) {
    return function () {
      if (index) {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + placeData[index].place_name + '<br>자세한 내용은 클릭!</div>');
      }
      else {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '<br>자세한 내용은 클릭!</div>');
      }

      infowindow.open(map, marker);
    };
  }

  // 인포윈도우를 닫는 클로저를 만드는 함수
  function makeOutListener(infowindow) {
    return function () {
      infowindow.close();
    };
  }



  // 배열에 추가된 마커들을 지도에 표시하거나 삭제
  const setMarkersMap = (map) => {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }


  // 최초 로딩 -> map 설정
  useEffect(() => {

    alert('초기');

    const container = containerRef.current;
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };


    // 완전 초기 로딩
    if (typeof map === 'undefined' && typeof placeData === 'undefined') {
      const map = new kakao.maps.Map(container, options);
      setMap(map);
    }




  }, [])


  // 새로 검색어 들어왔을때
  useEffect(() => {

    alert('검색어');
    console.log()

    // place 값 초기화 -> 모든 마커 그림 
    contextDispatch({ type: "CHANGE", value: '' });

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정
    if (typeof map !== 'undefined' && typeof bounds !== 'undefined') {
      map.setBounds(bounds);
    }

    // 맨 처음 로딩될때 -> 선택된 장소가 없을때는 모든 마커를 그림
    if (typeof map !== 'undefined' && typeof placeData !== 'undefined') {
      setMarkersMap(null);
      for (let i = 0; i < placeData.length; i++) {
        const position = new kakao.maps.LatLng(placeData[i].y, placeData[i].x);
        addMarker(position, i);
      }
    }

  }, [props.placeData])


  // 리스트 중 클릭했을때
  useEffect(() => {

    if (typeof map !== 'undefined' && place !== '') {


      setMarkersMap(null);
      const moveLatLon = new kakao.maps.LatLng(place.y, place.x);
      map.panTo(moveLatLon);

      const position = new kakao.maps.LatLng(place.y, place.x);
      addMarker(position);
    }


  }, [place])

  // 내 위치 가져오기 클릭시
  useEffect(() => {

    alert('vi');
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정
    if (typeof map !== 'undefined' && typeof bounds !== 'undefined') {
      map.setBounds(bounds);
    }





  }, [visablestatus])


  return (
    <div className="map">
      <div ref={containerRef} id="map" style={{ width: "auto", height: "600px" }} ></div>
    </div>
  )
}

export default Location;