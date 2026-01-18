import React from "react";
import { render, screen } from "@testing-library/react";

import CurrencyCodesEditDialogComponent from "../CurrencyCodesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders currencyCodes edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CurrencyCodesEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("currencyCodes-edit-dialog-component"),
  ).toBeInTheDocument();
});
