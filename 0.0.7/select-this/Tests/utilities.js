export const getKeyOfSelected = (unitedstates, currentState) => {
    let key = -1;

    unitedstates.forEach((item, idx) => {
        if (item.uID === currentState.currentlySelected.uID) {
            key = idx;
        }
    });

    return key;
};

export const clearMenu = (currentState) => {
    // console.log('Clear Menu');

    return {
        currentlySelected: [],
    };
};

export const nextItem = (unitedstates, currentState) => {
    let nextKey = getKeyOfSelected(unitedstates, currentState) + 1;

    if (nextKey >= unitedstates.length) {
        nextKey = 0;
    }

    if (!unitedstates[nextKey].selectable) {
        nextKey++;
    }

    // console.log('nextKey', unitedstates[nextKey]);

    return {
        currentlySelected: unitedstates[nextKey],
    };
};

export const prevItem = (unitedstates, currentState) => {

    // console.log('Prev Item', unitedstates, currentState);

    let prevKey = getKeyOfSelected(unitedstates, currentState) - 1;

    if (prevKey < 0) {
        prevKey = unitedstates.length - 1;
    }

    if (!unitedstates[prevKey].selectable) {
        prevKey--;
    }

    // console.log('prevKey', unitedstates[prevKey]);

    return {
        currentlySelected: unitedstates[prevKey],
    };
};

export const handleSelected = (items) => {
    console.log('User Updated Selected In Component', items);
};

export const updateStateForMe = (currentState) => {
    return {
        makeAStateChange: currentState.makeAStateChange + 1,
    };
};