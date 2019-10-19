import { actionTypes } from './selectActionTypes';

const selectReducer = (selectState, action) => {
    switch(action.type) {

        /*---------------------------
        | modalIsOpen
        ---------------------------*/
        case actionTypes.SHOW_MODAL: {

            const modalHasOpened = (!selectState.modalHasOpened && action.showModal) ? true: selectState.modalHasOpened;

            return {
                ...selectState,
                modalIsOpen: action.showModal,
                modalHasOpened: modalHasOpened,
            };
        }

        // Updates error state
        case actionTypes.UPDATE_ERRORS: {
            return {
                ...selectState,
                errors: action.errors,
            };
        }

        // Update default items
        case actionTypes.UPDATE_ITEMS: {
            return {
                ...selectState,
                items: action.items,
            };
        }

        /*---------------------------
        | Selected Items
        ---------------------------*/
        case actionTypes.ITEM_ADD: {
            const itemsSelected = [...selectState.itemsSelected];
            itemsSelected.push(action.item);

            return {
                ...selectState,
                itemsSelected,
            };
        }
        case actionTypes.ITEM_REMOVE: {
            const itemsSelected = [...selectState.itemsSelected.filter(selItem =>  (selItem.value !== action.item.value))];

            return {
                ...selectState,
                itemsSelected,
            };

        }
        case actionTypes.ITEMS_CLEAR: {
            return {
                ...selectState,
                itemsSelected: [],
            };
        }
        case actionTypes.ITEMS_REPLACE: {
            return {
                ...selectState,
                itemsSelected: action.itemsSelected,
            };
        }

        /*---------------------------
        | Item to Focus - based on last selected or deselected item
        ---------------------------*/
        case actionTypes.FOCUS_ITEM_UPDATE: {

            const focusedItem = {
                uID: action.item.uID,
                item: action.item,
            };

            return {
                ...selectState,
                focusedItem,
            };
        }

        /*---------------------------
        | Saved State for Major Undo if they reject their choices
        ---------------------------*/
        case actionTypes.UNDO_RESTORE: {
            return {
                ...selectState,
                itemsSelected: [...selectState.itemsSelectedSaved],
            };
        }
        case actionTypes.UNDO_SAVE_ITEMS: {
            return {
                ...selectState,
                itemsSelectedSaved: [...selectState.itemsSelected],
            };
        }

        default: {
            return selectState;
        }
    }
};

export { selectReducer as default };