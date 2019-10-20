import { useContext } from 'react';
import selectContext from './selectContext';
import { actionTypes } from './selectActionTypes';


export const actionCreator = () => {

    console.log('Action Creator');

    // const { selectState, dispatch } = useContext(selectContext);

    // console.log('Current selectState', selectState);

    // dispatch({
    //     type: actionTypes.SOME_UPPERCASE_ACTION_TYPE, 
    //     someProp: someValue
    // });
}