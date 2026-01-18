import React from "react";
import { render, screen } from "@testing-library/react";

import MeasurementsEditDialogComponent from "../MeasurementsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders measurements edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <MeasurementsEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("measurements-edit-dialog-component"),
  ).toBeInTheDocument();
});
