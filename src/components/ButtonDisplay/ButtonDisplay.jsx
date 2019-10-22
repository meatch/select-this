import React, { useContext } from 'react';
import selectContext from '../../context/selectContext';
import * as selectActions from '../../context/selectActions';
import * as helpers from '../../utilities/helpers';
import styled from "@emotion/styled";

import classnames from 'classnames';
import keycode from 'keycode';

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
                <span>{ selectState.buttonDisplayText }</span>
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
        display: block;
        width: 100%;
        background-color: white;
        border: 2px solid gray;
        border-radius: 2px;
        padding: 0px 10px;
        font-size: 15px;
        color: #525252;
        margin: 0px;
        height: 100%;

        display: flex;
        align-items: center;
        overflow: hidden;

        span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 20px;
            line-height: 1.2;
        }

        &.defaultText {
            span {
                text-transform: lowercase;
                &::first-letter {
                    text-transform: uppercase;
                }
            }
        }

        position: relative;
        /* .glyphicon-menu-down {
            position: absolute;
            right: 12px;

            top: 50%;
            transform: translate(0, -50%) rotate(0deg);

            font-size: 16px;
            color: #999;
            cursor: pointer;

            transition: all .3s;
        }

        &[aria-expanded="true"] {
            .glyphicon-menu-down {
                transform: translate(0, -50%) rotate(180deg);
            }
        } */

        &:focus {
            border-color: teal;
        }
    }
`;
