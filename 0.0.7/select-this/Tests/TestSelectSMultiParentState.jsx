import React, { useState, useEffect } from 'react';
import SelectMulti from '../SelectMulti';
import SelectSingle from '../SelectSingle';

import { fruit } from './sample-data/fruit';
import { fruitMore } from './sample-data/fruitMore';

import './test.css';

const TestSelectSMultiParentState = () => {

    const theFruit = fruit;
    const theFruitMore = fruitMore;

    const [ currentDynamicList, updateChoice ] = useState(theFruit);
    const [ defaultSelected, setDefaultSelected ] = useState(theFruit[0]);

    useEffect(() => {
        setDefaultSelected(currentDynamicList[0]);
    }, [currentDynamicList]);

    const mainMenu = [
        { value: 1, displayText: 'Fruit' },
        { value: 2, displayText: 'More Fruit' },
    ];

    const handleSelected = (itemsSelected) => {
        if (itemsSelected[0]) {
            switch (itemsSelected[0].value) {
                case 1:
                    updateChoice(theFruit);
                    break;
                case 2:
                    updateChoice(theFruitMore);
                    break;
            }
        }
    }

    return (
        <div className={ 'root-container multi parentState' }>
            <h1>Multi Select Parent Hook State Test</h1>
            <div className='columns'>
                <div>
                    <SelectSingle
                        key={ 'chooseFruitVeggie' }
                        inputName={ 'chooseFruitVeggie' }
                        btnHeroText={ 'Pick Your Poison' }
                        items={ mainMenu }
                        onSelected={ handleSelected }
                        setDefaultItems={ mainMenu[0] }
                        injectHiddenInputs
                    />
                </div>
                <div>
                    <SelectMulti
                        inputName={ 'fruityVeggiess' }
                        btnHeroText={ 'Fruit or Veggies' }
                        items={ currentDynamicList }
                        setDefaultItems={ defaultSelected }
                        // setSelectedItems={ defaultSelected }
                        injectHiddenInputs
                    />
                </div>
            </div>
        </div>
    );
}

export default TestSelectSMultiParentState;
