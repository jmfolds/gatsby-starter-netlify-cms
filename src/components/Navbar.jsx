import React from "react";
import { Link, graphql, StaticQuery } from 'gatsby';
import { Nav, NavDropdown } from 'react-bootstrap';
import {useLocation} from '@reach/router';
import useSiteMetadata from "./SiteMetadata";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

function NavbarTemplate ({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  const location = useLocation();
  const { logo } = useSiteMetadata();
  console.log(logo)
  return (
    <div className="d-flex flex-column">
      {/* <img src="/img/wsg-logo.jpg" /> */}
      <PreviewCompatibleImage
        imageStyles={{ margin: '0.75rem' }}
        imageInfo={{
          image: logo,
          alt: `Wichita Sculptors Guild logo`,
          width:
            logo.childImageSharp
              .gatsbyImageData.width,
          height:
            logo.childImageSharp
              .gatsbyImageData.height,
        }}
      />
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link active={location.pathname === '/'} as={Link} to="/">Home</Nav.Link>
        <Nav.Link active={location.pathname === '/about'} as={Link} to="/about">About</Nav.Link>
        <Nav.Link active={location.pathname === '/resources'} as={Link} to="/resources">Resources</Nav.Link>
        <NavDropdown title="Artists" id="nav-dropdown" active={location.pathname.includes('/artists')}>
        {posts &&
              posts.map(({ node: post }) => {
                return (
                  <NavDropdown.Item key={post.frontmatter.name} eventKey={post.frontmatter.name}>
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
};


export default function Navbar() {
  return (
    <StaticQuery
      query={graphql`
        query NavbarArtistRollQuery {
          allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "artist-page" } } }
            sort: { fields: [frontmatter___name], order: ASC }
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
