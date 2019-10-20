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