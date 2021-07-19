import React, { useReducer } from "react";

// context를 생성한 후 export 한다
export const Context = React.createContext();

// state의 초기 값을 설정한다
const initialState = {
    place: '',
    visablestatus: {
        visable: true,
        url: ''
    },
    position: {
        lat: '',
        lng: ''
    }
};


// reducer는 action에서 받은 type에 따라서 state를 변경한다.
const reducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                place: action.value,
            };

        case "CHANGEVISABLE":
            return {
                ...state,
                visablestatus: action.visablestatus,
            };

        case "SETPOSITION":
            return {
                ...state,
                position: action.position,
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
            value={{ place: state.place, visablestatus: state.visablestatus, position: state.position,  contextDispatch }}
        >
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;