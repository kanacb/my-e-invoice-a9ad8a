import React from "react";
import { render, screen } from "@testing-library/react";

import ShippingCreateDialogComponent from "../ShippingCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders shipping create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ShippingCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("shipping-create-dialog-component"),
  ).toBeInTheDocument();
});
