import React from "react";
import { render, screen } from "@testing-library/react";

import FrequencyOfBillingCreateDialogComponent from "../FrequencyOfBillingCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders frequencyOfBilling create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <FrequencyOfBillingCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("frequencyOfBilling-create-dialog-component"),
  ).toBeInTheDocument();
});
