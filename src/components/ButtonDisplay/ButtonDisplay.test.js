import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import ButtonDisplay from './ButtonDisplay';

describe("ButtonDisplay", () => {
    test("Should return ButtonDisplay", () => {
        const { container } = render(<ButtonDisplay />);
        getByText(container, "ButtonDisplay");
    });
});

