import React from "react";
import { render, screen } from "@testing-library/react";

import CountryCodesPage from "../CountryCodesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders countryCodes page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CountryCodesPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("countryCodes-datatable")).toBeInTheDocument();
  expect(screen.getByRole("countryCodes-add-button")).toBeInTheDocument();
});
