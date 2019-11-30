import React, { useContext } from 'react';
import selectContext from '../../context/selectContext';
import * as selectActions from '../../context/selectActions';
import styled from "@emotion/styled";
import { colors, fonts } from '../../styles';

import classnames from 'classnames';
import keycode from 'keycode';

const Item = ({item}) => {

    const { selectState, dispatch } = useContext(selectContext);

    const tier = (item.tier) ? item.tier : 'tier1';
    const isSelected = (item.selected) ? !!item.selected : false;
    const selectable = (item.selectable) ? !!item.selectable : true;
    const isActive = (selectState.itemActive.id === item.id);

    /*---------------------------
    | Item Handlers
    ---------------------------*/
    const itemClick = () => {
        selectActions.itemClick(item, selectState, dispatch);
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
        'isActive': isActive,
    });

    /*---------------------------
    | Used as reference to aria-activedescendant in UL root for ADA
    ---------------------------*/
    const itemUniqueIDKey = `listitem_id_${item.id}`;

    return (
        <ItemStyled
            id={ itemUniqueIDKey }
            className={ theItemClassName }

            role={ 'option' }
            aria-selected={ isSelected }
            tabIndex={ -1 }

            data-id={ item.id }
            data-value={ item.value }
            
            onClick={ itemClick }
            onKeyDown={ itemKeyDown }

        >
            { item.displayText }
        </ItemStyled>
    );
}

export default Item;

/*---------------------------
| Styles
---------------------------*/
const ItemStyled = styled.li`
    font-family: ${fonts.primary};
    color: ${colors.neutral.mid};
    
    font-size: 13px;
    line-height: 28px;

    list-style-type: none;
    position: relative;
    cursor: pointer;

    display: block;
    padding-left: 16px;

    &.isSelectable {
        &:hover, &:active {
            color: ${colors.neutral.dark};
            background-color: ${colors.neutral.mid};
            outline: none;
        }
    }

    &.tier2 {
        font-weight: normal;
        padding-left: 32px;
    }

    &.isSelected {
        color: ${colors.white};
        background-color: ${colors.hue.semiDark};
        &:hover, &:active {
            color: ${colors.white};
            background-color: ${colors.hue.dark};
        }
    }
    &.isActive {
        outline: dashed 1px red;
    }

    &.hasChildren {
        font-weight: bold;
    }
`;