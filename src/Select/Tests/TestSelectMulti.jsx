import React from 'react';
import SelectMulti from '../SelectMulti';
import { unitedstates } from './sample-data/unitedstates';
import { fruit } from './sample-data/fruit';

import * as Util from './utilities';

import './test.css';

class TestSelectMulti extends React.Component {
    constructor(props) {
        super(props);

        this.unitedstates = unitedstates;
        this.fruit = fruit;

        this.state = {
            currentlySelected: this.unitedstates[3],
            makeAStateChange: 1,
        };
    }

    clearMenu = () => {
        this.setState((currentState) => {
            return Util.clearMenu(currentState);
        });
    }

    nextItem = () => {
        this.setState((currentState) => {
            return Util.nextItem(unitedstates, currentState);
        });
    }

    prevItem = () => {
        this.setState((currentState) => {
            return Util.prevItem(unitedstates, currentState);
        });
    }

    updateStateForMe = () => {
        this.setState((currentState) => {
            return Util.updateStateForMe(currentState);
        });
    }

    render() {
        return (
            <div className={ 'root-container multi' }>
                <h1>Multi Select Test</h1>
                <div className='columns'>
                    <div>
                        <SelectMulti
                            key={ 'fruitMulti' }
                            items={ this.fruit }
                            onSelected={ this.handleSelected }
                        />
                    </div>
                    <div>
                        <SelectMulti
                            key={ 'unitedstatesMulti' }
                            items={ this.unitedstates }
                            setDefaultItems={ this.state.currentlySelected  }
                            setSelectedItems={ this.state.currentlySelected  }
                            onSelected={ Util.handleSelected }
                            // min={ 2 }
                        />
                        <div className={ 'buttons' }>
                            <button type='button' onClick={ this.updateStateForMe }>UPDATE PARENT STATE { this.state.makeAStateChange }</button>
                            <button type='button' onClick={ this.prevItem }>&lt;</button>
                            <button type='button' onClick={ this.nextItem }>&gt;</button>
                            <button type='button' onClick={ this.clearMenu }>Clear</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default TestSelectMulti;
