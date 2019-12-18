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

export const itemsClear = (dispatch) => {
    dispatch({ type: actionTypes.ITEMS_CLEAR });
    renderButtonDisplayText(dispatch);
}

export const itemClick = (item, selectState, dispatch) => {
    const selectable = (typeof(item.selectable) !== 'undefined') ? item.selectable : true;
    const anyOrAll = (typeof(item.anyOrAll) !== 'undefined') ? item.anyOrAll : false;
    const isSelectSingle = selectState.originalProps.selectType === 'SelectSingle';

    let items = [];

    const evaluateItem = (theItem) => {
        const isNotThisItem = theItem.id !== item.id;
        // If single, replacement is welcome, so deselect all other items
        // OR if anyOrAll, use as a clearing to other items selected.
        // OR we have selected a non anyOrAll, and this item if anyOrAll should be deselected.
        if (isNotThisItem && (isSelectSingle || anyOrAll || theItem.anyOrAll)) {
            theItem.selected = false;
        }
    }

    if (selectable) {
        item.selected = !item.selected;

        let canUpdate = false;
        
        if (item.selected && !selectState.reachedMax)  { canUpdate = true; } // If adding
        if (!item.selected && !selectState.reachedMin) { canUpdate = true; } // If subtracting
        if (anyOrAll) { canUpdate = true; } // If used to clear, and offer no filters. Any or All options.
        
        if (canUpdate) {
            
            // Cannot ma, as we also need to evaluate subitems.
            selectState.items.forEach((selectStateItem) => {
                evaluateItem(selectStateItem);

                // Need to include subitems too.
                (selectStateItem.subItems) && selectStateItem.subItems.forEach((subItem) => {
                    evaluateItem(subItem);
                });

                items.push(selectStateItem);

            });

            // Have we reached max or min?
            const currentSelected = Helpers.getSelectedItems(selectState.items);
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