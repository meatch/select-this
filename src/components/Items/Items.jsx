import React from 'react';
import Item from '../Item/Item.jsx';
import classnames from 'classnames';

const Items = () => {

    const theClassName = classnames({
        'Items': true,
    });
    return (
        <div className={ theClassName }>
            Items
            <Item />
        </div>
    );
}

export default Items;