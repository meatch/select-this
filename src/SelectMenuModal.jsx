/**
 * SelectMenuModal
 * @constant {string} id unique ID so that it knows which menu modal to close - otherwise won't work.
 *
 * @author Mitch Gohman <mitchell.gohman@travelctm.com>
 * @version v1 (Created: 2019-08-06)
 */
import React from 'react';
import * as AriaButtonMenu from 'react-aria-menubutton';
// import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import classnames from 'classnames';

import Button from '../../../components/common/button';
import keycode from 'keycode';

class SelectMenuModal extends React.Component {
    static defaultProps = {
        tabIndex: '0',
        id: 123456,
        items: [
            { selectable: true, value: 1, displayText: 'Item Name' },
        ],
        itemsPriorState: [
            { selectable: true, value: 1, displayText: 'Prior State Item Name' },
        ],
        inputKey: 'inputKey',
        defaultDisplayText: 'Default Display text',
        submitButtontext: 'Continue',
        multipleSelect: false,
        multipleText: 'Items Selected',
        minSelection: 0,
        maxSelection: 6,
        modalTitle: 'Select Menu Modal',
        modalAlign: 'right',
        pyramidAlign: 'right',
        defaultItemSelected: false,
        onSelected: false,
        ariaLabel: '',
    }

    constructor(props) {
        super(props);

        const defaultItems = (!!props.defaultItemSelected) ? [props.defaultItemSelected]:[];

        this.state = {
            isOpen: false,
            itemsSelected: defaultItems,
            itemsSelectedPrior: defaultItems,
        };
    }

    focusSelectButton = () => {
        this.SelectButton = document.querySelector(`#${this.props.id} .SelectButton`);
        if (this.SelectButton) this.SelectButton.focus();
    };

    componentDidUpdate (prevProps, prevState) {

        //  This sets the travel widget display field to be the same as what was selected in the modal select
        if (JSON.stringify(prevState.itemsSelected) !== JSON.stringify(this.state.itemsSelected)) {
            this.onSelected();
        }

        //  This updates the select box display (in the modal) with what was clicked by the user
        //  This is updated while the modal is mounted
        if(prevProps.defaultItemSelected.value !== this.props.defaultItemSelected.value) {
            this.state.itemsSelected = [this.props.defaultItemSelected];
        }

        this.managBodyClass();
    }

    componentDidMount = () => {
        this.managBodyClass();
    };

    managBodyClass = () => {
        // can't rely on instance state - as their may be many - need to see if any have class of isOpen
        const docBody = document.querySelector('body');
        const SelectMenuModals = document.querySelectorAll('.SelectMenuModal');
        let anyModalIsOpen = false;

        SelectMenuModals.forEach(modal => {
            if (modal.classList.contains('isOpen')) {
                anyModalIsOpen = true;
            }
        });

        if (anyModalIsOpen && this.props.multipleSelect) {
            docBody.classList.add('SelectMenuModal-isOpen');
        } else {
            docBody.classList.remove('SelectMenuModal-isOpen');
        }
    };

    handleKeyboardItems = (event) => {
        const thisEl = event.target;
        const nextEl = thisEl.nextSibling ? thisEl.nextSibling : thisEl;
        const prevEl = thisEl.previousSibling ? thisEl.previousSibling : thisEl;

        const whichKeyCode = keycode(event);
        switch(whichKeyCode) {
            case 'esc':
                this.handleClose();
                break;
            case 'enter':
                event.stopPropagation();
                thisEl.click();
                break;
            case 'up':
            case 'left':
                event.stopPropagation();
                prevEl.focus();
                break;
            case 'down':
            case 'right':
                event.stopPropagation();
                nextEl.focus();
                break;
        }
    }
    handleKeyboardUl = (event) => {
        const firstChild = event.target.querySelector('li');

        const whichKeyCode = keycode(event);
        switch(whichKeyCode) {
            case 'down':
            case 'right':
                firstChild.focus();
                break;
        }
    }



    renderMenuItems = (items) => {
        return items.map((item, idx) => {

            let submenu = '';
            if (item.subItems)
            {
                item.hasChildren = true;

                const subItems = item.subItems.map((subitem, idx2) => {
                    return this.rendermenuItem(subitem, idx2);
                });

                submenu = (
                    <ul className={ 'MenuModal-Submenu' }>
                        { subItems }
                    </ul>
                );
            }

            return this.rendermenuItem(item, idx, false, submenu);
        });
    };

    rendermenuItem = (item, idx, className=false, submenu='') => {

        const isSelected = this.isItemSelected(item);

        const menuItemClassName = classnames({
            [className]: className,
            'isSelected': isSelected,
            'hasChildren': item.hasChildren,
        });

        if (!item.selectable)
        {
            return (
                <li
                    key={ idx }
                    className={ menuItemClassName }
                >
                    <div className={ 'title' }>{item.displayText}</div>
                    {submenu}
                </li>
            );
        }

        return (
            <AriaButtonMenu.MenuItem
                key={ idx }
                tag='li'
                value={ item }
                text={ item.displayText }
                className={ menuItemClassName }
                tabIndex='-1'
                role='listitem'
                aria-label={ item.displayText }
                aria-checked={ isSelected }
                onKeyDown={ this.handleKeyboardItems }
            >
                <div className={ 'title' }>{item.displayText}</div>
                {submenu}
            </AriaButtonMenu.MenuItem>
        );
    }

    clearItems = () => {
        this.setState({ itemsSelected: [] });
    }

    isItemSelected = (item) => {
        const foundItemn = this.state.itemsSelected.find((selectedItem) => {
            return (item.displayText === selectedItem.displayText);
        });

        return (foundItemn) ? true:false;
    }

    // Will change based on what is selected and how many are selected
    renderDisplayText = () => {
        let displayText = this.props.defaultDisplayText;
        const itemsSelected = this.state.itemsSelected.length;

        if (itemsSelected > 1) {
            displayText = `${itemsSelected} ${this.props.multipleText}`;
        }
        else if (itemsSelected === 1) {
            displayText = this.state.itemsSelected[0].displayText;
        }
        return displayText;
    }

    renderHiddenInputs = () => {
        const inputKey = (!this.props.multipleSelect) ? `${this.props.inputKey}`:`${this.props.inputKey}[]`;

        const inputs = this.state.itemsSelected.map((item, idx) => {
            return (
                <input
                    key={ idx }
                    type={ 'hidden' }
                    name={ inputKey }
                    value={ item.value }
                />
            );
        });

        return (
            <div className={ 'hidden-inputs' }>
                { inputs }
            </div>
        );
    }

    handleSelection = (item, event) => {
        event.stopPropagation();

        // Adding, or subtracting?
        if (this.isItemSelected(item)) {
            this.removeItem(item);
        } else {
            this.addItem(item);
        }
    };

    addItem = (item) => {
        let itemsSelected = [item];
        const itemsSelectedCount = this.state.itemsSelected.length;
        const maxSelection = this.props.maxSelection;
        const isMax = (maxSelection && (maxSelection <= itemsSelectedCount));
        const multipleSelect = this.props.multipleSelect;

        if (!isMax && item.selectable) {

            // merge with existing if multiple select is possible...
            if (multipleSelect)
            {
                itemsSelected = [
                    ...this.state.itemsSelected,
                    ...itemsSelected,
                ];
            }
            // ...or replace
            this.setState({ itemsSelected: itemsSelected });

        }
    }

    removeItem = (item) => {
        const itemsSelectedCount = this.state.itemsSelected.length;
        const minSelection = this.props.minSelection;
        const isMin = (minSelection === itemsSelectedCount);

        // Make sure we have not reached our minimum selected requirements.
        if (!isMin) {
            const itemsSelected = [...this.state.itemsSelected];
            itemsSelected.forEach((selectedItem, idx) => {
                if (selectedItem.displayText === item.displayText)
                {
                    itemsSelected.splice(idx,1);
                }
            });

            this.setState({
                itemsSelected: itemsSelected,
            });
        }
    }

    onSelected = () => {
        if (this.props.onSelected)
        {
            this.props.onSelected(this.state.itemsSelected);
        }
    }

    handleMenuToggle = ({ isOpen }) => {
        let newState = {};
        if (isOpen) {
            // Save Prior State so we can revert if they hit the close button
            newState = {
                isOpen: isOpen,
                itemsSelectedPrior: JSON.parse(JSON.stringify(this.state.itemsSelected)),
            };
        } else {
            newState = {
                isOpen: isOpen,
            };
        }
        this.setState(newState);
    }

    // Revert Changes - undo
    handleClose = () => {
        this.setState({
            isOpen: false,
            itemsSelected: JSON.parse(JSON.stringify(this.state.itemsSelectedPrior)),
        });

        AriaButtonMenu.closeMenu(this.props.id, { focusButton:true });

        this.focusSelectButton();
    }

    // Save Changes and continue
    handleContinue = () => {
        this.setState({
            isOpen: false,
        });
        AriaButtonMenu.closeMenu(this.props.id, { focusButton:true });
    }

    generateCurrentSelectionAriaLabel = (multipleSelect, maxSelectionText) => {
        const { itemsSelected } = this.state;

        if (multipleSelect) {
            return (itemsSelected.length === 0)
                ? `No selection. Select ${maxSelectionText}`
                : `Current selection ${maxSelectionText}`;
        } else {
            return (itemsSelected.length === 0)
                ? 'No selection made'
                : `Current selection ${itemsSelected[0].displayText}`;
        }
    }

    renderMaxSelectionText = () => {
        const maxSelection = this.props.maxSelection;
        const itemsSelectedCount = this.state.itemsSelected.length;

        let maxSelectionText = `${itemsSelectedCount}/${maxSelection} selected`;

        if (itemsSelectedCount === 0) {
            maxSelectionText = `up to ${maxSelection}`;
        } else if (itemsSelectedCount >= maxSelection) {
            maxSelectionText = `${itemsSelectedCount} selected, max reached`;
        }
        return maxSelectionText;
    }


    render () {
        const {
            id,
            multipleSelect,
            maxSelection,
            modalTitle,
            submitButtontext,
            modalAlign,
            pyramidAlign,
        } = this.props;

        const itemsSelectedCount = this.state.itemsSelected.length;
        const reachedMax = (maxSelection && (maxSelection <= itemsSelectedCount));
        const maxSelectionText = this.renderMaxSelectionText();
        const ariaLabel = `${this.props.ariaLabel} ${this.generateCurrentSelectionAriaLabel(multipleSelect, maxSelectionText)}`;

        const maxSelectionClass = classnames({
            'maxSelection': true,
            'reachedMax': reachedMax,
        });

        const menuType = (multipleSelect) ? 'multipleSelect':'singleSelect';

        const ContainerClass = classnames({
            'SelectMenuModal': true,
            'isOpen': this.state.isOpen,
            [menuType]: true,
            'reachedMax': reachedMax,
            [this.props.className]: this.props.className,
            [`modal-align-${modalAlign}`]: true,
            [`pyramid-align-${pyramidAlign}`]: true,
        });

        return (
            <AriaButtonMenu.Wrapper
                id={ id }
                className={ ContainerClass }
                onSelection={ this.handleSelection }
                onMenuToggle={ this.handleMenuToggle }
                closeOnSelection={ !multipleSelect }
            >
                { this.renderHiddenInputs() }
                <AriaButtonMenu.Button
                    tabIndex={ this.props.tabIndex }
                    className={ 'SelectButton' }
                    aria-label={ ariaLabel }
                >
                    <span className={ 'display-text' }>{ this.renderDisplayText() }</span>
                    <span className={ 'glyphicon glyphicon-menu-down' } />
                </AriaButtonMenu.Button>
                <AriaButtonMenu.Menu className={ 'MenuModal' }>
                    {
                        multipleSelect &&
                        <header>
                            <button
                                tabIndex={ 0 }
                                aria-label={ `Close the ${modalTitle} Modal` }
                                type={ 'button' }
                                className={ 'close' }
                                onClick={ this.handleClose }
                            >
                                <span aria-hidden>X</span>
                            </button>
                            <h2>{modalTitle}</h2>
                            <aside>
                                <span className={ maxSelectionClass }>({maxSelectionText})</span>
                                {
                                    this.state.itemsSelected.length > 0 &&
                                    <span
                                        onClick={ this.clearItems }
                                        onKeyDown={ this.handleKeyboardItems }
                                        aria-label={ 'Clear All Selections' }
                                        tabIndex={ 0 }
                                        className={ 'clearAll' }
                                    >
                                        Clear all
                                    </span>
                                }
                            </aside>

                        </header>}
                    <div className={ 'main' }>
                        <ul
                            tabIndex={ 0 }
                            onKeyDown={ this.handleKeyboardUl }
                        >
                            { Array.isArray(this.props.items) && this.renderMenuItems(this.props.items) }
                        </ul>
                    </div>
                    {
                        multipleSelect &&
                        <footer>
                            <Button
                                buttonContainerClass={ 'continue-container' }
                                buttonClass={ 'search' }
                                gtmLabel={ 'Continue With Selection' }
                                ariaLabel={ 'Continue With Selection' }
                                type={ 'Button' }
                                buttonText={ submitButtontext }
                                submitHandler={ this.handleContinue }
                            />
                        </footer>
                    }
                </AriaButtonMenu.Menu>
            </AriaButtonMenu.Wrapper>
        );
    }
}

export default SelectMenuModal;

//Utility function to generate aria-labels. Keyboard instructions should only be given in (L) view.
export const generateAriaLabel = (fieldLabel, isLarge) => {
    const keyboardOnlyAriaLabel = ' To make selections, press enter to enter popover and use arrow keys to navigate.';
    return (isLarge)
        ? `${fieldLabel} input field popover toggle ${keyboardOnlyAriaLabel}`
        : `${fieldLabel} input field popover toggle`;
};