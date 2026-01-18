import React from "react";
import { render, screen } from "@testing-library/react";

import MeasurementsCreateDialogComponent from "../MeasurementsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders measurements create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <MeasurementsCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("measurements-create-dialog-component"),
  ).toBeInTheDocument();
});
