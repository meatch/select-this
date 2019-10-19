import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import HiddenInputs from './HiddenInputs';

describe("HiddenInputs", () => {
    test("Should return HiddenInputs", () => {
        const { container } = render(<HiddenInputs />);
        getByText(container, "HiddenInputs");
    });
});

