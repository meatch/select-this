import React, { useContext } from 'react';
import classnames from 'classnames';
import keycode from 'keycode';
import SelectContext from '../js/SelectContext';

const ListItem = ({item, idx, handleItemSelect, isSelected, className=false}) => {

    const { selectState } = useContext(SelectContext);

    const handleMenuListKeyDown = (e, item) => {
        switch(keycode(e)) {
            case 'enter':
            case 'space':
                e.preventDefault();
                handleItemSelect(item);
                break;
            default:
                return;
        }
    };

    const isSelectable = (item.selectable)  ? item.selectable : false;

    const menuItemClassName = classnames({
        [className]: className,
        'isSelectable': isSelectable,
        'isSelected': isSelected,
        'hasChildren': item.hasChildren,
    });

    const itemUniqueIDKey = `${selectState.id}_${item.uID}`;

    return (
        <li
            id={ itemUniqueIDKey }
            role={ 'option' }
            aria-selected={ !!isSelected }
            className={ menuItemClassName }
            key={ itemUniqueIDKey }
            tabIndex={ -1 }
            onKeyDown={ isSelectable ? (e) => { handleMenuListKeyDown(e, item); } : null  }
            onClick={ isSelectable ? () => { handleItemSelect(item); } : null }
            data-value={ `${item.value}` }
            data-uid={ `${item.uID}` }
        >
            <span className={ 'title' }>{item.displayText}</span>
        </li>
    );
};

export { ListItem as default };