import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import SelectHOC from './SelectHOC';

describe("SelectHOC", () => {
    test("Should return SelectHOC", () => {
        const { container } = render(<SelectHOC />);
        getByText(container, "SelectHOC");
    });
});

