import React from "react";
import { render, screen } from "@testing-library/react";

import IdentifyTypeEditDialogComponent from "../IdentifyTypeEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders identifyType edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IdentifyTypeEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("identifyType-edit-dialog-component")).toBeInTheDocument();
});
