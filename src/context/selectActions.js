import { actionTypes } from './selectActionTypes';
import * as Helpers from '../utilities/helpers';

/*---------------------------
| selectState.items
---------------------------*/
// Initialize, Replace or Restore Items
export const itemsSet = (items, dispatch) => {
    dispatch({
        type: actionTypes.ITEMS_SET,
        items: JSON.parse(JSON.stringify(items)),
    });
    // Whenever Items are set or replace, we also need to save the current state of items.
    itemsSave(items, dispatch);

    renderButtonDisplayText(dispatch);
}

export const itemsSave = (items, dispatch) => {
    dispatch({
        type: actionTypes.ITEMS_SAVE,
        itemsSaved: JSON.parse(JSON.stringify(items)),
    });

    renderButtonDisplayText(dispatch);
}

export const itemsRestore = (itemsSaved, dispatch) => {
    dispatch({
        type: actionTypes.ITEMS_SET,
        items: JSON.parse(JSON.stringify(itemsSaved)),
    });

    renderButtonDisplayText(dispatch);
}

export const itemsReset = (dispatch) => {
    dispatch({ type: actionTypes.ITEMS_RESET });
    renderButtonDisplayText(dispatch);
}

export const itemClick = (item, selectState, dispatch) => {
    const isSelectSingle = selectState.originalProps.selectType === 'SelectSingle';
    const selectable = (typeof(item.selectable) !== 'undefined') ? item.selectable : true;
    const anyOrAll = (typeof(item.anyOrAll) !== 'undefined') ? item.anyOrAll : false;

    const evaluateItem = (theItem) => {
        const isItemClicked = theItem.id === item.id;
        
        if (isItemClicked) {
            theItem.selected = !theItem.selected;
        } else if (isSelectSingle || anyOrAll || theItem.anyOrAll) {
            // If single, replacement is welcome, so deselect all other items
            // OR if anyOrAll, use as a clearing to other items selected.
            // OR we have selected a non anyOrAll, and this item if anyOrAll should be deselected.
            theItem.selected = false;
        }

        return theItem;
    }

    if (selectable) {
        // Let's assume we cannot update
        let canUpdate = false;
        
        if (!item.selected && !selectState.reachedMax) { canUpdate = true; } // If adding
        if (item.selected && !selectState.reachedMin) { canUpdate = true; } // If subtracting
        if (anyOrAll) { canUpdate = true; } // If used to clear, and offer no filters. Any or All options.

        console.log('Can Update', canUpdate, item.selected, selectState.reachedMax, selectState.reachedMin, anyOrAll);
        
        if (canUpdate) {
            // Map to clone, so we manage pure state
            const items = selectState.items.map((selectStateItem) => {

                // Need to include subitems too if they exist
                if (selectStateItem.subItems) {
                    const newSubItems = selectStateItem.subItems.map((subItem) => {
                        return evaluateItem(subItem);
                    });

                    selectStateItem.subItems = newSubItems;
                }

                return evaluateItem(selectStateItem);

            });

            // Have we reached max or min?
            const currentSelected = Helpers.getSelectedItems(items);
            const currentSelectedCount = currentSelected.length;

            dispatch({
                type: actionTypes.ITEMS_UPDATE,
                items: items,
                reachedMax: (!isSelectSingle && currentSelectedCount >= selectState.originalProps.selectRange.max),
                reachedMin: (!isSelectSingle && currentSelectedCount <= selectState.originalProps.selectRange.min),
            });

            // if single close menu
            if (selectState.originalProps.selectType === 'SelectSingle') {
                setModalOpenState(false, dispatch);
            }

            renderButtonDisplayText(dispatch);
        }
    }
}

/*---------------------------
| selectState.itemActive
---------------------------*/
export const itemActiveSet = (item, domID, dispatch) => {
    dispatch({
        type: actionTypes.ITEM_ACTIVE_SET,
        itemActive: {
            item: item,
            domID: domID,
        }
    });
}

/*---------------------------
| selectState.modalIsOpen
---------------------------*/
export const setModalOpenState = (modalIsOpen, dispatch) => {
    dispatch({
        type: actionTypes.MODAL_SHOW,
        modalIsOpen: modalIsOpen,
    });
}

/*---------------------------
| selectState.buttonDisplayText
---------------------------*/
export const renderButtonDisplayText = (dispatch) => {
    dispatch({
        type: actionTypes.BUTTON_DISPLAY_TEXT_SET,
    });
}