import React from 'react';
import selectContext from '../../context/selectContext';
import classnames from 'classnames';
import keycode from 'keycode';


const SelectHOC = (WrappedComponent) => {

    return (
        <selectContext.Provider value={ { selectState, dispatch } }>
            SelectHOC
            <WrappedComponent { ...props } />
        </selectContext.Provider>
    );
}

export default SelectHOC;