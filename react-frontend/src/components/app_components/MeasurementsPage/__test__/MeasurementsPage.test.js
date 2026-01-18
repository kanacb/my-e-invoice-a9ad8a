import React from "react";
import { render, screen } from "@testing-library/react";

import MeasurementsPage from "../MeasurementsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders measurements page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <MeasurementsPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("measurements-datatable")).toBeInTheDocument();
  expect(screen.getByRole("measurements-add-button")).toBeInTheDocument();
});
