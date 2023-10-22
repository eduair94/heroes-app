import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { HeroCard } from "../components";
import queryString from "query-string";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);
  const heroes = getHeroesByName(q as string);

  const showSearch = q === "";
  const showErrors = q && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form aria-label="form-hero" onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-2">Search</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />
          <div
            aria-label="search-hero"
            style={{ display: showSearch ? "" : "none" }}
            className="alert alert-primary animate__animated animate__fadeIn"
          >
            Search a hero
          </div>
          <div
            aria-label="alert-danger"
            style={{ display: showErrors ? "" : "none" }}
            className="alert alert-danger animate__animated animate__fadeIn"
          >
            No hero with <b>{q}</b>
          </div>
          <div className="row gy-3 row-cols-1 g-3">
            {heroes.map((hero) => (
              <HeroCard key={hero.id} {...hero} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
