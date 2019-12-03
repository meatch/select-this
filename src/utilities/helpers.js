/*---------------------------
| Items
---------------------------*/
export const getSelectedItems = (items) => {
    // Have to account for sub items too, ok to just return a flat array of selected?

    let selected = [];

    items.forEach((item) => {
        if (!!item.selected) {
            selected.push(item);
        }

        (item.subItems) && item.subItems.forEach((subItem) => {
            if (!!subItem.selected) {
                selected.push(subItem);
            }
        });
    });

    return selected;
}
export const getNumberOfSelected = (items) => {
    const itemsSelected =  getSelectedItems(items);
    return itemsSelected.length;
}
export const hasSelectedItems = (items) => {
    const numSelected =  getNumberOfSelected(items);
    return (numSelected > 0);
}
export const getItemToActivateFromDomListItem = (items, domListItem) => {
    // get item from our internal items array based on id
    const idToSelect = domListItem.dataset.id.toString();

    let itemToActivate = false;

    items.forEach(item => {

        (item.subItems) && item.subItems.forEach((subItem) => {
            if (subItem.id.toString() === idToSelect) {
                itemToActivate = subItem;
            }
        });

        if (item.id.toString() === idToSelect) {
            itemToActivate = item;
        }
    });

    return itemToActivate;
}

