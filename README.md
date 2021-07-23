## 카카오맵 API 를 이용한 키워드 검색 페이지 (www.kiberd.site)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

* 카카오 맵 api 기능 중 키워드 검색 기능을 활용한 간단 검색 페이지
* 검색 결과 탭 클릭시 해당 장소로 맵 이동 및 마커 표시
* 각 마커 클릭 시, 각 장소의 세부 정보를 볼 수 있음
* 길찾기 클릭 시, 현재위치에서 해당 탭까지의 길찾기 결과 표시
* 단 길찾기는 api를 제공하지 않고, url 서비스만 제공하여서 iframe 형식으로 오픈

***

* **개발환경** 

  - *Frontend* :  ReactJS + Bulma
  - *Hosting* : AWS EC2 + Nginx 를 이용한 

*** 

* **사용기술** 

  - React Hooks (useState, useRef, useEffect, useContext)
  - ContextAPI 를 이용한 전역값 (현재위치, 화면전환을 위한 flag, 선택된장소 등) 제어



