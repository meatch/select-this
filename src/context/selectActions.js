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

export const itemsClear = (items, dispatch) => {

    const newItems = items.map((item) => {
        item.selected = false;
        return item;
    });

    dispatch({
        type: actionTypes.ITEMS_SET,
        items: newItems,
    });

    renderButtonDisplayText(dispatch);
}

export const itemClick = (item, selectState, dispatch) => {
    const selectable = (typeof(item.selectable) !== 'undefined') ? item.selectable : true;
    const isSelectSingle = selectState.originalProps.selectType === 'SelectSingle';

    if (selectable) {
        item.selected = !item.selected;

        let canUpdate = false;
        
        if (item.selected && !selectState.reachedMax)  { canUpdate = true; } // If adding
        if (!item.selected && !selectState.reachedMin) { canUpdate = true; } // If subtracting
        
        if (canUpdate) {
            const items = selectState.items.map((selectStateItem) => {
                if (selectStateItem.id === item.id) {
                    return item;
                }
                
                // If single, replacement is welcome, so deselect all other items
                if (isSelectSingle) {
                    selectStateItem.selected = false;
                }

                return selectStateItem;
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
export const itemActiveSet = (itemActive, dispatch) => {
    dispatch({
        type: actionTypes.ITEM_ACTIVE_SET,
        itemActive: itemActive,
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