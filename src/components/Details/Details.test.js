import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import Details from './Details';

describe("Details", () => {
    test("Should return Details", () => {
        const { container } = render(<Details />);
        getByText(container, "Details");
    });
});

