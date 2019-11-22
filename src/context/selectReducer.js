import { actionTypes } from './selectActionTypes';

const selectReducer = (selectState, action) => {
    switch(action.type) {

        /*---------------------------
        | selectState.items
        ---------------------------*/
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

        /*---------------------------
        | selectState.modalIsOpen
        ---------------------------*/
        case (actionTypes.MODAL_SHOW): {
            return {
                ...selectState,
                modalIsOpen: action.modalIsOpen,
            };
        }

        /*---------------------------
        | selectState.buttonDisplayText
        ---------------------------*/
        case (actionTypes.BUTTON_DISPLAY_TEXT_SET): {
            return {
                ...selectState,
                buttonDisplayText: action.buttonDisplayText,
            };
        }

        /*---------------------------
        | selectState Default
        ---------------------------*/
        default: {
            return selectState;
        }
    }
};

export default selectReducer;