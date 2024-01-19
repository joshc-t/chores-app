import React from "react";
import { render, screen } from "@testing-library/react";
import AddChore from "./AddChore";

test("renders learn react link", () => {
  render(<AddChore />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
