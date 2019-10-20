import React from 'react';
import Item from '../Item/Item.jsx';
import classnames from 'classnames';

const Items = React.forwardRef((props, itemsRef) => {

    const theClassName = classnames({
        'Items': true,
    });
    return (
        <div 
            ref={ itemsRef }
            className={ theClassName }
        >
            Items
            <Item />
        </div>
    );
});

export default Items;