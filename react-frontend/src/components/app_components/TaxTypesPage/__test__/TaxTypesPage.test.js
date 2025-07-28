import React from "react";
import { render, screen } from "@testing-library/react";

import TaxTypesPage from "../TaxTypesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders taxTypes page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TaxTypesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("taxTypes-datatable")).toBeInTheDocument();
    expect(screen.getByRole("taxTypes-add-button")).toBeInTheDocument();
});
