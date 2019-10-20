import { actionTypes } from './selectActionTypes';

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