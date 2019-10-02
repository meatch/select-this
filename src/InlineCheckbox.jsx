import React from 'react';
import classnames from 'classnames';


class InlineCheckbox extends React.Component {
    static defaultProps = {
        checkboxChecked: false,
        labelText: 'Inline Label Text',
        altText: 'InlineCheckboxContainer Alternate Text',
        inputID: 'UniqueChkbxID',
        inputName: 'InputNameToSubmit',
        toggleHandler: function() {
            console.log('toggleHandler Not Defined');
        },
    }

    constructor(props) {
        super(props);

        this.state = {
            checkboxChecked: this.props.checkboxChecked,
        }
    }

    toggleCheckboxChecked = () => {
        const checkboxChecked = !this.state.checkboxChecked;
        this.props.toggleHandler(checkboxChecked);
        this.setState({checkboxChecked});
    }

    handleKeyPressOnCheckbox(e) {
        if (e.charCode === 13 || e.charCode === 32) {
            e.preventDefault();
            this.toggleCheckboxChecked();
        }
    }

    render() {


        const conatinerClass = classnames({
            'InlineCheckboxContainer': true,
            [this.props.className]: this.props.className,
        });

        return (
            <div className={ conatinerClass }>
                <label
                    data-name={ this.props.altText }
                    role='checkbox'
                    htmlFor={ this.props.inputID }
                    tabIndex={ this.props.tabIndex || '0' }
                    aria-checked={ this.state.checkboxChecked }
                    onKeyPress={ (e) => { this.handleKeyPressOnCheckbox(e); } }
                >
                    <div className={ 'InlineCheckbox' }>
                        <input
                            data-name={ this.props.altText }
                            type='checkbox'
                            aria-live='assertive'
                            id={ this.props.inputID }
                            name={ this.props.inputName }
                            checked={ this.state.checkboxChecked }
                            onChange={ this.toggleCheckboxChecked }
                        />
                        <div className={ 'facade' } />
                    </div>
                    <div className={ 'text' }>
                        <span>{ this.props.labelText }</span>
                    </div>
                </label>
            </div>
        );
    }

}   


export default InlineCheckbox;