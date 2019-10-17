import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import Button from 'components/Button';

describe("Button", () => {
    test("Should display text", () => {
        const { container } = render(<Button text="We salute you!" />);

        getByText(container, "We salute you!");
    });
});

describe("Clickable Button", () => {
    test("Should Handle Click Events", () => {
    
        const onClickMock = jest.fn();
        const { container } = render(
            <Button text="Click Me" onClick={onClickMock} />
        );

        const component = container.firstChild;

        fireEvent.click(component);

        expect(onClickMock).toBeCalled();

    });
});

