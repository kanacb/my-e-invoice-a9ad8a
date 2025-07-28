import React from "react";
import { render, screen } from "@testing-library/react";

import EInvoiceTypesPage from "../EInvoiceTypesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders eInvoiceTypes page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EInvoiceTypesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("eInvoiceTypes-datatable")).toBeInTheDocument();
    expect(screen.getByRole("eInvoiceTypes-add-button")).toBeInTheDocument();
});
