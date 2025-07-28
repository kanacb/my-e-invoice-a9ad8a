import React from "react";
import { render, screen } from "@testing-library/react";

import BuyersPage from "../BuyersPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders buyers page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <BuyersPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("buyers-datatable")).toBeInTheDocument();
    expect(screen.getByRole("buyers-add-button")).toBeInTheDocument();
});
