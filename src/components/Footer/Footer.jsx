import React, { useContext } from 'react';
import selectContext from '../../context/selectContext';
import * as selectActions from '../../context/selectActions';
import * as Helpers from '../../utilities/helpers';
import styled from "@emotion/styled";
import { colors, fonts } from '../../styles';
import classnames from 'classnames';
import keycode from 'keycode';

const Footer = () => {

    const { selectState, dispatch } = useContext(selectContext);

    const handleContinue = () => {
        selectActions.itemsSave(selectState.items, dispatch);
        selectActions.setModalOpenState(false, dispatch);
    }

    const handleContinueKeyDown = (e) => {
        const theKeyCode = keycode(e);

        if (e.shiftKey && theKeyCode === 'tab') {
            return;
        }

        switch(theKeyCode) {
            case 'enter':
            case 'space':
            case 'tab':
                e.preventDefault();
                e.stopPropagation();
                handleContinue();
                break;
            default:
                return;
        }
    };

    return (
        <FooterStyled>
            <button
                type={ 'button' }
                className={ 'BtnContinue' }
                tabIndex={ 0 }

                onClick={ handleContinue }
                onKeyDown={ handleContinueKeyDown }
            >
                { selectState.originalProps.btnContinueText }
            </button>
        </FooterStyled>
    );
}

export default Footer;

/*---------------------------
| Styles
---------------------------*/
const FooterStyled = styled.footer`
    padding: 16px;
    border-top: solid 1px rgba(0,0,0,.3);

    button {
        display: block;
        background-color: #fff;
        border-radius: 5px;
        text-align: center;
        border: solid 3px ${colors.hue.semiDark};
        width: 100%;

        font-size: 18px;
        line-height: 48px;
    }
`;