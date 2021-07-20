/*global kakao*/
import React, { useContext, useEffect, useState, useRef } from 'react'
import './Location.css'
import { Context } from "../context";

const Location = (props) => {

  const containerRef = useRef(null);

  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);
  const { place, myposition, contextDispatch } = useContext(Context);


  const bounds = props.bounds;
  const placeData = props.placeData;


  // Add Maker on map
  const addMarker = (position, index) => {

    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const marker = new kakao.maps.Marker({
      position: position
    });

    kakao.maps.event.addListener(marker, 'click', clickListener(index));
    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow, index));
    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

    // Setmap for marker
    marker.setMap(map);

    // Add marker to markers array
    let newMarker = markers;
    newMarker.push(marker);
    setMarkers(newMarker);

  }

  const addMyPositionMarker = (position) => {

    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
          imageSize = new kakao.maps.Size(32, 35), 
          imageOption = {offset: new kakao.maps.Point(27, 69)}; 
    
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
   
    const marker = new kakao.maps.Marker({
      position: position,
      image: markerImage
    });

    // Setmap for marker
    marker.setMap(map);
  }

  // Click
  const clickListener = (index) => {
    return function () {
      if (index) {
        contextDispatch({ type: "CHANGEVISABLE", visablestatus: { visable: false, url: placeData[index].place_url } });
      }
      else {
        contextDispatch({ type: "CHANGEVISABLE", visablestatus: { visable: false, url: place.place_url } });
      }
    };
  }

  // MouseOver
  const makeOverListener = (map, marker, infowindow, index) => {
    return function () {
      if (index) {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + placeData[index].place_name + '</div>');
      }
      else {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      }
      infowindow.open(map, marker);
    };
  }

  // MouseOut
  const makeOutListener = (infowindow) => {
    return function () {
      infowindow.close();
    };
  }


  // Control markers in map
  const setMarkersMap = (map) => {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // ComponentDidMount -> make map and set
  useEffect(() => {

    const container = containerRef.current;
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 서울시청
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
    setMap(map);
  }, [])


  // ComponentDidUpdate(placeData) -> 검색결과 (15개)
  useEffect(() => {

    // 선택된 place 값 초기화 -> 모든 마커 그림 
    contextDispatch({ type: "CHANGESELECTEDPLACE", value: '' });

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정
    if (typeof map !== 'undefined' && typeof bounds !== 'undefined') {
      map.setBounds(bounds);
    }

    // 선택된 장소가 없을때는 모든 마커를 그림
    if (typeof map !== 'undefined' && typeof placeData !== 'undefined') {
      setMarkersMap(null);
      for (let i = 0; i < placeData.length; i++) {
        const position = new kakao.maps.LatLng(placeData[i].y, placeData[i].x);
        addMarker(position, i);
      }
    }

  }, [placeData])


  // ComponentDidUpdate(place) -> 리스트 중 클릭 했을때
  useEffect(() => {
    if (typeof map !== 'undefined' && place !== '') {
      setMarkersMap(null);
      const position = new kakao.maps.LatLng(place.y, place.x);
      map.panTo(position);
      addMarker(position);
    }
  }, [place])

  // ComponentDidUpdate (myposition)
  useEffect(() => {
    if (typeof map !== 'undefined') {
      const position = new kakao.maps.LatLng(myposition.lat, myposition.lng);
      map.panTo(position);
      addMyPositionMarker(position);
    }
  }, [myposition])


  return (
    <div className="map">
      <div ref={containerRef} id="map" style={{ width: "auto", height: "770px" }} ></div>
    </div>
  )
}

export default Location;