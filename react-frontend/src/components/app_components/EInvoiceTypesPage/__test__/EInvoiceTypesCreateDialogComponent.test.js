import React from "react";
import { render, screen } from "@testing-library/react";

import EInvoiceTypesCreateDialogComponent from "../EInvoiceTypesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders eInvoiceTypes create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <EInvoiceTypesCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("eInvoiceTypes-create-dialog-component"),
  ).toBeInTheDocument();
});
