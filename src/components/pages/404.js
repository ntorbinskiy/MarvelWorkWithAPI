import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
const Page404 = () => {
  return (
    <>
      <ErrorMessage />
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>
        Page doesn't exist
      </p>
      <Link
        style={{
          fontWeight: "bold",
          fontSize: "24px",
          marginTop: "30px",
          textAlign: "center",
          display: "block",
        }}
       to="/">Main Page</Link>
    </>
  );
};

export default Page404;
