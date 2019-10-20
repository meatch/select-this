// export { default as Button } from 'components/Button/Button.js';
import SelectSingle from 'components/SelectSingle/SelectSingle.jsx'; 
export default SelectSingle;
// import SelectMulti from 'components/SelectMulti/SelectMulti.jsx'; 

/*
    Once I get this working, I should be able to do something like this

    const SelectThis = {
        SelectSingle: SelectSingle,
        SelectMulti: SelectMulti,
    }
    export default SelectThis;
    export const SelectSingle;
    export const SelectMulti;

    # Named Imports
    import { SelectSingle, SelectMulti } from 'select-this';
    
    <SelectSingle />
    <SelectMulti />
    
    
    # Destructure
    import SelectThis from 'select-this';

    <SelectThis.SelectSingle />
    <SelectThis.SelectMulti />
*/

// export { default as SelectMulti } from 'components/SelectMulti/SelectMulti.jsx';