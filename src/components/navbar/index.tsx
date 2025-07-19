import React from "react";
import "./style.scss";
import { Link, Outlet } from "react-router-dom";

export const Navbar = () => {
  const [toggle, setToggle] = React.useState(false);
  const ref = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);

  return (
    <div className="container">
      <div className="burger-navbar" onClick={() => setToggle(!toggle)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={toggle ? "active-back" : ""}></div>
        <ul className={`navbar ${toggle && "active-navbar"}`} ref={ref}>
          <Link to="/">
            <li className="navbar-item">Добавление товара</li>
          </Link>
          <Link to="/product">
            <li className="navbar-item">Товары</li>
          </Link>
          <Link to="/category">
            <li className="navbar-item">Каталог</li>
          </Link>
          <Link to="/structura">
            <li className="navbar-item">Состав</li>
          </Link>
          <Link to="/color">
            <li className="navbar-item">Цвет</li>
          </Link>
          <Link to="/light">
            <li className="navbar-item">Свет</li>
          </Link>
          <Link to="/format">
            <li className="navbar-item">Формат</li>
          </Link>
        </ul>
      <Outlet />
    </div>
  );
};
