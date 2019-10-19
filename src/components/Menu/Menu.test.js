import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import Menu from 'Menu/Menu';

describe("Menu", () => {
    test("Should return Menu", () => {
        const { container } = render(<Menu />);
        getByText(container, "Menu");
    });
});

