import { Link } from "react-router";

import "./_menu.scss";

const Menu = () => {
  const menuItems = [
    {
      title: "BFPL Sales Audit",
      description: "Upload two CSV files to identify discrepancies instantly.",
      link: "/bfpl-sales-audit",
      icon: "bfpl-sales-audit-icon",
      buttonLabel: "Launch"
    },
    {
      title: "BAC QuickBooks Tips Re-Allocation",
      description: "Re-allocate BAC QuickBooks tips",
      link: "/bac-qb-tips",
      icon: "bac-qb-tips-icon",
      buttonLabel: "Launch"
    }
  ];

  return (
    <main className="main-container menu">
      <section className="heading-container">
        <div className="menu-header container">
          <div className="row">
            <h1 className="heading">ONYX Tools Menu</h1>
            <p className="body">Select a utility below to begin</p>
          </div>
        </div>
      </section>
      <section className="content-container">
        <div className="menu-items container">
          <div className="row">
            {
              menuItems.map((item, index) => (
                <div className="menu-item col-12 col-md-6" key={index}>
                  <Link
                    to={item.link}
                    className="menu-link"
                  >
                    <div className="menu-item-content">
                      <div className="menu-icon-container">
                        <div className={`menu-icon ${item.icon}`}></div>
                      </div>
                      <div className="menu-item-text-container">
                        <h2 className="menu-item-title tile-label">{item.title}</h2>
                        <p className="menu-item-description body">{item.description}</p>
                        <button className="menu-item-button">{item.buttonLabel}</button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </main>
  );
}

export default Menu;