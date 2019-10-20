import React, { useEffect, useRef, useReducer } from 'react';
import selectContext from './context/selectContext';
import selectReducer from './context/selectReducer';
import keycode from 'keycode';
import classnames from 'classnames';

import HiddenInputs from './components/HiddenInputs/HiddenInputs';
import ButtonDisplay from './components/ButtonDisplay/ButtonDisplay';

const SelectHOC = (WrappedComponent, selectType) => {
    return (props) => {

        console.log('Props passed', props);

        const {
            id=null,
            additionalClassName = null,
            
            // Aria
            label=null,
            labelID = null,
            labelSrOnly = null,
            
            /* Items = [
                { 
                    # Required Props
                    uID: 100, //unique identifier for each item, required to keep them distinct
                    value: 'This is the Value of the Item',
                    displayText: 'What the User Sees for this Item',
                    selected: false,
                    
                    # Optional Props and their defaults
                    selectable: true,
                },
                ...
            ]
            */
            items = [], //master list of options and their current selected state
            
            // Hidden Inputs
            inputName = 'item', //for hidden input(s) and standard form submission
            injectHiddenInputs = false,

            // ButtonDisplay
            buttonDisplayTextDefault = null, //Default text for Toggle Button if nothing is selected

            // Alignment of dropdown list and pyramid that visually connects modal to btnHeroText
            alignModal = 'right',

            // Return Items State to Parent
            onSelected = () => { return; },

            // SelectMulti
            multiMessage = 'Items Selected',
            min = null,
            max = null,

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

            props: { 
                ...propsAugmented,
                ...props
            },
        };

        /*---------------------------
        | Create Store
        ---------------------------*/
        const [ selectState, dispatch ] = useReducer(selectReducer, defaultStore);

        /*---------------------------
        | Classnames
        ---------------------------*/
        const rootClassName = classnames({
            'SelectThis': true,
            [selectType]: true,
            [additionalClassName]: additionalClassName,
        });
        const menuClassName = classnames({
            'Menu': true,
        });

        return (
            <selectContext.Provider value={ { selectState, dispatch } }>
                <div id={ id } className={ rootClassName }>
                    <HiddenInputs />
                    <ButtonDisplay />
                    <div className={ menuClassName }>
                        <WrappedComponent { ...props } />
                    </div>
                </div>
            </selectContext.Provider>
        );
    }
}

export default SelectHOC;