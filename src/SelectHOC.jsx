import React, { useEffect, useRef, useReducer } from 'react';
import selectContext from './context/selectContext';
import selectReducer from './context/selectReducer';
import * as selectActions from './context/selectActions';

import keycode from 'keycode';
import classnames from 'classnames';

import HiddenInputs from './components/HiddenInputs/HiddenInputs';
import AriaLabel from './components/AriaLabel/AriaLabel';
import ButtonDisplay from './components/ButtonDisplay/ButtonDisplay';

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
            items: items,
            itemsSaved: items,
            buttonDisplayText: (buttonDisplayTextDefault) ? buttonDisplayTextDefault : `Select an item`,
            modalIsOpen: false,
            focusedItem: {
                uID: null,
                item: {},
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
            // console.log('componentDidMount');
        }, []);

        // componentDidUpdate
        useEffect(() => {
            // console.log('componentDidUpdate');
        });


        /*---------------------------
        | DOM Refs with Hooks, no way
        | Using this to manage DOM focus on children - ADA Babay
        ---------------------------*/        
        const buttonDisplayRef = useRef(null);
        const itemsRef = useRef(null);

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
        const menuClassName = classnames({
            'Menu': true,
        });

        /*---------------------------
        | Render
        ---------------------------*/
        return (
            <selectContext.Provider value={ { selectState, dispatch } }>
                <div id={ id } className={ rootClassName }>
                    { injectHiddenInputs && <HiddenInputs />}
                    <AriaLabel />
                    <ButtonDisplay ref={ buttonDisplayRef } />
                    <div className={ menuClassName }>
                        <WrappedComponent { ...props } />
                    </div>
                </div>
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
                uID: 100, //unique identifier for each item, required to keep them distinct
                value: 'This is the Value of the Item',
                displayText: 'What the User Sees for this Item',
                
                # Optional Props and their defaults
                selected: false,
                selectable: true,
                tier: 'tier1', // in case you wish to add sub items - due to current state of ADA it flattens out, but classes are assigned for styling.
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
        onSelected: () => { return; },

        // SelectMulti
        multiMessage: 'Items Selected',
        min: null,
        max: null,
    };

    return SelectHOCWrapper;
}

export default SelectHOC;