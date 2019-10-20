import React from 'react';
import SelectSingle from './components/SelectSingle/SelectSingle';
import SelectMulti from './components/SelectMulti/SelectMulti';

class SelectThis extends React.Component {

    static SelectSingle = SelectSingle;
    static SelectMulti = SelectMulti;

    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

export default SelectThis;