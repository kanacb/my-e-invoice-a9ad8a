import React from "react";
import { render, screen } from "@testing-library/react";

import FrequencyOfBillingPage from "../FrequencyOfBillingPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders frequencyOfBilling page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FrequencyOfBillingPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("frequencyOfBilling-datatable")).toBeInTheDocument();
    expect(screen.getByRole("frequencyOfBilling-add-button")).toBeInTheDocument();
});
