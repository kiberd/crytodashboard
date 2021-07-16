import React, { useState, useEffect } from 'react'
import 'bulma/css/bulma.min.css';
import './NavBar.css'


import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function FuturesPrices() {






  return (

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
        <input class="input" type="text" placeholder="검색어 입력"></input>
      </div>
      <div class="column is-1">
        <a class="button is-primary">검색</a>
      </div>
    </div>

  );
}


export default FuturesPrices



