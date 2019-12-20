import React, { useState, useContext } from 'react';
import selectContext from '../../context/selectContext';
import * as selectActions from '../../context/selectActions';
import styled from "@emotion/styled";
import { colors, fonts } from '../../SelectThisStyles';
import classnames from 'classnames';
import _uniqueId from 'lodash/uniqueId';

const Item = ({tier, item}) => {

    const { selectState, dispatch } = useContext(selectContext);
    const [id] = useState(_uniqueId('listitem-'));

    const isSelected = (item.selected) ? !!item.selected : false;
    const selectable = (item.selectable) ? !!item.selectable : true;
    const isActive = (selectState.itemActive.item.id === item.id);

    /*---------------------------
    | Item Handlers
    ---------------------------*/
    const itemClick = () => {
        console.log('itemClick', item, selectState, dispatch);
        selectActions.itemClick(item, selectState, dispatch);
    }

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

    return (
        <ItemStyled
            id={ id }
            className={ theItemClassName }

            role={ 'option' }
            aria-selected={ isSelected }
            tabIndex={ -1 }

            data-id={ item.id }
            data-value={ item.value }
            
            onClick={ itemClick }

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

    &.child {
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