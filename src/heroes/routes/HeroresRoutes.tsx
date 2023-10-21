import { Routes, Route, Navigate } from "react-router-dom";
import { MarvelPage, DcPage, HeroPage, SearchPage } from "..";
import { Navbar } from "../../ui";

export const HeroresRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-2 mb-5">
        <Routes>
          <Route path="marvel" element={<MarvelPage />} />
          <Route path="dc" element={<DcPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="hero/:id" element={<HeroPage />} />

          <Route path="/" element={<Navigate to="marvel" />} />
        </Routes>
      </div>
    </>
  );
};
