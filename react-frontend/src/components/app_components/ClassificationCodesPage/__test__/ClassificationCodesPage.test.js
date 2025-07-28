import React from "react";
import { render, screen } from "@testing-library/react";

import ClassificationCodesPage from "../ClassificationCodesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders classificationCodes page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ClassificationCodesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("classificationCodes-datatable")).toBeInTheDocument();
    expect(screen.getByRole("classificationCodes-add-button")).toBeInTheDocument();
});
