import React from "react";
import { render, screen } from "@testing-library/react";

import ShippingPage from "../ShippingPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders shipping page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ShippingPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("shipping-datatable")).toBeInTheDocument();
    expect(screen.getByRole("shipping-add-button")).toBeInTheDocument();
});
