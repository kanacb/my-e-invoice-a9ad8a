import React from "react";
import { render, screen } from "@testing-library/react";

import PhoneNumberPrefixPage from "../PhoneNumberPrefixPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders phoneNumberPrefix page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PhoneNumberPrefixPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("phoneNumberPrefix-datatable")).toBeInTheDocument();
    expect(screen.getByRole("phoneNumberPrefix-add-button")).toBeInTheDocument();
});
