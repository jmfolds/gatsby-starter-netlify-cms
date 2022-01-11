import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class ArtistRollTemplate extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="row">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="col-3" style={{ }} key={post.id}>
              <Link className="button" to={post.fields.slug}>
                <header>
                {post.frontmatter.artistimage ? (
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.artistimage,
                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        width:
                          post.frontmatter.artistimage.childImageSharp
                            .gatsbyImageData.width,
                        height:
                          post.frontmatter.artistimage.childImageSharp
                            .gatsbyImageData.height,
                      }}
                    />
                  </div>
                ) : null}
              
              </header>
                {post.frontmatter.name}
              </Link>
            </div>
          ))}
      </div>
    )
  }
}

ArtistRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default function ArtistRoll() {
  return (
    <StaticQuery
      query={graphql`
        query ArtistRollQuery {
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
                  artistimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 120
                        quality: 100
                        layout: CONSTRAINED
                      )
                    }
                  }
                  galleryImages {
                    childImageSharp {
                      fluid(maxWidth: 750) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <ArtistRollTemplate data={data} count={count} />}
    />
  );
}
