import { render, screen } from "@testing-library/react";
import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth";
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";

describe("Test in PublicRoute", () => {
  const login = jest.fn();
  const logout = jest.fn();

  // Reset jest.fn before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should show the component if the user is not authenticated", () => {
    const contextValue = {
      logged: false,
      login,
      logout,
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Ruta públia</h1>
        </PublicRoute>
      </AuthContext.Provider>,
    );

    expect(screen.getByText("Ruta públia")).toBeTruthy();
  });

  test("should navigate if it's authenticated", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "Juan",
        id: "test",
      },
      login,
      logout,
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Ruta públia</h1>
                </PublicRoute>
              }
            />
            <Route path="marvel" element={<h1>Marvel Page</h1>}></Route>
            <Route path="/" element={<Navigate to="marvel" />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(screen.getByText("Marvel Page")).toBeTruthy();
  });
});
