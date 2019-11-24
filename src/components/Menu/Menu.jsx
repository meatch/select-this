import React from 'react';
// import styled from "@emotion/styled";
import classnames from 'classnames';
import styled from "@emotion/styled";
import { colors, fonts } from '../../styles';

const Menu = React.forwardRef((props, menuRef) => {
    
    // const { selectState, dispatch } = useContext(selectContext);

    const theClassName = classnames({
        'Menu': true,
    });

    return (
        <MenuStyled
            ref={ menuRef }
            className={ theClassName }
        >
            {props.children}
        </MenuStyled>
    );
});

export default Menu;

/*---------------------------
| Styles
---------------------------*/
const MenuStyled = styled.div`
    padding: 10px 0px;
`;