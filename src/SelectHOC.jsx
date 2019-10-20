import React, { useEffect, useRef, useReducer } from 'react';
import selectContext from './context/selectContext';
import selectReducer from './context/selectReducer';
import keycode from 'keycode';
import classnames from 'classnames';

import HiddenInputs from './components/HiddenInputs/HiddenInputs';
import ButtonDisplayText from './components/ButtonDisplayText/ButtonDisplayText';

const SelectHOC = (WrappedComponent, selectType) => {
    return (...props) => {
        
        const defaultState = {
            items: ['Fruity pebbles'],
        };

        const [ selectState, dispatch ] = useReducer(selectReducer, defaultState);

        /*---------------------------
        | Classnames
        ---------------------------*/
        const rootClassName = classnames({
            'SelectThis': true,
            [selectType]: true,
        });
        const menuClassName = classnames({
            'Menu': true,
        });

        return (
            <selectContext.Provider value={ { selectState, dispatch } }>
                <div className={ rootClassName }>
                    <HiddenInputs />
                    <ButtonDisplayText />
                    <div className={ menuClassName }>
                        <WrappedComponent { ...props } />
                    </div>
                </div>
            </selectContext.Provider>
        );
    }
}

export default SelectHOC;