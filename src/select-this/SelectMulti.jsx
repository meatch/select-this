/**
 * SelectHOC > SelectMulti (Refer to HOC for its shared logic.)
 * @author Mitch Gohman <mitchell.gohman@travelctm.com>
 * @version v2 (Created: 2019-09-17)
 *
 * Required Props
 * @constant {object array} items  [required] Object array of items for the select menu
 *     ${listitem} --> Each object must have the following props
 *          {
 *             @constant {string} displayText: [required] The visual text for the select item
 *             @constant {string|number} value: [required] The value you would like to use (e.g. for form posting)
 *             @constant {string|number} uID: [optional] (defaults to value-hash) Unique Identifier used to distinguish each item, important when multiple items share the same values
 *             @constant {boolean} selectable:[optional] (defaults to true) If true means the user can select the item in the menu (Maybe you want a title that is not selctable)
 *          }
 * @constant {string} inputName name of input key for posting - shows up as hidden input fields (input || input[] for multiple).
 *./SelectHOC
 * Optional Props
 * @constant {method} onSelected returns item selection changes whenever user commits to choices
 * @constant {object|array} setDefaultItems takes ${listitem} or array of ${listitem}s to set default selected
 * @constant {object|array} setSelectedItems takes ${listitem} or array of ${listitem}s to update selected
 * @constant {string} rootClassName adding class for additional CSS and JS targeting
 * @constant {string} id unique ID for aria labelling
 * @constant {string} label aria-label for select menu component [defaults to btnHeroText]
 * @constant {boolean} labelSrOnly hidden from sighted users, for screen reader only.
 * @constant {string} title user firendly title, will override inputname when generating defaults
 * @constant {string} btnHeroText string for the button toggle when no items are selected [falls back to capitalized and spaced inputName ]
 * @constant {string} headerTitle Text displayed in Header of menu modal
 * @constant {string} multiMessage Text displayed in multi select to let the user know how many they have selected [defaults to Items Selected]
 * @constant {string} btnContinueText Text displayed in continue/confirm button
 * @constant {string} alignModal [right|left|center] Where would you like tyhe modal to align [defaults to right]
 * @constant {int} min Overides default min selection - useful for multi select, and if select is optional? No value?
 * @constant {int} max Overides default max selection - useful for multi select
 * @constant {boolean} injectHiddenInputs [default false] will add hidden inputs for posting forms the traditional way
 *
 */
import React, { useContext }  from 'react';
import SelectContext from './js/SelectContext';
import { Actions } from './js/selectActions';

import SelectHOC from './SelectHOC';
import Menu from './components/Menu';

import keycode from 'keycode';

/*---------------------------
| SelectHOC Props
---------------------------*/
const selectType = 'Multi';

const SelectMulti = SelectHOC(React.forwardRef((props, menuRef) => {

    const { selectState, dispatch } = useContext(SelectContext);

    const {
        btnContinueText = 'Continue',
        handleContinue,
        handleClose,
    } = props;

    const clearItems = () => {
        dispatch({type: Actions.ITEMS_CLEAR});
    };

    const handleClearAllKeyDown = (e) => {
        switch(keycode(e)) {
            case 'enter':
            case 'space':
                e.preventDefault();
                clearItems();
                break;
            default:
                return;
        }
    };

    const handleContinueKeyDown = (e) => {
        const theKeyCode = keycode(e);

        if (e.shiftKey && theKeyCode === 'tab') {
            return;
        }

        switch(theKeyCode) {
            case 'enter':
            case 'space':
            case 'tab':
                e.preventDefault();
                e.stopPropagation();
                handleContinue();
                break;
            default:
                return;
        }
    };
    const handleCloseKeyDown = (e) => {
        const theKeyCode = keycode(e);

        if (e.shiftKey && theKeyCode === 'tab') {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
            return;
        }

        switch(theKeyCode) {
            case 'enter':
            case 'space':
                e.preventDefault();
                e.stopPropagation();
                handleClose();
                break;
            default:
                return;
        }
    };

    const renderMaxSelectionText = () => {
        const maxSelection = selectState.selectRange.max;
        const itemCount = selectState.itemsSelected.length;
        const reachedMax = (maxSelection <= itemCount);

        let maxSelectionText = `${itemCount}/${maxSelection} selected`;

        if (itemCount === 0) {
            maxSelectionText = `up to ${maxSelection}`;
        } else if (reachedMax) {
            maxSelectionText = `${itemCount} selected, max reached`;
        }
        return maxSelectionText;
    };

    return (
        <React.Fragment>
            <header>
                <button
                    tabIndex={ 0 }
                    aria-label={ `Close the Select a ${ selectState.title } Modal` }
                    type={ 'button' }
                    className={ 'close' }
                    onClick={ handleClose }
                    onKeyDown={ handleCloseKeyDown }
                >
                    <span aria-hidden>X</span>
                </button>
                <h2>Select <span className={ 'title' }>{ selectState.title }</span>(s)</h2>
                <aside>
                    <span className={ 'maxSelection' }>({
                        renderMaxSelectionText()
                    })</span>
                    <span
                        onClick={ selectState.itemsSelected.length > 0 ? clearItems : null }
                        onKeyDown={ selectState.itemsSelected.length > 0 ? handleClearAllKeyDown : null }
                        aria-label={ 'Clear All Selections' }
                        className={ 'clearAll' }
                        tabIndex={ selectState.itemsSelected.length > 0 ? '0' : null }
                        hidden={ selectState.itemsSelected.length === 0 }
                    >
                        { selectState.itemsSelected.length > 0 && 'Clear all' }
                    </span>
                </aside>

            </header>

            <div className={ 'main' }>
                <Menu ref={ menuRef } />
            </div>

            <footer className={ 'closing' }>
                <div className={ 'continue-container' }>
                    <button
                        type={ 'button' }
                        className={ 'BtnContinue' }
                        tabIndex={ 0 }

                        onClick={ handleContinue }
                        onKeyDown={ handleContinueKeyDown }

                        // disabled={ disabled }
                        // aria-disabled={ disabled }
                        // aria-label={ 'Continue With Selection' }
                    >
                        { btnContinueText }
                    </button>
                </div>
            </footer>
        </React.Fragment>
    );
}), selectType);

export default SelectMulti;