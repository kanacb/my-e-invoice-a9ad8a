import React from "react";
import { render, screen } from "@testing-library/react";

import CountryCodesEditDialogComponent from "../CountryCodesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders countryCodes edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CountryCodesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("countryCodes-edit-dialog-component")).toBeInTheDocument();
});
