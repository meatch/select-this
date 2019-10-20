import React from 'react';
import SelectHOC from '../../hocs/SelectHOC/SelectHOC';

import classnames from 'classnames';

import HiddenInputs from '../HiddenInputs/HiddenInputs.jsx';
import ButtonDisplayText from '../ButtonDisplayText/ButtonDisplayText.jsx';   
import Items from '../Items/Items.jsx';

const SelectSingle = SelectHOC((props) => {

    /*---------------------------
    | Classnames
    ---------------------------*/
    const selectSingleClassName = classnames({
        'SelectSingle': true,
    });
    const menuClassName = classnames({
        'Menu': true,
    });

    return (
        <div className={ selectSingleClassName }>
            SelectSingle
            <HiddenInputs />
            <ButtonDisplayText />
            <div className={ menuClassName }>
                <Items />
            </div>
        </div>
    );
});

export default SelectSingle;