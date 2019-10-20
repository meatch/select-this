import React, { useContext } from 'react';
import selectContext from '../../context/selectContext';
import * as selectActions from '../../context/selectActions';
import * as helpers from '../../utilities/helpers';

import classnames from 'classnames';
import keycode from 'keycode';

const ButtonDisplay = React.forwardRef((props, buttonDisplayRef) => {

    const { selectState, dispatch } = useContext(selectContext);

    const buttonClick = () => {
        selectActions.setModalOpenState(!selectState.modalIsOpen, dispatch);
    }

    const buttonKeyDown = (e) => {
        switch(keycode(e)) {
            case 'enter':
            case 'space':
                e.preventDefault();
                buttonClick();
                break;
            default:
                return;
        }
    }

    const buttonDisplayClassName = classnames({
        'ButtonDisplay': true,
        'defaultText': !helpers.hasSelectedItems(selectState.items),
    });

    return (
        <button
            ref={ buttonDisplayRef }
            className={ buttonDisplayClassName }
            onClick={ buttonClick }
            onKeyDown={ buttonKeyDown }
        >
            { selectState.buttonDisplayText }
        </button>
    );
});

export default ButtonDisplay;