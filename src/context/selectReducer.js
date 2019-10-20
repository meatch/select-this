import { actionTypes } from './selectActionTypes';

const selectReducer = (selectState, action) => {
    switch(action.type) {

        case (actionTypes.ITEM_UPDATE): {
            // replace item with updated item
            const items = selectState.items.map(item => {
                if (item.uID === action.item.uID) {
                    return action.item;
                }
                return item;
            });

            return {
                ...selectState,
                items: items,
            };
        }
        default: {
            return selectState;
        }
    }
};

export default selectReducer;