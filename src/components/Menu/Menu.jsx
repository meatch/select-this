import React from 'react';
// import styled from "@emotion/styled";
import classnames from 'classnames';

const Menu = React.forwardRef((props, menuRef) => {
    
    // const { selectState, dispatch } = useContext(selectContext);

    const theClassName = classnames({
        'Menu': true,
    });

    return (
        <div
            ref={ menuRef }
            className={ theClassName }
        >
            {props.children}
        </div>
    );
});

export default Menu;