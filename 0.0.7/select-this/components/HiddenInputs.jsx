import React, { useContext } from 'react';
import SelectContext from '../js/SelectContext';

const HiddenInputs = () => {

    const { selectState } = useContext(SelectContext);

    if (!selectState.injectHiddenInputs) return '';

    // Do we need group array keys? e.g. inputName[]. Multi Select Does
    const suffix = (selectState.selectType === 'Multi') ? '[]':'';

    const theInputs = selectState.itemsSelected.map((itSelect, idx) => {
        return (
            <input
                key={ `hidden-${itSelect.value}-${idx}` }
                type='hidden'
                name={ `${selectState.inputName}${suffix}` }
                value={ itSelect.value }
            />
        );
    });

    return (
        <div className={ 'hidden-inputs' }>
            { theInputs }
        </div>
    );
};

export default HiddenInputs;