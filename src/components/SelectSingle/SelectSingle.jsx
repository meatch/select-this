import React from 'react';

import HiddenInputs from '../HiddenInputs/HiddenInputs.jsx';
import ButtonDisplayText from '../ButtonDisplayText/ButtonDisplayText.jsx';
import Menu from '../Menu/Menu.jsx';

import classnames from 'classnames';

const SelectSingle = () => {

    const theClassName = classnames({
        'SelectSingle': true,
    });

    return (
        <div className={ theClassName }>
            SelectSingle
            <HiddenInputs />
            <ButtonDisplayText />
            <Menu />
        </div>
    );
}

export default SelectSingle;