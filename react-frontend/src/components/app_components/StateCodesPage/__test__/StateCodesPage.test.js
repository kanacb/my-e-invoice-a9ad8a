import React from "react";
import { render, screen } from "@testing-library/react";

import StateCodesPage from "../StateCodesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders stateCodes page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StateCodesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("stateCodes-datatable")).toBeInTheDocument();
    expect(screen.getByRole("stateCodes-add-button")).toBeInTheDocument();
});
