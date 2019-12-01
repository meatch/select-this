import React from 'react';
import styled from "@emotion/styled";
import classnames from 'classnames';

const Menu = (props) => {
    
    // const { selectState, dispatch } = useContext(selectContext);

    const theClassName = classnames({
        'Menu': true,
    });

    return (
        <MenuStyled className={ theClassName }>
            {props.children}
        </MenuStyled>
    );
};

export default Menu;

/*---------------------------
| Styles
---------------------------*/
const MenuStyled = styled.div`

    max-height: 300px;
    overflow: hidden;
    overflow-y: auto;

    ul {
        margin: 0;
        padding: 10px 0px;
    }
`;