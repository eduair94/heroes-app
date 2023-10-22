import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

jest.mock("../../../src/helpers/getBaseUrl", () => ({
  baseUrl: "",
}));

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Tests in <SearchPage/>", () => {
  test("should display properly with default values", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  test("It must show Batman and the input with the value queryString", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>,
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("batman");

    const img: HTMLImageElement = screen.getByRole("img");
    expect(img.src).toContain("batman");

    const error = screen.getByLabelText("alert-danger");
    expect(error.style.display).toBe("none");
  });

  test("It must show an error if the hero does not exist", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=non_existant"]}>
        <SearchPage />
      </MemoryRouter>,
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("non_existant");

    const error = screen.getByLabelText("alert-danger");
    expect(error.style.display).not.toBe("none");
  });

  test("It must call navigate in the new screen", () => {
    const searchText = "superman";
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>,
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const form = screen.getByLabelText("form-hero");
    fireEvent.input(input, {
      target: { name: "searchText", value: searchText },
    });
    fireEvent.submit(form);

    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${searchText}`);
  });
});
