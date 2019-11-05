import React, { useContext } from 'react';
import selectContext from '../../context/selectContext';
import styled from "@emotion/styled";
import classnames from 'classnames';
import MenuModal from '../MenuModal/MenuModal';

const MenuModalWrapper = React.forwardRef((props, menuRef) => {
    
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
            {
                selectState.modalIsOpen &&
                <MenuModal ref={ menuRef }>
                    {props.children}
                </MenuModal>
            }
        </div>
    );
});

export default MenuModalWrapper;