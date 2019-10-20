import React from 'react';
import SelectHOC from '../../hocs/SelectHOC/SelectHOC';
import classnames from 'classnames';

import HiddenInputs from '../HiddenInputs/HiddenInputs.jsx';
import ButtonDisplayText from '../ButtonDisplayText/ButtonDisplayText.jsx';
import Header from '../Header/Header.jsx';
import Items from '../Items/Items.jsx';
import Footer from '../Footer/Footer.jsx';

const SelectMulti = SelectHOC(() => {

    /*---------------------------
    | Classnames
    ---------------------------*/
    const selectMultiClassName = classnames({
        'SelectMulti': true,
    });
    const menuClassName = classnames({
        'Menu': true,
    });

    return (
        <div className={ selectMultiClassName }>
            SelectMulti
            <Header />
            <HiddenInputs />
            <ButtonDisplayText />
            <div className={ menuClassName }>
                <Items />
            </div>
            <Footer />
        </div>
    );
});

export default SelectMulti;