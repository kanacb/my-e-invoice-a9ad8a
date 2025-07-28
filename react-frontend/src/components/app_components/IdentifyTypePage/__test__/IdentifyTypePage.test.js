import React from "react";
import { render, screen } from "@testing-library/react";

import IdentifyTypePage from "../IdentifyTypePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders identifyType page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IdentifyTypePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("identifyType-datatable")).toBeInTheDocument();
    expect(screen.getByRole("identifyType-add-button")).toBeInTheDocument();
});
