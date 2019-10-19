import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import Items from './Items';

describe("Items", () => {
    test("Should return Items", () => {
        const { container } = render(<Items />);
        getByText(container, "Items");
    });
});

