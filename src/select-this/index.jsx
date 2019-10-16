import React from 'react';

const SelectThis = (props) => {
    const children = props.children
        ? <span>{props.children}</span>
        : false;
    
    return (
        <div>
            <h1>Select This YOE!</h1>
            {children}
        </div>
    );

}
export default SelectThis;