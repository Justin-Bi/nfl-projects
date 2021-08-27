import variables from "../../_colors.scss";

import React from "react";
import "./Footer.scss";
import Icon from "../Icon";

function Footer() {
  const iconStyle = { height: "24px", fill: variables.nflBlue };

  return (
    <footer className="footer">
      <span className="footer-col">
        <Icon type="GitHub" style={iconStyle} />
        <div>
          <a className="footer-link" href="https://github.com/justin-bi">
            Github
          </a>
        </div>
      </span>
      <span className="footer-col">
        <Icon type="LinkedIn" style={iconStyle} />
        <div>
          <a
            className="footer-link"
            href="https://www.linkedin.com/in/justinbi/"
          >
            LinkedIn
          </a>
        </div>
      </span>
      <span className="footer-col">
        <Icon type="Email" style={iconStyle} />
        <div>
          <a className="footer-link" href="mailto:justinbi@princeton.edu">
            Email
          </a>
        </div>
      </span>
      <span className="footer-col">
        <Icon type="MySite" style={iconStyle} />
        <div>
          <a className="footer-link" href="https://justin-bi.github.io/">
            My Site
          </a>
        </div>
      </span>
    </footer>
  );
}

export default Footer;
