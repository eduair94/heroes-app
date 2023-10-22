import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";
import React from "react";

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Tests in NavBar", () => {
  const name = "Juan";
  const contextValue = {
    logged: true,
    user: {
      id: "ID",
      name: name,
    },
    login: jest.fn(),
    logout: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test("debe verse el nombre de la persona logueada", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>,
    );
    expect(screen.getByText(name)).toBeTruthy();
  });

  test("cuando se hace click en el logout que se llame el logout y se haga el redirect", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByLabelText("logout"));
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
