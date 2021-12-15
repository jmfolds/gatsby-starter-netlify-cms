import React from "react";
import { Link, graphql, StaticQuery } from 'gatsby';

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
      <nav
        className="navbar"
        role="navigation"
        aria-label="main-navigation"
        style={{ display: 'flex' }}
      >
        <ul>
          <li>
            <Link className="navbar-item" to="/about">
              About
            </Link></li>
          <li>
            <Link className="navbar-item" to="/artists">
              Artists
            </Link>
            <ul class="dropdown">
            {posts &&
              posts.map(({ node: post }) => {
                return (
                <li>
                  <Link to={post.fields.slug}>
                    {post.frontmatter.name}
                  </Link>
                </li>)
              })
            }
            </ul>
          </li>
          <li>
            <Link className="navbar-item" to="/calendar">
                Calendar
            </Link>
          </li>
          <li>
            <Link className="navbar-item" to="/resources">
              Resources
            </Link>
          </li>
        </ul>
      </nav>
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
