import React from 'react';
import SelectHOC from '../../SelectHOC';
import Header from '../Header/Header.jsx';
import Items from '../Items/Items.jsx';
import Footer from '../Footer/Footer.jsx';

const SelectMulti = SelectHOC((props) => {
    return (
        <>
            <Header />
            <Items />
            <Footer />
        </>
    );
}, 'SelectMulti');

export default SelectMulti;