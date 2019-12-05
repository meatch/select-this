import styled from "@emotion/styled";

export const colors = {
    white: '#fff',
    black: '#000',
    neutral: {
        light: '#ccc',
        semiLight: '#eee',
        mid: '#999',
        semiDark: '#666',
        dark: '#333',
    },
    hue: {
        light: '#acdcf1',
        semiLight: '#79c2e4',
        mid: '#4596bb',
        semiDark: '#206a8c',
        dark: '#0a364b',
    },
}

export const fonts = {
    primary: 'Helvetica, sans-serif',
    secondary: 'Georgia, serif',
}

export const SelectThis = styled.div`
    font-family: ${fonts.primary};
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

    /* https://gist.github.com/ffoodd/000b59f431e3e64e4ce1a24d5bb36034 */
    .sr-only {
        border: 0 !important;
        clip: rect(1px, 1px, 1px, 1px) !important;
        -webkit-clip-path: inset(50%) !important;
        clip-path: inset(50%) !important;
        height: 1px !important;
        margin: -1px !important;
        overflow: hidden !important;
        padding: 0 !important;
        position: absolute !important;
        width: 1px !important;
        white-space: nowrap !important;
    }
`;