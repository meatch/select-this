import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import ButtonDisplayText from 'ButtonDisplayText/ButtonDisplayText';

describe("ButtonDisplayText", () => {
    test("Should return ButtonDisplayText", () => {
        const { container } = render(<ButtonDisplayText />);
        getByText(container, "ButtonDisplayText");
    });
});

