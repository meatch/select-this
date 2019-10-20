import { actionTypes } from './selectActionTypes';

// Initialize, Replace or Restore Items
export const itemsSet = (items, dispatch) => {
    dispatch({
        type: actionTypes.ITEMS_SET,
        items: JSON.parse(JSON.stringify(items)),
    });
    // Whenever Items are set or replace, we also need to save the current state of items.
    itemsSave(items, dispatch);
}

export const itemsSave = (items, dispatch) => {
    dispatch({
        type: actionTypes.ITEMS_SAVE,
        itemsSaved: JSON.parse(JSON.stringify(items)),
    });
}

export const itemClick = (item, selectState, dispatch) => {

    const selectable = (item.selectable) ? !!item.selectable : true;
    const isSelectSingle = selectState.originalProps.selectType === 'SelectSingle';

    if (selectable) {
        item.selected = !item.selected;

        let canUpdate = false;
        
        if (item.selected && !selectState.reachedMax)  { canUpdate = true; } // If adding
        if (!item.selected && !selectState.reachedMin) { canUpdate = true; } // If subtracting
        
        if (canUpdate) {
            const items = selectState.items.map((selectStateItem) => {
                if (selectStateItem.uID === item.uID) {
                    return item;
                }

                // If single, replacement is welcome, so deselect all other items
                if (isSelectSingle) {
                    selectStateItem.selected = false;
                }

                return selectStateItem;
            });

            // Have we reached max or min?
            const currentSelected = selectState.items.filter((selectStateItem) => {
                return (!!selectStateItem.selected);
            });
            const currentSelectedCount = currentSelected.length;

            dispatch({
                type: actionTypes.ITEMS_UPDATE,
                items: items,
                reachedMax: (!isSelectSingle && currentSelectedCount >= selectState.originalProps.selectRange.max),
                reachedMin: (!isSelectSingle && currentSelectedCount <= selectState.originalProps.selectRange.min),
            });
        }
    }
}