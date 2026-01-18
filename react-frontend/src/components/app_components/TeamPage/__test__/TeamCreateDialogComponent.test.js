import React from "react";
import { render, screen } from "@testing-library/react";

import TeamCreateDialogComponent from "../TeamCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders team create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <TeamCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("team-create-dialog-component")).toBeInTheDocument();
});
