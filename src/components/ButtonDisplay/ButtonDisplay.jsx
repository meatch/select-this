import React, { useContext } from 'react';
import selectContext from '../../context/selectContext';
import * as selectActions from '../../context/selectActions';
import * as helpers from '../../utilities/helpers';
import styled from "@emotion/styled";
import { colors, fonts } from '../../styles';

import classnames from 'classnames';
import keycode from 'keycode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';

const ButtonDisplay = React.forwardRef(({ labelID, menuModalId }, buttonDisplayRef) => {

    const { selectState, dispatch } = useContext(selectContext);

    /*---------------------------
    | Listeners
    ---------------------------*/
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

    /*---------------------------
    | Rendering
    ---------------------------*/    
    const renderAriaLabel = () => {
        let toMakeASelection = (selectState.selectType === 'Multi') ? 'selections': 'a selection';
        let currentSelections = '';

        const selectedItems = helpers.getSelectedItems(selectState.items);
        const itemCount = selectedItems.length;

        if (itemCount > 0) {
            const lastKey = itemCount - 1;

            let itemNames = selectedItems.reduce((a, b, idx) => {
                let appendedText;

                switch(idx) {
                    case 0:
                        appendedText = b.displayText;
                        break;
                    case lastKey:
                        appendedText = ` and ${b.displayText}`;
                        break;
                    default:
                        appendedText = `, ${b.displayText}`;
                        break;
                }
                return a + appendedText;
            }, '');

            currentSelections = (itemCount > 1) ? ` Current selections are ${itemNames}`: ` Current selection is ${itemNames}`;
        }

        return `${selectState.originalProps.label} popover toggle button. Press enter to make ${toMakeASelection} and use arrow keys to navigate. ${currentSelections}`;
    };

    /*---------------------------
    | Classname
    ---------------------------*/
    const buttonDisplayClassName = classnames({
        'ButtonDisplay': true,
        'defaultText': !helpers.hasSelectedItems(selectState.items),
    });

    return (
        <ButtonDisplayStyled
            className={ buttonDisplayClassName }
        >
            <button
                ref={ buttonDisplayRef }
                tabIndex={ 0 }
                aria-label={ renderAriaLabel() }
                aria-haspopup={ 'true' }
                aria-controls={ menuModalId }
                aria-labelledby={ labelID }
                aria-expanded={ selectState.modalIsOpen }

                onClick={ buttonClick }
                onKeyDown={ buttonKeyDown }
            >
                <span className={ 'text' }>{ selectState.buttonDisplayText }</span>
                <span className={ 'caret' }><FontAwesomeIcon icon={faAngleDown} /></span>
            </button>
        </ButtonDisplayStyled>
    );
});

export default ButtonDisplay;

/*---------------------------
| Styles
---------------------------*/
const ButtonDisplayStyled = styled.div`
    height: 44px;
    button {
        font-size: 18px;
        color: ${colors.neutral.semiDark};
        border: 2px solid ${colors.neutral.mid};
        background-color: ${colors.white};

        display: block;
        width: 100%;
        border-radius: 2px;
        padding: 0px 10px;
        margin: 0px;
        height: 100%;

        display: flex;
        align-items: center;
        overflow: hidden;

        span.text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 20px;
            line-height: 1.2;
        }

        &.defaultText {
            span.text {
                text-transform: lowercase;
                &::first-letter {
                    text-transform: uppercase;
                }
            }
        }

        position: relative;
        span.caret {
            position: absolute;
            right: 6px;
            width: 30px;
            height: 30px;

            top: 50%;
            transform: translate(0, -50%) rotate(0deg);

            font-size: 16px;
            cursor: pointer;

            transition: all .3s;

            svg {
                width: 100%;
                height: 100%;
            }
        }

        &[aria-expanded="true"] {
            span.caret {
                transform: translate(0, -50%) rotate(180deg);
            }
        }

        &:focus, 
        &:active, 
        &:hover { 
            outline: none;
            color: ${colors.hue.semiDark};
            border-color: ${colors.hue.semiDark};
        }
    }
`;
