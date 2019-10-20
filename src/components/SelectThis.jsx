import React from 'react';
import SelectSingle from './SelectSingle/SelectSingle'

class SelectThis extends React.Component {

    static SelectSingle = SelectSingle;

    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

export default SelectThis;