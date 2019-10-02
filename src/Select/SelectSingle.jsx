/**
 * SelectHOC > SelectSingle (Refer to HOC for its shared logic.)
 * @author Mitch Gohman <mitchell.gohman@travelctm.com>
 * @version v2 (Created: 2019-09-17)
 *
 * Required Props
 * @constant {object array} items Object array of items for the select menu
 *     ${listitem} --> Each object must have the following props
 *          {
 *             @constant displayText: {string}, // The visual text for the select item
 *             @constant value: {string}, // the value you would like to use (e.g. for form posting)
 *             @constant uID: {string|number} [optional] Unique Identifier used to distinguish each item, important when multiple items share the same values
 *             @constant selectable:[optional] {boolean}, //set to true means the user can select the item in the menu (Maybe you want a title that is not selctable)
 *          }
 * @constant {string} inputName name of input key for posting - shows up as hidden input fields (input || input[] for multiple).
 *
 * Optional Props
 * @constant {method} onSelected returns item selection changes whenever user commits to choices
 * @constant {object|array} setDefaultItems takes ${listitem} or array of ${listitem}s to set default selected
 * @constant {object|array} setSelectedItems takes ${listitem} or array of ${listitem}s to update selected
 * @constant {string} rootClassName adding class for additional CSS and JS targeting
 * @constant {string} id unique ID for aria labelling
 * @constant {string} label aria-label for select menu component [defaults to btnHeroText]
 * @constant {boolean} labelSrOnly hidden from sighted users, for screen reader only.
 * @constant {string} title user friendly title, will override inputname when generating defaults
 * @constant {string} alignModal [right|left|center] Where would you like tyhe modal to align [defaults to right]
 * @constant {int} min Overides default min selection - useful for multi select, and if select is optional? No value?
 * @constant {int} max Overides default max selection - useful for multi select
 * @constant {boolean} injectHiddenInputs [default false] will add hidden inputs for posting forms the traditional way
 *
 */
import React from 'react';

import SelectHOC from './SelectHOC';
import Menu from './components/Menu';

/*---------------------------
| SelectHOC Props
---------------------------*/
const selectType = 'Single';


const SelectSingle = SelectHOC(React.forwardRef((props, menuRef) => {

    return (
        <React.Fragment>
            <div className={ 'main' }>
                <Menu ref={ menuRef } />
            </div>
        </React.Fragment>
    );
}), selectType);

export default SelectSingle;