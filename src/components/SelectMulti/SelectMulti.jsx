import React from 'react';
import SelectHOC from '../../SelectHOC';
import Header from '../Header/Header.jsx';
import Items from '../Items/Items.jsx';
import Footer from '../Footer/Footer.jsx';

export const SelectMulti = SelectHOC(React.forwardRef((props, itemsRef) => {
    return (
        <>
            <Header />
            <Items ref={ itemsRef } />
            <Footer />
        </>
    );
}), 'SelectMulti');