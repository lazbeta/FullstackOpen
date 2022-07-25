

import { courseParts } from "../data/data";
import Part from "./Part";
export const Content = () => (
    <div>
        {courseParts.map((part, i) => {
            return <Part key={i} part={part} />;
        })}
    </div>
);