import React, { useContext } from 'react';
// import selectContext from '../../context/selectContext';
// import styled from "@emotion/styled";
import classnames from 'classnames';

import Menu from '../Menu/Menu';

const MenuModal = (props) => {
    
    // const { selectState, dispatch } = useContext(selectContext);

    const theClassName = classnames({
        'MenuModal': true,
    });

    return (
        <div className={ theClassName } >
            <Menu>
                {props.children}
            </Menu>
        </div>
    );
};

export default MenuModal;