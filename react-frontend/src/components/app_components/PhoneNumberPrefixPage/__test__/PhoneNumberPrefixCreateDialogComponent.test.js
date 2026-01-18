import React from "react";
import { render, screen } from "@testing-library/react";

import PhoneNumberPrefixCreateDialogComponent from "../PhoneNumberPrefixCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders phoneNumberPrefix create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PhoneNumberPrefixCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("phoneNumberPrefix-create-dialog-component"),
  ).toBeInTheDocument();
});
