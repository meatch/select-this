import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import Title from 'Title/Title';

describe("Title", () => {
    test("Should return Title", () => {
        const { container } = render(<Title />);
        getByText(container, "Title");
    });
});

