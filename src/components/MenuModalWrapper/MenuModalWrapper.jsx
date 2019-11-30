import React, { useContext } from 'react';
import selectContext from '../../context/selectContext';
import classnames from 'classnames';
import MenuModal from '../MenuModal/MenuModal';

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
            {
                selectState.modalIsOpen &&
                <MenuModal>
                    {props.children}
                </MenuModal>
            }
        </div>
    );
};

export default MenuModalWrapper;