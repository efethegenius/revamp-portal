import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/design-systems">Design Systems</Link> |{" "}
        <Link to="/onboarding">App</Link>
      </nav>
    </div>
  );
};

export default Home;
