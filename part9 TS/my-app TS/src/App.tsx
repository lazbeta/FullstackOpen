import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Total } from "./components/Total";
import { courseParts } from "./data/data";

const App = () => {
  const courseName = "Half Stack application development";
  return (
    <>
      <Header name={courseName}/>
      <Content/>
      <Total courseParts={courseParts}/>
    </>
  );
};

export default App;