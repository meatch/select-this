import { actionTypes } from './selectActionTypes';

const selectReducer = (selectState, action) => {
    switch(action.type) {

        case (actionTypes.ITEMS_SET): {
            return {
                ...selectState,
                items: action.items,
            };
        }
        case (actionTypes.ITEMS_SAVE): {
            return {
                ...selectState,
                itemsSaved: action.itemsSaved,
            };
        }
        case (actionTypes.ITEMS_UPDATE): {
            return {
                ...selectState,
                items: action.items,
                reachedMax: action.reachedMax,
                reachedMin: action.reachedMin,
            };
        }
        default: {
            return selectState;
        }
    }
};

export default selectReducer;