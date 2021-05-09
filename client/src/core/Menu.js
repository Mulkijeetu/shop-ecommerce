import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={isActive(history, "/")}>
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/shop" style={isActive(history, "/shop")}>
            Shop
          </Link>
        </li>

        <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                    <FontAwesomeIcon icon={faShoppingCart} /> {" "}
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
            </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/user/dashboard"
              style={isActive(history, "/user/dashboard")}
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/admin/dashboard"
              style={isActive(history, "/admin/dashboard")}
            >
              Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signin"
                style={isActive(history, "/signin")}
              >
                SignIn
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                style={isActive(history, "/signup")}
              >
                SignUp
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated && (
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
              style={{ cursor: "pointer", color: "#ffffff" }}
            >
              SignOut
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
