import React from 'react';
import SelectHOC from '../../SelectHOC';
import Items from '../Items/Items.jsx';

const SelectSingle = SelectHOC((props) => {
    return (
        <Items />
    );
}, 'SelectSingle');

export default SelectSingle;