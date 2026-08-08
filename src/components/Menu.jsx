import { Link } from "react-router";

const Menu = () => {
  return (
    <div className="menu">
      <h1>Menu</h1>
      <ul>
        <li>
          <Link
            to="/bfpl-sales-audit"
            className="menu-link"
          >
            BFPL Sales Audit
          </Link>
        </li>
        <li>
          <Link
            to="/bac-qb-tips"
            className="menu-link"
          >
            BAC QuickBooks Tips Re-Allocation
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;