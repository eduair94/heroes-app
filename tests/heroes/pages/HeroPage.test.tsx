import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { HeroPage } from "../../../src/heroes/pages/HeroPage";
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";

jest.mock("../../../src/helpers/getBaseUrl", () => ({
  baseUrl: "",
}));

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Tests in <HeroPage/>", () => {
  test("should display the corresponding hero", () => {
    render(
      <MemoryRouter initialEntries={["/hero/dc-batman"]}>
        <Routes>
          <Route path="hero/:id" element={<HeroPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Batman")).toBeTruthy();
  });
  test("should navigate to marvel if the hero does not exist", () => {
    render(
      <MemoryRouter initialEntries={["/hero/dc-batman-123"]}>
        <Routes>
          <Route path="hero/:id" element={<HeroPage />} />
          <Route path="marvel" element={<h1>MarvelPage</h1>} />
          <Route path="/" element={<Navigate to="marvel" />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("MarvelPage")).toBeTruthy();
  });

  test("should go back to the previous page when back button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/hero/dc-batman"]}>
        <Routes>
          <Route path="hero/:id" element={<HeroPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const button = screen.getByLabelText("back-btn");
    fireEvent.click(button);
    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });
});
