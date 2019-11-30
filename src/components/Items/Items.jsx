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

        // handleTypeAhead(theKeyCode);

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

        // Activate Item
        if (itemToActivate) {
            selectActions.itemActiveSet(itemToActivate, dispatch);
        }

        return nextItem;

    };

    /*===================================
    || 
    || TypeAhead - select element in
            setTimeout(typeAheadFocus, 600); list based on user typing succession of alpha/numeric keystrokes
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
                // always compare to start of string so that if someone types 'N' it goes to Novermber, not January.
                const displayTextChopped = item.displayText.toLowerCase().substr(0, stringLength);
                return (displayTextChopped === typeAheadTypedRef.current);
            });

            if (itemToActivate) {
                selectActions.itemActiveSet(itemToActivate, dispatch);
            }

            setTypeAheadTyped('');
            setTypeAheadPhase('listening');
        }
    }, [typeAheadPhase]);


    return (
        <ItemsStyled>
            <ul
                ref={ itemsRef }
                className={ theClassName }
                role={ 'listbox' }
                tabIndex={ '0' }
                aria-activedescendant={ (selectState.itemActive.id) ? `listitem_id_${selectState.itemActive.id}` : null }
                onKeyDown={ handleMenuKeyDown }
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