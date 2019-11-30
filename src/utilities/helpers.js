/*---------------------------
| Items
---------------------------*/
export const getSelectedItems = (items) => {
    return items.filter(item => !!item.selected);
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

        (item.subItems) && item.subItems.forEach((subItem, subIdx) => {
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

