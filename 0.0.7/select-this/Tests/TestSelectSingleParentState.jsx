import React, { useState, useEffect } from 'react';
import SelectSingle from '../SelectSingle';

import { fruit } from './sample-data/fruit';
import { veggies } from './sample-data/veggies';

import './test.css';

const TestSelectSingleParentState = () => {

    const theVeggies = veggies;
    const theFruit = fruit;

    const [ currentFruitVeggyList, updateChoice ] = useState(theFruit);
    const [ defaultSelected, setDefaultSelected ] = useState(theFruit[0]);

    useEffect(() => {
        setDefaultSelected(currentFruitVeggyList[0]);
    }, [currentFruitVeggyList]);

    const mainMenu = [
        { value: 1, displayText: 'Fruit' },
        { value: 2, displayText: 'Veggies' },
    ];

    const handleSelected = (itemsSelected) => {
        if (itemsSelected[0]) {
            switch (itemsSelected[0].value) {
                case 1:
                    updateChoice(theFruit);
                    break;
                case 2:
                    updateChoice(theVeggies);
                    break;
            }
        }
    }

    return (
        <div className={ 'root-container single parentState' }>
            <h1>Single Select Parent Hook State Test</h1>
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
                    <SelectSingle
                        inputName={ 'fruityVeggiess' }
                        btnHeroText={ 'Fruit or Veggies' }
                        items={ currentFruitVeggyList }
                        setDefaultItems={ defaultSelected }
                        setSelectedItems={ defaultSelected }
                        injectHiddenInputs
                    />
                </div>
            </div>
        </div>
    );
}

export default TestSelectSingleParentState;
