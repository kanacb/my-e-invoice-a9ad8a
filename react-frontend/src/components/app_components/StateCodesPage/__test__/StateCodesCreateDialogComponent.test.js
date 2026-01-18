import React from "react";
import { render, screen } from "@testing-library/react";

import StateCodesCreateDialogComponent from "../StateCodesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders stateCodes create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <StateCodesCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("stateCodes-create-dialog-component"),
  ).toBeInTheDocument();
});
