/**
 * clickOutside - Cross Browser Closure to detect clicking outside and array of selectdors
 * @author Mitch Gohman <mitchell.gohman@travelctm.com>
 * @version v1 (Created: 2019-09-17)
 *
 * Required Props
 * @constant {array} closestSelectors array of css selectors that you would like to click outside of
 *      - Sometiomes you have to specify children of the container.
 * @constant {method} callback call back method to fire when clicking outside of selectors
 *
 * clickOutside.addListener(); //adds Document listener
 * clickOutside.removeListener(); //removes Document listener
 *      Note: Listener is also removed automatically when click outside is used.
 *
 */
export const clickOutside = (closestSelectors, callback) => {

    const listener = (event) => {
        let isInside = false;

        // i.e.11 does not support element.closest('el.selector'),
        // need polyfill. babel-polyfill does not provide this either
        // https://www.npmjs.com/package/element-closest-polyfill
        closestSelectors.forEach(selector => {
            if (event.target.closest(selector)) {
                isInside = true;
            }
        });

        if (isInside) {
            // console.count('Clicked Inside Modal');
            return; //don't do anything if we are clicking in modal.
        } else {
            // console.count('Clicked Outside Modal');
            removeListener();
            callback();
        }
    };

    let isListening = false;

    const addListener = () => {
        if (!isListening) {
            isListening = true;
            document.addEventListener('click', listener);
        }
    };

    const removeListener = () => {
        if (isListening) {
            isListening = false;
            document.removeEventListener('click', listener);
        }
    };

    return {
        addListener: addListener,
        removeListener: removeListener,
    };
};