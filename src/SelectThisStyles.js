import styled from "@emotion/styled";

export const SelectThis = styled.div`
    border: solid 1px red;
    
    font-family: Helvetica;
    position: relative;
    width: 100%;

    &.modalIsOpen {
        position: relative;

        .MenuModal {

            &::before, &::after {
                display: block;
                content: " ";
                font-size: 0px;
                width: 0;
                height: 0;
                position: absolute;
                border-left: 12px solid transparent;
                border-right: 12px solid transparent;
                z-index: 1;

                top: -1px;
                border-bottom: 12px solid gray;
            }
            &::after {
                top: 0px;
                border-bottom-color: #eee;
            }
        }

        /* modalAlign Horizontal */
        &.modal-align-left    .MenuModal::before,
        &.modal-align-left    .MenuModal::after    { left: 9px;  }

        &.modal-align-right   .MenuModal::before,
        &.modal-align-right   .MenuModal::after    { right: 9px; }

        &.modal-align-center  .MenuModal::before,
        &.modal-align-center  .MenuModal::after    { left: 50%;  transform: translateX(-50%); }
    }

    /*---------------------------
    | MenuModal
    ---------------------------*/
    /* modalAlign Horizontal */
    &.modal-align-left .MenuModal { left: 0px; }
    &.modal-align-right .MenuModal { right: 0px; }
    &.modal-align-center .MenuModal {
        left: 50%;
        transform: translateX(-50%);
    }

    .MenuModal {
        position: absolute;
        top: 100%;
        z-index: 250;
        width: 321px;

        /* outline: dotted purple 2px; */

        .Menu {
            background-color: #eee;
            border-radius: 5px;
            border: 1px solid gray;

            margin-top: 10px;
            position: relative;
        }
    }
`;