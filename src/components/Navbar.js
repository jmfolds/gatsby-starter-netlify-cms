import React from "react";
import { Link, graphql, StaticQuery } from 'gatsby';
import { Nav, NavDropdown } from 'react-bootstrap';
import PreviewCompatibleImage from "./PreviewCompatibleImage";

const NavbarTemplate = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
    };
  }

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    return (
      <div className="d-flex flex-column">
        <img src="../img/wsg-logo.jpg" />
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/home">Active</Nav.Link>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
          <NavDropdown title="Artists" id="nav-dropdown">
          {posts &&
                posts.map(({ node: post }) => {
                  return (
                    <NavDropdown.Item eventKey={post.frontmatter.slug}>
                      <Link to={post.fields.slug}>
                        {post.frontmatter.name}
                      </Link>
                    </NavDropdown.Item>)
                })
              }
        </NavDropdown>
        </Nav>
      </div>
    );
  }
};

// export default Navbar;


export default function Navbar() {
  return (
    <StaticQuery
      query={graphql`
        query NavbarArtistRollQuery {
          allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "artist-page" } } }
          ) {

            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  name
                  templateKey
                  description
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <NavbarTemplate data={data} count={count} />}
    />
  );
}
