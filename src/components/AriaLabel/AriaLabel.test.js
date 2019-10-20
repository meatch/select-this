import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import AriaLabel from './AriaLabel';

describe("AriaLabel", () => {
    test("Should return AriaLabel", () => {
        const { container } = render(<AriaLabel />);
        getByText(container, "AriaLabel");
    });
});

