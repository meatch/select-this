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
        <ItemsStyled>
            <ul
                ref={ itemsRef }
                className={ theClassName }
                role={ 'listbox' }
                tabIndex={ '0' }
                aria-activedescendant={ ( selectState.focusedItem.id) ? `listitem_id_${selectState.focusedItem.id}` : null }
            >
                {
                    selectState.items.map((item, idx) => {
                        return <Item key={ idx } item={ item } />
                    })
                }
            </ul>
        </ItemsStyled>
    );
});

export default Items;

/*---------------------------
| Styles
---------------------------*/
const ItemsStyled = styled.div`
    ul {
        margin: 0;
        padding: 10px 0px;
    }
`;