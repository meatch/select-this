import React from 'react';

const ButtonDisplay = React.forwardRef((props, buttonDisplayRef) => {
    return (
        <button
            ref={ buttonDisplayRef }
        >
            ButtonDisplay
        </button>
    );
});

export default ButtonDisplay;