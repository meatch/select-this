import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import Item from 'Item/Item';

describe("Item", () => {
    test("Should return Item", () => {
        const { container } = render(<Item />);
        getByText(container, "Item");
    });
});

