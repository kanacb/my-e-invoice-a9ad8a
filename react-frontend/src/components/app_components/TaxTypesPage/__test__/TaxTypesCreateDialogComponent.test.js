import React from "react";
import { render, screen } from "@testing-library/react";

import TaxTypesCreateDialogComponent from "../TaxTypesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders taxTypes create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TaxTypesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("taxTypes-create-dialog-component")).toBeInTheDocument();
});
