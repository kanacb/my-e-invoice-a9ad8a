import React from "react";
import { render, screen } from "@testing-library/react";

import CurrencyCodesCreateDialogComponent from "../CurrencyCodesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders currencyCodes create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CurrencyCodesCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("currencyCodes-create-dialog-component"),
  ).toBeInTheDocument();
});
