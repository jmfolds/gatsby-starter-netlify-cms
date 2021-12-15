import { Link } from "gatsby";
import * as React from "react";

const Footer = class extends React.Component {
  render() {
    return (
    <footer style={{ textAlign: 'center', margin: '1rem'}}>
      All art, photos, and text are copyrighted © 2009-2019 by the Wichita Sculptors Guild or the individual artist/gallery/studio/business represented on this web site. Do not reproduce without written permission.
      <Link to="/admin">Admin</Link>
    </footer>
    );
  }
};

export default Footer;
