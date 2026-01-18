import React from "react";
import { render, screen } from "@testing-library/react";

import ClassificationCodesCreateDialogComponent from "../ClassificationCodesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders classificationCodes create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ClassificationCodesCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("classificationCodes-create-dialog-component"),
  ).toBeInTheDocument();
});
