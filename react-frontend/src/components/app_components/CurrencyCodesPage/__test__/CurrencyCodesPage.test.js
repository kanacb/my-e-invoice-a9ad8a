import React from "react";
import { render, screen } from "@testing-library/react";

import CurrencyCodesPage from "../CurrencyCodesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders currencyCodes page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CurrencyCodesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("currencyCodes-datatable")).toBeInTheDocument();
    expect(screen.getByRole("currencyCodes-add-button")).toBeInTheDocument();
});
