import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import Header from 'Header/Header';

describe("Header", () => {
    test("Should return Header", () => {
        const { container } = render(<Header />);
        getByText(container, "Header");
    });
});

