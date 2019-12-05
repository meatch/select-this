import React, { useContext } from 'react';
import selectContext from '../../context/selectContext';
import * as selectActions from '../../context/selectActions';
import * as Helpers from '../../utilities/helpers';
import styled from "@emotion/styled";
import keycode from 'keycode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTimes
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {

    const { selectState, dispatch } = useContext(selectContext);

    const itemsSelected = Helpers.getSelectedItems(selectState.items);

    const handleClose = () => {
        // revert choices to last saved state
        selectActions.itemsRestore(selectState.itemsSaved, dispatch);
        selectActions.setModalOpenState(false, dispatch);
    }
    const itemsClear = () => {
        // remove all selections
        selectActions.itemsClear(selectState.items, dispatch);
    }

    const handleClearAllKeyDown = (e) => {
        switch(keycode(e)) {
            case 'enter':
            case 'space':
                e.preventDefault();
                itemsClear();
                break;
            default:
                return;
        }
    };

    const handleCloseKeyDown = (e) => {
        const theKeyCode = keycode(e);

        if (e.shiftKey && theKeyCode === 'tab') {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
            return;
        }

        switch(theKeyCode) {
            case 'enter':
            case 'space':
                e.preventDefault();
                e.stopPropagation();
                handleClose();
                break;
            default:
                return;
        }
    };

    const renderMaxSelectionText = () => {
        // Max
        const reachedMax = selectState.reachedMax;
        const maxSelection = selectState.originalProps.max;

        // Min
        // const reachedMin = selectState.reachedMin;
        // const minSelection = selectState.originalProps.min;

        
        const itemCount = itemsSelected.length;

        let maxSelectionText = `${itemCount}/${maxSelection} selected`;

        if (itemCount === 0) {
            maxSelectionText = `Select up to ${maxSelection}`;
        } else if (reachedMax) {
            maxSelectionText = `${itemCount} selected, max reached`;
        }
        return maxSelectionText;
    };

    return (
        <HeaderStyled>
            <button
                tabIndex={ 0 }
                type={ 'button' }
                className={ 'close' }
                onClick={ handleClose }
                onKeyDown={ handleCloseKeyDown }
            >
                <span className={ 'sr-only' }>{ `Close the Select a ${ selectState.originalProps.label } Drop Down` }</span>
                <FontAwesomeIcon icon={faTimes} className={ 'close-button-icon' } aria-hidden />
            </button>
            <h2>Select <span className={ 'title' }>{ selectState.originalProps.label }</span>(s)</h2>
            <aside>
                <span className={ 'maxSelection' }>({
                    renderMaxSelectionText()
                })</span>
                <span
                    onClick={ itemsSelected.length > 0 ? itemsClear : null }
                    onKeyDown={ itemsSelected.length > 0 ? handleClearAllKeyDown : null }
                    aria-label={ 'Clear All Selections' }
                    className={ 'clearAll' }
                    tabIndex={ itemsSelected.length > 0 ? '0' : null }
                    hidden={ itemsSelected.length === 0 }
                >
                    { itemsSelected.length > 0 && 'Clear all' }
                </span>
            </aside>
        </HeaderStyled>
    );
}

export default Header;

/*---------------------------
| Styles
---------------------------*/
const HeaderStyled = styled.header`
    padding: 16px;
    border-bottom: solid 1px rgba(0,0,0,.3);

    color: #333;
    font-family: Helvetica;

    button.close {
        display: block;
        opacity: .7;

        position: absolute;
        top: 16px; right: 16px;

        width: 22px; height: 22px;

        color: #333;

        padding: 0;
        margin: 0;

        outline: none;
        border: none;

        background-color: transparent;


        &:hover { opacity: 1; }
        &:focus { 
            opacity: 1; 
            outline: dotted 1px gray;
            outline-offset: 3px;
        }

        svg.close-button-icon {
            display: block;
            width: 100%; height: 100%;
        }
    }
    h2 {
        margin: 0 0 5px;
        color: #333;
        font-size: 18px;
        font-weight: bold;
        span.title {
            text-transform: lowercase;
        }
    }
    aside {
        line-height: 1.2;
        font-size: 11px;

        .reachedMax {
            font-weight: bold;
            color: black;
        }
        .clearAll {
            cursor: pointer;
            color: teal;
            font-family: Helvetica;
            margin-left: 12px;
        }
    }
`;