import { useMemo } from "react";
import { getHeroresByPublisher } from "../helpers";
import { HeroCard } from ".";

export const HeroList = ({ publisher }: { publisher: string }) => {
  const heroes = useMemo(() => getHeroresByPublisher(publisher), [publisher]);
  return (
    <div className="row row-cols-1 row-cols-md-3 g-3">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};
