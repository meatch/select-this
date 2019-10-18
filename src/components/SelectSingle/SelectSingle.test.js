import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import SelectSingle from 'SelectSingle/SelectSingle';

describe("SelectSingle", () => {
    test("Should return SelectSingle", () => {
        const { container } = render(<SelectSingle />);
        getByText(container, "SelectSingle");
    });
});

