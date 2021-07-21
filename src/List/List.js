/*global kakao*/
import React, { useContext } from 'react'

import 'bulma/css/bulma.min.css';
import './List.css'
import { Context } from "../context";

const List = (props) => {

    const result = props.resultData;
    const { myposition, contextDispatch } = useContext(Context);

    const getDirection = (data) => {


        if (myposition.lat === '') {
            alert('내 위치를 찾을 수 없습니다! 출발지를 입력해 주세요.');
            const directionUrl = 'https://map.kakao.com/link/to/' + data.id ;
            contextDispatch({ type: "CHANGEVISABLEROUTE", visablestatusroute: { visable: true, url: directionUrl } });
        }

        else {

            const geocoder = new kakao.maps.services.Geocoder();
            const coord = new kakao.maps.LatLng(myposition.lat, myposition.lng);
    
            const callback = function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    const directionUrl = 'https://map.kakao.com/?sName=' + result[0].address.address_name + '&eName=' + data.place_name;
                    contextDispatch({ type: "CHANGEVISABLEROUTE", visablestatusroute: { visable: true, url: directionUrl } });
                }
            };
            geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

        }




    }

    if (typeof result === 'undefined') {
        return (
            <div>키워드를 입력해 주세요</div>
        );
    }

    else {
        return (
            <>
                {
                    result.map((data) => (
                        <>
                            
                            <div className="list">
                                <a class="card" onClick={() => contextDispatch({ type: "CHANGESELECTEDPLACE", value: data })} >
                                    <div class="card-content">
                                        <div class="media">
                                            <div class="media-content">
                                                <p class="title is-4">{data.place_name}</p>
                                                <p class="subtitle is-6">{data.address_name}</p>
                                            </div>
                                        </div>
                                        <a class="button is-info" onClick={() => getDirection(data)} >길찾기</a>
                                    </div>
                                </a>
                            </div>
                            <hr></hr>
                        </>
                    ))
                }
            </>
        );
    }
}

export default List;