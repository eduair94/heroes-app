import { render, screen } from "@testing-library/react";
import React from "react";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { AuthContext } from "../../src/auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Tests in PrivateRoute", () => {
  const login = jest.fn();
  const logout = jest.fn();

  // Reset jest.fn before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should show the children component if the user is authenticated", () => {
    Storage.prototype.setItem = jest.fn();

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
        <MemoryRouter initialEntries={["/search?q=batman"]}>
          <PrivateRoute>
            <h1>PrivateRoute</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(screen.getByText("PrivateRoute")).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "lastPath",
      "/search?q=batman",
    );
  });

  test("should navigate if it's not authenticated", () => {
    const contextValue = {
      logged: false,
      login,
      logout,
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/marvel"]}>
          <Routes>
            <Route
              path="marvel"
              element={
                <PrivateRoute>
                  <h1>Marvel Page</h1>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<h1>Login Page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(screen.getByText("Login Page")).toBeTruthy();
  });
});
