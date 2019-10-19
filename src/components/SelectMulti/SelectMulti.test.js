import { render, getByText, fireEvent } from "@testing-library/react";
import React from 'react';
import SelectMulti from './SelectMulti';

describe("SelectMulti", () => {
    test("Should return SelectMulti", () => {
        const { container } = render(<SelectMulti />);
        getByText(container, "SelectMulti");
    });
});

