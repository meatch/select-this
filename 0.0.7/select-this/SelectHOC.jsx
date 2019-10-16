/**
 * Select
 * @author Mitch Gohman <mitchell.gohman@travelctm.com>
 * @version v2 (Created: 2019-09-17)
 */
import React, { useEffect, useRef, useReducer }  from 'react';

import classnames from 'classnames';
import keycode from 'keycode';

import selectReducer from './js/selectReducer';
import SelectContext from './js/SelectContext';
import { Actions } from './js/selectActions';
import { clickOutside } from './js/clickOutside';

import HiddenInputs from './components/HiddenInputs';
import BtnHero from './components/BtnHero';

// Apparently Component.defaultProps will be deprecated in favor of default parameters
// https://bit.ly/2lWaEfR
const SelectHOC = (WrappedComponent, selectType='Multi') => {
    return (props) => {
        const {
            id=null,
            label=null,
            labelSrOnly=false,
            title='',
            inputName = 'item', //for hidden input and standard form submission
            rootClassName = false,

            // Menu Items
            // Format: { selectable: true, value: 1, displayText: 'Item Name' },
            items = [], //master list of options
            setDefaultItems = [],
            setSelectedItems = [],

            // Hidden Inputs
            injectHiddenInputs = false,

            // Button Controls
            btnHeroText = null, //Default text for Button Hero Toggle if nothing is selected

            // Header Multi Message
            multiMessage = 'Items Selected',

            min = null,
            max = null,

            // Alignment of dropdown list and pyramid that visually connects modal to btnHeroText
            alignModal = 'right',
            errorName,
            errors,

            // Return State to Parent
            onSelected = () => { return; },

            // Added Data Attribute for Automation
            dataAut = null,
        } = props;

        /*---------------------------
        | Prop Grooming
        ---------------------------*/
        /* aria-label ---------------------------*/
        let theAriaLabel = (label) ? label : `${selectType} Select Menu`;

        /* Title ---------------------------*/
        let theTitle = (title) ? title: theAriaLabel;

        const theButtonHeroText = (btnHeroText) ? btnHeroText : `Select a ${theTitle}`;

        // selectRange Multi default
        let theSelectRange = { min: 0, max: 6 };

        // Check Wrapped Component Defaults
        if (selectType === 'Single') {
            theSelectRange = { min: 1, max: 1 };
        }

        // Override is we added props
        if (min) { theSelectRange.min = min; }
        if (max) { theSelectRange.max = max; }

        /* ID ---------------------------*/
        let theID = (id) ? id : inputName.replace(' ', '') + '-123456';

        /* Items ---------------------------*/
        // make sure it exists, if its a single object, return array of single object
        const itemsIncomingCheck = (items) => {
            if (!!items) {
                return  (!Array.isArray(items)) ? [items]: items;
            }
            return []; //return empty array
        }

        const generateUID = (itemValue, idx) => {
            return itemValue.toString().replace(' ', '') + '_' + idx;
        };

        const groomItem = (item, idx) => {
            // Add Selectable if not provided
            if (!item.hasOwnProperty('selectable')) {
                item.selectable = true;
            }

            // Add unique ID to each item if one was not provided
            if (!item.hasOwnProperty('uID')) {
                item.uID = generateUID(item.value, idx);
            }

            return item;
        };

        const groomItems = (newItems) => {

            const groomedItems = itemsIncomingCheck(newItems);

            return groomedItems.map((item, idx) => {
                if (item.subItems) {

                    item.subItems = itemsIncomingCheck(item.subItems).map((subItem, subIdx) => {
                        return groomItem(subItem, `sub_${subIdx}`);
                    });
                }
                return groomItem(item, idx);
            });

        }
        const groomedItems = groomItems(items);

        let itemsSelected = [];

        /*---------------------------
        | Look ma, no Redux
        ---------------------------*/
        // Context State
        const defaultState = {
            id: theID,
            ariaLabel: theAriaLabel,
            labelSrOnly: labelSrOnly,
            selectType: selectType,
            inputName: inputName,
            title: theTitle,
            btnHeroText: theButtonHeroText,
            modalHasOpened: false,
            modalIsOpen: false,
            customErrors: false,
            items: groomedItems,
            itemsSelected: itemsSelected,
            itemsSelectedSaved: itemsSelected,
            focusedItem: {
                uID: '0',
                item: {},
            },
            selectRange: theSelectRange,
            injectHiddenInputs: injectHiddenInputs,
            errors: errors,
            errorName: errorName,
            dataAut: dataAut,
        };

        const [selectState, dispatch] = useReducer(selectReducer, defaultState);

        /*---------------------------
        | DOM Refs with Hooks, no way
        ---------------------------*/
        const rootContainerRef = useRef(null);
        const menuModalwrapperRef = useRef(null);
        const btnHeroRef = useRef(null);
        const menuRef = useRef(null);

        /*---------------------------
        | Click Outside Manager
        ---------------------------*/
        const handleContinue = () => {
            dispatch({type: Actions.SHOW_MODAL, showModal: false});
        };

        const updateErrors = () => {
            dispatch({type: Actions.UPDATE_ERRORS, errors: errors });
        };

        // Only initialize once
        const clickOutsideRef = useRef(null);
        if (clickOutsideRef.current === null) {
            clickOutsideRef.current = clickOutside(['.MenuModalWrapper', '.menuList, .BtnContinue'], handleContinue);
        }

        /*---------------------------
        | replaceSelectedItems
        ---------------------------*/
        const replaceSelectedItems = (selected) => {
            dispatch({type: Actions.ITEMS_REPLACE, itemsSelected: selected});
        };

        const getFromItems = (itemNeedle, itemsArray) => {
            const foundItem = itemsArray.find(item => {
                if (itemNeedle.uID) {
                    return (itemNeedle.uID === item.uID);
                }
                // Alright, if you did not give us a uID we will try another way
                return (itemNeedle.displayText === item.displayText);
            });
            // Do not want to return undefined, the return of FIND.
            return (foundItem) ? foundItem:false;
        }

        // componentDidUpdate for setDefaultItems
        useEffect(()=>{
            const itemNeedles = itemsIncomingCheck(setDefaultItems);
            const defaultItems = itemNeedles.reduce((result, itemNeedle) => {
                const foundItem = getFromItems(itemNeedle, selectState.items);
                if (foundItem) {
                    result.push(foundItem);
                }
                return result;
            }, []);

            replaceSelectedItems(defaultItems);
            dispatch({type: Actions.UNDO_SAVE_ITEMS});
        }, [props.setDefaultItems]);

        // componentDidUpdate for setSelectedItems
        useEffect(() => {
            if (!props.setSelectedItems) { return; }

            const itemsToSelect = itemsIncomingCheck(props.setSelectedItems);
            const hasUID = (itemsToSelect[0] && itemsToSelect[0].uID) ? true:false;

            // Map against augmented list items (e.g. added uIDs)
            const selected = [];
            itemsToSelect.forEach(itemToSelect => {
                const thisEl = selectState.items.find(item => {
                    if (hasUID) {
                        return itemToSelect.uID === item.uID;
                    } else {
                        // Fall Back to Value comparison - not ideal if list has several items with same value
                        return itemToSelect.value === item.value;
                    }
                });
                selected.push(thisEl);
            });

            // See if setSelectedItems prop provided has changed
            if (JSON.stringify(selected[0]) !== JSON.stringify(selectState.itemsSelected[0])) {

                replaceSelectedItems(selected);
            }
        }, [props.setSelectedItems]);

        /*---------------------------
        | modalIsOpen
        ---------------------------*/
        useEffect(() => {
            if (selectState.modalIsOpen) {
                // Save Current State for Giant Undo - closing menu resets to last saved state.
                // in a multi select menu
                dispatch({type: Actions.UNDO_SAVE_ITEMS});

                // Focus UL on open
                // const menuList = menuRef.current;
                // Opening Modal should always overide sibling closing modals
                // Opening modal ${Menu List} focus always trumps closing modal ${Hero Button} focus
                // adding overflow hidden to body
                setTimeout(() => {
                    // No longer need this cause it was only really noticeable in multi select menus.
                    // Stop browser from jumping down when we focus the menu
                    // let x = window.scrollX;
                    // let y = window.scrollY;

                    // const firstListItem = menuList.querySelector('li');
                    // if (firstListItem) {
                    //     firstListItem.focus();
                    // }
                    if (selectState.items[0]) {
                        dispatch({type: Actions.FOCUS_ITEM_UPDATE, item: selectState.items[0]});
                    }
                    // window.scrollTo(x, y);

                    // Add class to Body to manage scrollbars for small view full screen when multi
                    if (selectState.selectType === 'Multi') {
                        document.querySelector('body').classList.add('SelectMenu-modalIsOpen');
                    }
                }, 100);


                // Add Handler when it opens
                clickOutsideRef.current.addListener();
            } else {
                // Remove handler when it closes - clean up.
                if (selectState.modalHasOpened) {
                    btnHeroRef.current.focus();
                }
                onSelected(selectState.itemsSelected);
                clickOutsideRef.current.removeListener();

                // Remove class to Body to manage scrollbars in small view full screen multi
                document.querySelector('body').classList.remove('SelectMenu-modalIsOpen');
            }

        }, [selectState.modalIsOpen]);

        /*---------------------------
        | itemsSelected
        ---------------------------*/
        useEffect(() => {
            // if itemsSelected has been cleared, focus the UL
            if (selectState.itemsSelected.length === 0) {
                const menuList = menuRef.current;
                if (menuList) {
                    // Stop browser from jumping down when we focus the menu
                    let x = window.scrollX;
                    let y = window.scrollY;
                    menuList.focus();
                    window.scrollTo(x, y);
                }
            }

            /*---------------------------
            | If all of the following is true...
            | 1. MultiSelect
            | 2. Min is greater than zero
            | 3. Not enough defaults are provided
            | ...force select items padding to min requirements
            ---------------------------*/
            // TODO rethink using dispatch updates.
            if (selectState.selectType === 'Multi' && selectState.selectRange.min > 0 && selectState.itemsSelected.length < selectState.selectRange.min) {
                console.error(`SelectMulti MISSING setSelectedItems: If min override supplied is greater than zero you must Provide 'setSelectedItems' for your ${title} ${inputName} component instance. Adding first ${selectState.selectRange.min} items from your items list.`);
            }


        }, [selectState.itemsSelected]);

        /*---------------------------
        | focusedItem
        ---------------------------*/
        useEffect(() => {
            const uID = (selectState.focusedItem.uID) ? selectState.focusedItem.uID:'0';
            if (uID !== '0') {
                const menuListItems = (menuRef.current) ? menuRef.current.querySelectorAll('li'):null;
                if (menuListItems) {
                    menuListItems.forEach(listItem => {
                        if (listItem.dataset.uid.toString() === uID.toString()) {
                            listItem.classList.add('hasFocus');
                            listItem.focus();
                        }
                    });
                }
            }
        }, [selectState.focusedItem]);

        useEffect(() => {
            if(!selectState.customErrors){
                updateErrors();
            }
        }, [props.errors]);

        /*---------------------------
        | Whenever the Items Array changes, perform these tasks. e.g. ajax calls, or dynamic lists
        ---------------------------*/
        useEffect(() => {
            // We need to update anytime the array has changed, not just length
            if (props.items && JSON.stringify(selectState.items) !== JSON.stringify(props.items)) {

                // Groom New Items (e.g. adding uID if there is none)
                const newItems = groomItems(props.items);

                // if Not Every Selected Item is in New Array
                const isEverySelectedInNewArray = selectState.itemsSelected.every((selectedItem) => {
                    return newItems.find(newItem => {
                        return selectedItem.uID === newItem.uID;
                    });
                });

                if (!isEverySelectedInNewArray) {
                    const itemNeedles = itemsIncomingCheck(props.setDefaultItems);

                    const newSelected = itemNeedles.map(itemNeedle => {
                        return getFromItems(itemNeedle, selectState.items);
                    });

                    // Update with newSelected
                    replaceSelectedItems(newSelected);

                }

                dispatch({type: Actions.UPDATE_ITEMS, items: newItems});
                dispatch({type: Actions.UNDO_SAVE_ITEMS});

            }
        }, [props.items]);

        /*---------------------------
        | Props management
        ---------------------------*/
        const itemCount = (selectState.itemsSelected) ? selectState.itemsSelected.length:0;
        const reachedMax = (max <= itemCount);

        /*---------------------------
        | Item Selection
        ---------------------------*/
        const handleClose = () => {
            btnHeroRef.current.focus();
            dispatch({type: Actions.ITEMS_REPLACE, itemsSelected: selectState.itemsSelectedSaved});
            dispatch({type: Actions.SHOW_MODAL, showModal: false});
        };

        const handleMenuModalKeyDown = (e) => {
            switch(keycode(e)) {
                case 'esc':
                    e.preventDefault();
                    handleClose();
                    break;
                default:
                    return;
            }
        };

        /*---------------------------
        | Rendering Logic
        ---------------------------*/
        const btnHeroToggle = () => {
            if (selectState.modalIsOpen) {
                btnHeroRef.current.focus();
                dispatch({type: Actions.SHOW_MODAL, showModal: false});
            } else {
                dispatch({type: Actions.SHOW_MODAL, showModal: true});
            }
        };

        /*---------------------------
        | Classes
        ---------------------------*/
        const ContainerClass = classnames({
            'SelectMenu': true,
            [selectType]: true,
            'modalIsOpen': selectState.modalIsOpen,
            'reachedMax': reachedMax,
            [rootClassName]: rootClassName,
            [`modal-align-${alignModal}`]: true,
        });

        const ariaClassName = classnames({
            'ariaLabel': true,
            'sr-only': labelSrOnly,
        });

        /*---------------------------
        | Return Render SelectMulti
        ---------------------------*/
        return (
            <SelectContext.Provider value={ { selectState, dispatch } }>
                <div
                    className={ ContainerClass }
                    ref={ rootContainerRef }
                >
                    <HiddenInputs />

                    <span id={ selectState.id } className={ ariaClassName }>{ selectState.ariaLabel }</span>

                    <div className={ 'btnHeroContainer' }>
                        <BtnHero
                            ref={ btnHeroRef }
                            btnHeroText={ btnHeroText }
                            multiMessage={ multiMessage }
                            btnHeroToggle={ btnHeroToggle }
                            aria-labelledby={ selectState.id }
                        />
                    </div>

                    <div
                        className='MenuModalWrapper'
                        ref={ menuModalwrapperRef }
                        hidden={ !selectState.modalIsOpen }
                    >
                        {
                            selectState.modalIsOpen &&
                            <div className={ 'MenuModal' } onKeyDown={ handleMenuModalKeyDown }>
                                <div id={ `MenuModalPanel-${selectState.id}` } className={ 'MenuModalPanel' }>
                                    <WrappedComponent
                                        ref={ menuRef }
                                        handleClose={ handleClose }
                                        handleContinue={ handleContinue }
                                        { ...props }
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </SelectContext.Provider>
        );
    };
};

export default SelectHOC;