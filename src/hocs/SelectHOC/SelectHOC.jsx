import React, { useEffect, useRef, useReducer } from 'react';
import selectContext from '../../context/selectContext';
import selectReducer from '../../context/selectReducer';
import keycode from 'keycode';

const SelectHOC = (WrappedComponent) => {
    return (...props) => {
        
        const defaultState = {
            items: ['Fruity pebbles'],
        };

        const [ selectState, dispatch ] = useReducer(selectReducer, defaultState);

        return (
                <selectContext.Provider value={ { selectState, dispatch } }>
                    <WrappedComponent { ...props } />
                </selectContext.Provider>
        );
    }
}

export default SelectHOC;