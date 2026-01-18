import React from "react";
import { render, screen } from "@testing-library/react";

import ShippingEditDialogComponent from "../ShippingEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders shipping edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ShippingEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("shipping-edit-dialog-component"),
  ).toBeInTheDocument();
});
