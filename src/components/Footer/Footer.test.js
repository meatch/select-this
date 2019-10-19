import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import Footer from 'Footer/Footer';

describe("Footer", () => {
    test("Should return Footer", () => {
        const { container } = render(<Footer />);
        getByText(container, "Footer");
    });
});

