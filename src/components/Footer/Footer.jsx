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
            Footer
        </FooterStyled>
    );
}

export default Footer;

/*---------------------------
| Styles
---------------------------*/
const FooterStyled = styled.footer`
    padding: 16px;
`;