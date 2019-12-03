import React, { useEffect, useRef, useReducer } from 'react';
import { useId } from "react-id-generator";
import selectContext from './context/selectContext';
import selectReducer from './context/selectReducer';
import * as selectActions from './context/selectActions';
import * as Helpers from './utilities/helpers';

import { clickOutside } from './utilities/clickOutside';

import { SelectThis } from './SelectThisStyles';

import keycode from 'keycode';
import classnames from 'classnames';

import HiddenInputs from './components/HiddenInputs/HiddenInputs';
import AriaLabel from './components/AriaLabel/AriaLabel';
import ButtonDisplay from './components/ButtonDisplay/ButtonDisplay';
import MenuModalWrapper from './components/MenuModalWrapper/MenuModalWrapper';

const SelectHOC = (WrappedComponent, selectType) => {
    const SelectHOCWrapper = (props) => {
        const {
            items,
            id,
            label, 
            min,
            max,
            buttonDisplayTextDefault,
            alignModal,
            additionalClassName,
            injectHiddenInputs,
            onChange,
        } = props;

        /*---------------------------
        | Non changing augmented props for context store.
        ---------------------------*/
        const propsAugmented = {}
        propsAugmented.selectType = selectType;
        propsAugmented.title = (label) ? label : `${selectType} Select Menu`;
        
        // Select Range
        propsAugmented.selectRange = (selectType === 'SelectMulti') ? { min: 0, max: 6 } : { min: 1, max: 1 };
        if (min) { propsAugmented.selectRange.min = min; }
        if (max) { propsAugmented.selectRange.max = max; }
        
        /*---------------------------
        | Default Store/Object Shape
        ---------------------------*/
        const defaultStore = {
            items: JSON.parse(JSON.stringify(items)), //should be cloned versions, not links.
            itemsSaved: JSON.parse(JSON.stringify(items)), //should be cloned versions, not links.
            buttonDisplayText: (buttonDisplayTextDefault) ? buttonDisplayTextDefault : `Select an item...`,
            modalIsOpen: false,
            itemActive: {
                item: {},
                domID: '',
            },
            reachedMax: false,
            reachedMin: false,
            originalProps: {
                ...propsAugmented,
                ...props
            },
        };

        /*---------------------------
        | Create Store
        ---------------------------*/
        const [ selectState, dispatch ] = useReducer(selectReducer, defaultStore);

        /*---------------------------
        | Lifecycle Event Listeners
        ---------------------------*/
        // componentDidMount
        useEffect(() => {
            // Only assign DOM Ref once and after mounted.
            clickOutsideRef.current = clickOutside(['.MenuModal', '.Items, .BtnContinue'], () => {
                selectActions.itemsSave(selectState.items, dispatch);
                selectActions.setModalOpenState(false, dispatch);
            });
        }, []);

        // componentDidUpdate
        useEffect(() => {
            // console.log('componentDidUpdate');
        });

        // props.items watch - when developer changes items passed to component - overrides internal state - like starting from scratch
        useEffect(() => {
            selectActions.itemsSet(props.items, dispatch);
        }, [props.items]);


        // selectState.items watch - when component changes the selectState.items internal state
        useEffect(() => {
            onChange(selectState.items);
        }, [selectState.items]);


        // selectState.modalIsOpen watch - when modal opens and closes
        useEffect(() => {
            if (selectState.modalIsOpen) {
                // Add Handler when it opens
                clickOutsideRef.current.addListener();

                // Whenever the modal opens, shift focus to the UL menu
                // itemsRef should always trump sibling closing focus to button
                // So we give it a slight delay - 100 ms seems like a healthy sweet spot.
                const itemsCurrent = itemsRef.current;

                setTimeout(() => {
                    itemsCurrent.focus();
                }, 100);

                // Always Activate first list item for arrow navigation.
                let domListItemToActivate = itemsCurrent.querySelector('li');
                const domID = domListItemToActivate.id;
                const itemToActivate = Helpers.getItemToActivateFromDomListItem(selectState.items, domListItemToActivate);

                if (itemToActivate) {
                    selectActions.itemActiveSet(itemToActivate, domID, dispatch);
                }
            } else {
                buttonDisplayRef.current.focus();
                clickOutsideRef.current.removeListener();
            }

        }, [selectState.modalIsOpen]);


        /*---------------------------
        | Event Listeners
        ---------------------------*/
        const selectThisKeyDown = (e) => {
            switch(keycode(e)) {
                case 'esc':
                    e.preventDefault();
                    selectActions.itemsRestore(selectState.itemsSaved, dispatch);
                    selectActions.setModalOpenState(false, dispatch);
                    break;
                default:
                    return;
            }
        }

        /*---------------------------
        | DOM Refs with Hooks, no way
        | Using this to manage DOM focus on children - ADA Babay
        | We want to be able to control focus on the following
            ButtonDisplay
            Items (item conntainer UL)
            Item (current item focused - changes as they interact with list item, or click on an item)
        ---------------------------*/        
        const buttonDisplayRef = useRef(null);
        const itemsRef = useRef(null);
        const clickOutsideRef = useRef(null);

        /*---------------------------
        | Classnames
        ---------------------------*/
        const rootClassName = classnames({
            'SelectThis': true,
            [selectType]: true,
            
            'modalIsOpen': selectState.modalIsOpen,
            'reachedMax': selectState.reachedMax,
            'reachedMin': selectState.reachedMin,

            [`modal-align-${alignModal}`]: true,

            [additionalClassName]: additionalClassName,
        });


        /*---------------------------
        | Unique IDs
        ---------------------------*/
        const [uniqueID] = useId();
        const theID = (id) ? id : `SelectThis${uniqueID}`;
        const labelID = `${theID}-AriaLabel`;
        const menuModalId = `${theID}-MenuModal`;


        /*---------------------------
        | Render
        ---------------------------*/
        return (
            <selectContext.Provider value={ { selectState, dispatch } }>
                <SelectThis
                    id={ theID }
                    className={ rootClassName }
                    onKeyDown={ selectThisKeyDown }
                >
                    { injectHiddenInputs && <HiddenInputs />}
                    <AriaLabel labelID={ labelID } />
                    <ButtonDisplay
                        labelID={ labelID }
                        menuModalId={ menuModalId }
                        ref={ buttonDisplayRef }
                    />
                    <MenuModalWrapper menuModalId={ menuModalId }>
                        <WrappedComponent ref={ itemsRef } { ...props } />
                    </MenuModalWrapper>
                </SelectThis>
            </selectContext.Provider>
        );
    }

    /*---------------------------
    | Set Default Props
    ---------------------------*/
    SelectHOCWrapper.defaultProps = {
        id: null,
        additionalClassName: null,
        
        // Aria
        label: null,
        ariaLabel: null,
        labelID: null,
        labelSrOnly: null,
        
        /* Items: [
            {
                # Required Props
                id: 100, //unique identifier/index/key for each item, required to keep them distinct
                value: 'This is the Value of the Item',
                displayText: 'What the User Sees for this Item',
                
                # Optional Props and their defaults
                selected: false, // Author can define what item or items can be selected
                selectable: true, //In case you do not want an item to be selectable, like a subitem header.
                tier: 'tier1', // in case you wish to add sub items - due to current state of ADA it flattens out DOM LI's, and classes are assigned for styling purposes.
                anyOrAll: false, // Any or All Items (e.g. no filters). A flagged item that when set to true and clicked will clear all other items. When user clicks clear all, it also preserves this item. It also does not count against min or max selection.
            },
            ...
        ]
        */
        items: [], //master list of options and their current selected state
        
        // Hidden Inputs
        inputName: 'selectThisItem', //for hidden input(s) and standard form submission
        injectHiddenInputs: false,

        // ButtonDisplay
        buttonDisplayTextDefault : null, //Default text for Toggle Button if nothing is selected

        // Alignment of dropdown list and pyramid that visually connects modal to btnHeroText
        alignModal: 'right',

        // Return Items State to Parent
        onChange: () => { return; },

        // SelectMulti
        multiMessage: 'Items Selected',
        min: 1,
        max: 1,
        btnContinueText: 'Continue',
    };

    return SelectHOCWrapper;
}

export default SelectHOC;