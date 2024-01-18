import { Link } from "react-router-dom";

function Root() {
  return (
    <>
      <h1>Home</h1>
      <Link to="/gameboy">GameBoy</Link>
    </>
  );
}

export default Root;
