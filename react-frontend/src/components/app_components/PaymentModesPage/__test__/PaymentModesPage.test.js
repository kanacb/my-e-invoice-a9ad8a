import React from "react";
import { render, screen } from "@testing-library/react";

import PaymentModesPage from "../PaymentModesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders paymentModes page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PaymentModesPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("paymentModes-datatable")).toBeInTheDocument();
  expect(screen.getByRole("paymentModes-add-button")).toBeInTheDocument();
});
