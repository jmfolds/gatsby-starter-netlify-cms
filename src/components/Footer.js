import { Link } from "gatsby";
import * as React from "react";

const Footer = class extends React.Component {
  render() {
    return (
    <footer className="p-3 m-0 mt-3" style={{ textAlign: 'center', margin: '1rem', backgroundColor: '#333' }}>
      <p className="small m-0">All art, photos, and text are copyrighted © 2009-2022 by the Wichita Sculptors Guild or the individual artist/gallery/studio/business represented on this web site.</p>
      <p className="small"> Do not reproduce without written permission.</p>
    </footer>
    );
  }
};

export default Footer;
