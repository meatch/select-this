import React, { useContext } from 'react';
import SelectContext from '../js/SelectContext';
import keycode from 'keycode';
import classnames from 'classnames';

const BtnHero = React.forwardRef(({multiMessage, btnHeroToggle}, btnHeroRef) => {
    const { selectState } = useContext(SelectContext);

    const handleKeyDown = (e) => {
        switch(keycode(e)) {
            case 'enter':
            case 'space':
            case 'down':
                e.preventDefault();
                btnHeroToggle();
                break;
            default:
                return;
        }
    };

    const renderDisplayText = () => {
        let displayText = selectState.btnHeroText;
        const itemCount = selectState.itemsSelected.length;

        if (itemCount > 1) {
            displayText = `${itemCount} ${multiMessage}`;
        }
        else if (itemCount === 1) {
            displayText = selectState.itemsSelected[0].displayText;
        }
        return displayText;
    };

    const renderAriaLabel = () => {
        let toMakeASelection = (selectState.selectType === 'Multi') ? 'selections': 'a selection';
        let currentSelections = '';
        const itemCount = selectState.itemsSelected.length;

        if (itemCount > 0) {
            const lastKey = itemCount - 1;

            let itemNames = selectState.itemsSelected.reduce((a, b, idx) => {
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

        return `${selectState.ariaLabel} popover toggle button. Press enter to make ${toMakeASelection} and use arrow keys to navigate. ${currentSelections}`;
    };

    const btnClassName = classnames({
        'BtnHero': true,
        'defaultText': selectState.itemsSelected.length < 1,
    });

    return (
        <button
            className={ btnClassName }
            aria-label={ renderAriaLabel() }
            type={ 'button' }
            onClick={ btnHeroToggle }
            onKeyDown={ handleKeyDown }
            tab-index={ 0 }
            ref={ btnHeroRef }
            aria-haspopup='true'
            aria-describedby={ `id-error-${selectState.errorName}` }
            aria-controls={ `MenuModalPanel-${selectState.id}` }
            aria-expanded={ selectState.modalIsOpen }
            data-aut={ selectState.dataAut }

        >
            <span className={ 'display-text' }>{ renderDisplayText() }</span>
            <span className={ 'glyphicon glyphicon-menu-down' } />
        </button>
    );
});

export default BtnHero;