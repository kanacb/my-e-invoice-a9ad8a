import React from "react";
import { render, screen } from "@testing-library/react";

import TaxTypesEditDialogComponent from "../TaxTypesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders taxTypes edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TaxTypesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("taxTypes-edit-dialog-component")).toBeInTheDocument();
});
