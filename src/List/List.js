/*global kakao*/
import React, { useEffect, useState, useContext } from 'react'

import 'bulma/css/bulma.min.css';
import './List.css'
import { Context } from "../context";

const List = (props) => {

    const result = props.resultData;

    // useContext를 이용하여 import한 Context안의 provider value를 가지고 온다.
    const { place , contextDispatch } = useContext(Context); 


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
                                <a class="card" onClick= {() => contextDispatch({ type: "CHANGE", value: data})} >
                                    <div class="card-content">


                                        <div class="media">

                                            <div class="media-content">
                                                <p class="title is-4">{data.place_name}</p>
                                                <p class="subtitle is-6">{data.address_name}</p>
                                                <a href="data.place_url">{data.place_url}</a>

                                            </div>
                                        </div>


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