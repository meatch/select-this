import React from 'react';
import classnames from 'classnames';

const Menu = (props) => {
    
    // const { selectState, dispatch } = useContext(selectContext);

    const theClassName = classnames({
        'Menu': true,
    });

    return (
        <div className={ theClassName }>
            {props.children}
        </div>
    );
};

export default Menu;