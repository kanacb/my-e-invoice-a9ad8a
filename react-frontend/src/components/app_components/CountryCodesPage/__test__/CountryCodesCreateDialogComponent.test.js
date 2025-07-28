import React from "react";
import { render, screen } from "@testing-library/react";

import CountryCodesCreateDialogComponent from "../CountryCodesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders countryCodes create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CountryCodesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("countryCodes-create-dialog-component")).toBeInTheDocument();
});
