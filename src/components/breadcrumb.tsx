import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();

  const path = location.pathname.split("/").filter(Boolean);

  const crumbs = [
    { label: "Home", to: "/" },
    ...path.map((segment, index) => {
      const url = "/" + path.slice(0, index + 1).join("/");
      const label = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      return { label, to: url };
    }),
  ];

  return (
    <nav className="breadcrumb">
      {crumbs.map((c, i) => (
        <span key={i}>
          {i < crumbs.length - 1 ? (
            <Link to={c.to} className="crumb-link">
              {c.label}
            </Link>
          ) : (
            <span className="crumb-current">{c.label}</span>
          )}
          {i < crumbs.length - 1 && <span className="crumb-separator"> / </span>}
        </span>
      ))}
    </nav>
  );
}
