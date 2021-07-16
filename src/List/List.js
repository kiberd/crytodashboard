/*global kakao*/
import React, { useEffect, useState } from 'react'

import 'bulma/css/bulma.min.css';
import './List.css'

const List = (props) => {

    const result = props.resultData;

 


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
                                <a class="card">
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