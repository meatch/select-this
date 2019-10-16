import React, { useContext, useState, useEffect,useRef } from 'react';
import SelectContext from '../js/SelectContext';
import { Actions } from '../js/selectActions';
import ListItem from './ListItem';
import keycode from 'keycode';

const Menu = React.forwardRef((props, menuRef) => {

    const { selectState, dispatch } = useContext(SelectContext);

    const isItemSelected = (item, itemsSelected) => {
        return itemsSelected.find((selectedItem) => {
            return (item.displayText === selectedItem.displayText);
        });
    };

    const handleMenuListFocus = (direction) => {
        const menuList = menuRef.current;
        let currentItem = menuList.querySelector('.hasFocus');
        let nextItem;

        if (!currentItem) {
            // select first list item in menu
            nextItem = menuList.querySelector('li');
        } else {
            currentItem.classList.remove('hasFocus');

            if (direction === 'next') {
                nextItem = currentItem.nextSibling ? currentItem.nextSibling : currentItem;
            } else {
                nextItem = currentItem.previousSibling ? currentItem.previousSibling : currentItem;
            }
        }

        // get item from our internal array
        const uID = nextItem.dataset.uid;

        // console.log('DOM uid Dataset is undefined?', uID, nextItem);

        let activeItem = false;

        selectState.items.forEach(item => {

            (item.subItems) && item.subItems.forEach((subItem, subIdx) => {
                if (subItem.uID.toString() === uID.toString()) {
                    activeItem = subItem;
                }
            });

            if (item.uID.toString() === uID.toString()) {
                activeItem = item;
            }
        });

        // // Focus chosen item
        if (activeItem) {
            dispatch({type: Actions.FOCUS_ITEM_UPDATE, item: activeItem});
        } else {
            console.error('Could not find uid in DOM list', currentItem, selectState.items);
        }

        return nextItem;

    };
    
    /*---------------------------
    | TypeAhead - select element in
                setTimeout(typeAheadFocus, 600); list based on user typing succession of alpha/numeric keystrokes
    ------------------------useRef---*/
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

            const itemToFocus = selectState.items.find((item) => {
                // always compare to start of string so that if someone types 'N' it goes to Novermber, not January.
                const displayTextChopped = item.displayText.toLowerCase().substr(0, stringLength);
                return (displayTextChopped === typeAheadTypedRef.current);
            });

            if (itemToFocus) {
                dispatch({type: Actions.FOCUS_ITEM_UPDATE, item: itemToFocus});
            }

            setTypeAheadTyped('');
            setTypeAheadPhase('listening');
        }
    }, [typeAheadPhase]);

    const handleMenuKeyDown = (event) => {

        const theKeyCode = keycode(event);

        handleTypeAhead(theKeyCode);

        if (theKeyCode === 'tab' && selectState.selectType === 'Single') {
            event.preventDefault();
            event.stopPropagation();
            dispatch({type: Actions.SHOW_MODAL, showModal:false});
            return;
        }

        switch(theKeyCode) {
            case 'up':
            case 'left':
                event.stopPropagation();
                handleMenuListFocus('previous');
                break;
            case 'right':
            case 'down':
            case 'i':
                event.preventDefault();
                event.stopPropagation();
                handleMenuListFocus('next');
                break;
            default:
                return;
        }
    };

    const itemAdd = (item) => {
        const itemsSelectedCount = selectState.itemsSelected.length;
        const isMax = (selectState.selectRange.max <= itemsSelectedCount);

        // If you can only select 1 item ---> 1) add/replace item and 2) close menu
        if (selectState.selectType === 'Single') {
            (selectState.itemsSelected[0]) && dispatch({type: Actions.ITEM_REMOVE, item: selectState.itemsSelected[0]});
            dispatch({type: Actions.ITEM_ADD, item});
            dispatch({type: Actions.SHOW_MODAL, showModal:false});

        } else if (!isMax && item.selectable) {
            dispatch({type: Actions.ITEM_ADD, item});
            dispatch({type: Actions.FOCUS_ITEM_UPDATE, item});
        }
    };

    const itemRemove = (item) => {
        const itemsSelectedCount = selectState.itemsSelected.length;
        const isMin = (selectState.selectRange.min >= itemsSelectedCount);

        // Make sure we have not reached our minimum selected requirements.
        if (!isMin) {
            dispatch({type: Actions.ITEM_REMOVE, item});
            (selectState.selectType === 'Single')
                ? dispatch({type: Actions.SHOW_MODAL, showModal:false})
                : dispatch({type: Actions.FOCUS_ITEM_UPDATE, item});
        }
    };

    const handleItemSelect = (item) => {
        const isSelected = isItemSelected(item, selectState.itemsSelected);

        // Adding, or subtracting?
        if (isSelected) {
            itemRemove(item);
        } else {
            itemAdd(item);
        }
    };

    return (
        <ul
            ref={ menuRef }
            role={ 'listbox' }
            tabIndex={ '0' }
            onKeyDown={ handleMenuKeyDown }
            className={ 'menuList' }
            aria-labelledby={ selectState.id }
            aria-activedescendant={ ( selectState.focusedItem.uID) ? `${selectState.id}_${selectState.focusedItem.uID}` : null }
        >
            {
                selectState.items.map((item, idx) => {
                    let isSelected = isItemSelected(item, selectState.itemsSelected);
                    const thisListItems = [];

                    item.hasChildren = !!item.subItems;
                    thisListItems.push(<ListItem isSelected={ isSelected } key={ `item-${idx}` } item={ item } idx={ idx } handleItemSelect={ handleItemSelect } />);

                    // add submenu items if it has it.
                    if (item.hasChildren)
                    {
                        item.subItems.forEach((subitem, idx2) => {
                            isSelected = isItemSelected(subitem, selectState.itemsSelected);
                            thisListItems.push(<ListItem isSelected={ isSelected } key={ `subitem-${idx}-${idx2}` } className={ 'subitem' } item={ subitem } idx={ idx2 } handleItemSelect={ handleItemSelect } />);
                        });
                    }

                    return thisListItems;
                })
            }
        </ul>
    );
});

export { Menu as default };