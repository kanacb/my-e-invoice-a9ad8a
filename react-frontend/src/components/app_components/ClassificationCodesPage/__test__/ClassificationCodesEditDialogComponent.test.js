import React from "react";
import { render, screen } from "@testing-library/react";

import ClassificationCodesEditDialogComponent from "../ClassificationCodesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders classificationCodes edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ClassificationCodesEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("classificationCodes-edit-dialog-component"),
  ).toBeInTheDocument();
});
