import React, { useContext } from 'react';
import selectContext from '../../context/selectContext';
import styled from "@emotion/styled";
import classnames from 'classnames';
import Item from '../Item/Item.jsx';

const Items = React.forwardRef((props, itemsRef) => {


    const { selectState, dispatch } = useContext(selectContext);

    const theClassName = classnames({
        'Items': true,
    });

    return (
        <ItemsStyled
            ref={ itemsRef }
            className={ theClassName }
            
            role={ 'listbox' }
            tabIndex={ '0' }
            aria-activedescendant={ ( selectState.focusedItem.uID) ? `listitem_uID_${selectState.focusedItem.uID}` : null }
        >
            {
                selectState.items.map((item, idx) => {
                    return <Item key={ idx } item={ item } />
                })
            }
        </ItemsStyled>
    );
});

export default Items;

/*---------------------------
| Styles
---------------------------*/
const ItemsStyled = styled.ul`
    margin: 0;
    padding: 0;
`;