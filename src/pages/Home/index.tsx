import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "32px", fontFamily: "Arial, sans-serif" }}>
      <h1>Home</h1>
      <nav style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
        <Link to="/search">Search</Link>
        <Link to="/results">Results</Link>
        <Link to="/account">Account</Link>
      </nav>
    </div>
  );
}