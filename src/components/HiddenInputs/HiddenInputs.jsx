import React, { useContext } from 'react';
import selectContext from '../../context/selectContext';

const HiddenInputs = () => {

    const { selectState } = useContext(selectContext);

    const suffix = (selectState.selectType === 'Multi') ? '[]':'';
    const inputName = `${selectState.originalProps.inputName}${suffix}`;

    const inputItems = selectState.items.reduce((inputItems, item) => {
        const isSelected = (item.selected) ? !!item.selected : false;
        if (isSelected) {
            inputItems.push(item);
        }
        return inputItems;
    }, []);
    
    return (
        <div className={ 'HiddenInputs' }>
            { 
                inputItems.map((inputItem, idx) => {
                    return <input
                        key={ idx }
                        type='hidden'
                        name={ inputName }
                        value={ inputItem.value }
                    />
                })
            }
        </div>
    );
}

export default HiddenInputs;