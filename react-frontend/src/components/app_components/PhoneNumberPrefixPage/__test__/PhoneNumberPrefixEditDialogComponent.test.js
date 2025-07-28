import React from "react";
import { render, screen } from "@testing-library/react";

import PhoneNumberPrefixEditDialogComponent from "../PhoneNumberPrefixEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders phoneNumberPrefix edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PhoneNumberPrefixEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("phoneNumberPrefix-edit-dialog-component")).toBeInTheDocument();
});
