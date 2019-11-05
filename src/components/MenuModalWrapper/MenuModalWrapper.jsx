import React, { useContext } from 'react';
import selectContext from '../../context/selectContext';
import styled from "@emotion/styled";
import classnames from 'classnames';

const MenuModalWrapper = (props) => {
    
    const { selectState, dispatch } = useContext(selectContext);

    const theClassName = classnames({
        'MenuModalWrapper': true,
    });

    return (
        <div
            id={ props.menuModalId }
            className={ theClassName }
            hidden={ !selectState.modalIsOpen }
        >
            {props.children}
        </div>
    );
}

export default MenuModalWrapper;