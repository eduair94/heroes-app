import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";
import React from "react";

jest.mock("../../src/helpers/getBaseUrl", () => ({
  baseUrl: "",
}));

describe("Tests in <AppRouter/>", () => {
  const login = jest.fn();
  const logout = jest.fn();
  test("debe mostrar el login si no está autenticado", () => {
    const contextValue = {
      logged: false,
      login,
      logout,
    };
    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getAllByText("Login").length).toBe(2);
  });

  test("debe de mostrar el componente de Marvel si está autenticado", () => {
    const contextValue = {
      logged: true,
      user: {
        id: "ID",
        name: "Nombre",
      },
      login,
      logout,
    };
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getAllByText("Marvel").length).toBeGreaterThanOrEqual(1);
  });
});
