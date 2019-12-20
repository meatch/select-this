import { actionTypes } from './selectActionTypes';
import * as Helpers from '../utilities/helpers';


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
        case (actionTypes.ITEMS_RESET): {
            return {
                ...selectState,
                items: JSON.parse(JSON.stringify(selectState.itemsOriginal)), // Cloned no refs.
                reachedMax: false,
                reachedMin: false,
            };
        }

        /*---------------------------
        | selectState.itemActive
        ---------------------------*/
        case (actionTypes.ITEM_ACTIVE_SET): {
            return {
                ...selectState,
                itemActive: action.itemActive,
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

            let buttonDisplayText = selectState.buttonDisplayText;
            
            const selectedItems = Helpers.getSelectedItems(selectState.items);
            const itemCount = selectedItems.length;
            
            if (itemCount > 1) {
                buttonDisplayText = `${itemCount} ${selectState.originalProps.multiMessage}`;
            } else if (itemCount === 1) {
                buttonDisplayText = selectedItems[0].displayText;
            } else if (itemCount === 0)  {
                buttonDisplayText = `${selectState.originalProps.buttonDisplayTextDefault}`;
            }

            return {
                ...selectState,
                buttonDisplayText: buttonDisplayText,
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