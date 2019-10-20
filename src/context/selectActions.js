import { actionTypes } from './selectActionTypes';

export const itemClick = (item, dispatch) => {

    const selectable = (item.selectable) ? !!item.selectable : true;

    if (selectable) {
        item.selected = !item.selected;
        
        dispatch({
            type: actionTypes.ITEM_UPDATE,
            item: item
        });
    }
}