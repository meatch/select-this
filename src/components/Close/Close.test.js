import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import Close from './Close';

describe("Close", () => {
    test("Should return Close", () => {
        const { container } = render(<Close />);
        getByText(container, "Close");
    });
});

