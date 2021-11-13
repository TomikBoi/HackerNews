import React from "react";
import { NavLink } from "react-router-dom";
import { ThemeConsumer } from "../contexts/theme";

export default function Nav() {
  return (
    <ThemeConsumer>
    {({ theme, toggleTheme }) => (
    <nav>
      <div className="row space-between">
        <ul className="row nav">
          <li>
            <NavLink exact to="/" className="nav-link">
              Top
            </NavLink>
          </li>
          <NavLink exact to="/new" className="nav-link">
            New
          </NavLink>
        </ul>
        <button 
        style={{ fontSize: 30 }} 
        className="btn-clear pointer"
        onClick={toggleTheme}>
          {theme === 'light' ? '🔦' : '💡'}
        </button>
      </div>
    </nav>
    )}
    </ThemeConsumer>
  );
}
