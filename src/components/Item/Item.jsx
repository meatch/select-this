import React, { useContext } from 'react';

import selectContext from '../../context/selectContext';
import * as selectActions from '../../context/selectActions';

import classnames from 'classnames';
import keycode from 'keycode';

const Item = ({item}) => {

    const { dispatch } = useContext(selectContext);

    const tier = (item.tier) ? item.tier : 'tier1';
    const isSelected = (item.selected) ? !!item.selected : false;
    const selectable = (item.selectable) ? !!item.selectable : true;

    /*---------------------------
    | Item Handlers
    ---------------------------*/
    const itemClick = () => {
        selectActions.itemClick(item, dispatch);
    }

    const itemKeyDown = (e) => {
        switch(keycode(e)) {
            case 'enter':
            case 'space':
                e.preventDefault();
                itemClick();
                break;
            default:
                return;
        }
    };

    /*---------------------------
    | Class Names
    ---------------------------*/
    const theItemClassName = classnames({
        'Item': true,
        [tier] : true,
        'isSelectable': selectable,
        'isSelected': isSelected,
    })

    /*---------------------------
    | Used as reference to aria-activedescendant in UL root for ADA
    ---------------------------*/
    const itemUniqueIDKey = `listitem_uID_${item.uID}`;

    return (
        <li
            id={ itemUniqueIDKey }
            className={ theItemClassName }

            role={ 'option' }
            aria-selected={ isSelected }
            tabIndex={ -1 }

            data-uid={ item.uID }
            data-value={ item.value }
            
            onClick={ itemClick }
            onKeyDown={ (e) => { itemKeyDown(e); }  }

        >
            { item.displayText }
        </li>
    );
}

export default Item;