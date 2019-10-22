import React, { useContext } from 'react';
import SelectContext from '../../context/selectContext';
import styled from "@emotion/styled";

const AriaLabel = ({labelID}) => {
    const { selectState } = useContext(SelectContext);

    return (
        <AriaLabelStyled
            id={ labelID }
            aria-label={ selectState.originalProps.ariaLabel }
        >
            { selectState.originalProps.label }
        </AriaLabelStyled>
    );
}

export default AriaLabel;

/*---------------------------
| Styles
---------------------------*/
const AriaLabelStyled = styled.div`
    display: block;
    text-align: left;
    line-height: 1.2;
    margin-bottom: 8px;

    color: black;
    font-size: 15px;

    text-transform: lowercase;
    &::first-letter {
        text-transform: uppercase;
    }
`;