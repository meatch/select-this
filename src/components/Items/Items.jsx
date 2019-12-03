import React, { useContext, useState, useEffect, useRef } from 'react';
import selectContext from '../../context/selectContext';
import styled from "@emotion/styled";
import classnames from 'classnames';
import Item from '../Item/Item.jsx';
import keycode from 'keycode';
import * as selectActions from '../../context/selectActions';
import * as Helpers from '../../utilities/helpers';

const Items = React.forwardRef((props, itemsRef) => {

    const { selectState, dispatch } = useContext(selectContext);

    const theClassName = classnames({
        'Items': true,
    });

    const handleMenuKeyDown = (event) => {

        const theKeyCode = keycode(event);

        handleTypeAhead(theKeyCode);

        if (theKeyCode === 'tab' && selectState.originalProps.selectType === 'SelectSingle') {
            event.preventDefault();
            event.stopPropagation();
            selectActions.setModalOpenState(false, dispatch);
            return;
        }

        switch(theKeyCode) {
            case 'up':
            case 'left':
                event.stopPropagation();
                handleitemsCurrentFocus('previous');
                break;
            case 'right':
            case 'down':
            case 'i':
                event.preventDefault();
                event.stopPropagation();
                handleitemsCurrentFocus('next');
                break;
            case 'enter':
            case 'space':
                event.preventDefault();
                selectActions.itemClick(selectState.itemActive.item, selectState, dispatch);
                break;
            default:
                return;
        }
    }

    const handleitemsCurrentFocus = (direction='next') => {
        const itemsCurrent = itemsRef.current;
        let currentItem = itemsCurrent.querySelector('.isActive');
        let nextItem;

        if (!currentItem) {
            // select first list item in menu
            nextItem = itemsCurrent.querySelector('li');
        } else {
            if (direction === 'next') {
                nextItem = currentItem.nextSibling ? currentItem.nextSibling : currentItem;
            } else {
                nextItem = currentItem.previousSibling ? currentItem.previousSibling : currentItem;
            }
        }

        // get item from our internal items array based on id
        const itemToActivate = Helpers.getItemToActivateFromDomListItem(selectState.items, nextItem);
        const domID = nextItem.id;

        // Activate Item
        if (itemToActivate) {
            selectActions.itemActiveSet(itemToActivate, domID, dispatch);
        }

        return nextItem;

    };

    /*===================================
    || 
    || TypeAhead - select element in
        setTimeout(typeAheadFocus, 600); list based on user typing succession of alpha/numeric keystrokes
        TODO Move to external method? perhaps custom Hook?
    || 
    ===================================*/
    const [ typeAheadTyped, setTypeAheadTyped ] = useState('');
    const [ typeAheadPhase, setTypeAheadPhase ] = useState('listening');// 'listening, typing, focusing'
    const typeAheadTypedRef = useRef(''); //only way to really handle setTimeout - persisted changes on re-render
    
    const handleTypeAhead = (theKeyCode) => {
        // Convert numpad to numbers remove `numpad ` prefix
        let thisKey = theKeyCode.replace('numpad ', '');

        // should not be special keys (e.g. esc, down)
        const isSingleCharacter = thisKey.length === 1;

        // must be alphanumeric
        const isAlphaNum = thisKey.match(/^[0-9a-zA-Z]+$/);

        if (isSingleCharacter && isAlphaNum) {

            if (typeAheadPhase === 'listening') {
                setTypeAheadPhase('typing');
                setTimeout(typeAheadFocus, 600);
            }
            typeAheadTypedRef.current = typeAheadTyped + thisKey;
            setTypeAheadTyped(typeAheadTypedRef.current);
            
        }
    }
    /*
        Core Timer = setTimeout(typeAheadFocus, 600)
            * takes their input ( alphanumeric `/^[a-z0-9]+$/i` ), finds first element match start of word (e.g. Ala = Alabama), sets Focus
            * clears/resets string
    */
    const typeAheadFocus = () => {
        setTypeAheadPhase('focusing');
    }

    useEffect(() => {
        if (typeAheadPhase === 'focusing') {
            const stringLength = typeAheadTypedRef.current.length;

            const itemToActivate = selectState.items.find((item) => {
                // always compare to start of string so that if someone types 'N' it goes to November, not January.
                const displayText = (typeof item.displayText === 'number') ? item.displayText.toString():item.displayText;
                const displayTextChopped = displayText.toLowerCase().substr(0, stringLength);
                return (displayTextChopped === typeAheadTypedRef.current);
            });

            if (itemToActivate) {
                const itemsCurrent = itemsRef.current;
                const domID = itemsCurrent.querySelector(`li[data-id="${itemToActivate.id}"]`).id;
                selectActions.itemActiveSet(itemToActivate, domID, dispatch);
            }

            setTypeAheadTyped('');
            setTypeAheadPhase('listening');
        }
    }, [typeAheadPhase]);

    const renderItems = () => {
        const itemsJSX = [];

        selectState.items.forEach((item, idx) => {
            itemsJSX.push(<Item key={ idx } tier='parent' item={ item } />);

            if (item.subItems) {
                item.subItems.forEach((subItem, subIdx) => {
                    itemsJSX.push(<Item key={ `${idx}-${subIdx}` } tier='child' item={ subItem } />);
                });
            }

        });

        return itemsJSX;
    }

    return (
        <ItemsStyled>
            <ul
                ref={ itemsRef }
                className={ theClassName }
                role={ 'listbox' }
                tabIndex={ '0' }
                aria-activedescendant={ (selectState.itemActive.domID) ? selectState.itemActive.domID : null }
                onKeyDown={ handleMenuKeyDown }
            >
                { renderItems() }
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
        max-height: 200px;
        overflow: hidden;
        overflow-y: auto;

        margin: 0;
        padding: 10px 0px;
    }
`;