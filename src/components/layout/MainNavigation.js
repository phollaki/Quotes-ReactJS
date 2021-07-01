import React from "react";
import styles from "./MainNavigation.module.css";
import { NavLink, Link } from "react-router-dom";
import { activeClassName } from "react-router-dom";
function MainNavigation() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/quotes">Great Quotes</Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/quotes" activeClassName={styles.active}>
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-quote" activeClassName={styles.active}>
              Add Quotes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
