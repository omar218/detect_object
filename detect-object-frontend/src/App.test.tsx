import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const el = screen.getByText(/Drag and Drop your image/i);
  expect(el).toBeInTheDocument();
});
