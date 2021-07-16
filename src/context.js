import React, { useReducer } from "react";

// context를 생성한 후 export 한다
export const Context = React.createContext();

// state의 초기 값을 설정한다
const initialState = {
    place: '',
    markers: []
};


// reducer는 action에서 받은 type에 따라서 state를 변경한다.
const reducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state, //현재 state가 하나뿐이라 생략해도 된다. 두개 이상일 경우 변경하지 않은 state를 유지하기 위해 사용한다
                place: action.value, // action.value에서 value는 추후 component에서 dispatch 할 때 payload로 보내주는 값의 이름이다.
            };

        case "ADDMARKER":
            return {
                ...state, //현재 state가 하나뿐이라 생략해도 된다. 두개 이상일 경우 변경하지 않은 state를 유지하기 위해 사용한다
                markers: action.value, // action.value에서 value는 추후 component에서 dispatch 할 때 payload로 보내주는 값의 이름이다.
            };

        default:
            throw new Error();
    }
};



const ContextProvider = ({ children }) => {
    // useReducer를 사용해서 state와 dispatch를 생성한다.
    const [state, contextDispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider
            //provider에 value props로 state와 dispatch를 내려준다.
            value={{ place: state.place, contextDispatch }}
        >
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;