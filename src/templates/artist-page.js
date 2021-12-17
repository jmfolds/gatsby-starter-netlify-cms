import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

// eslint-disable-next-line
export const ArtistPostTemplate = ({
  content,
  contentComponent,
  image,
  description,
  acceptsCommissions,
  media,
  specialty,
  // contact,
  email,
  // tags,
  location,
  name,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h2 className="title is-size-2 has-text-weight-bold is-bold-light">
              {name}
            </h2>
            {image ? (
                <div className="featured-thumbnail">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: image,
                      alt: `image thumbnail for artist ${name}`,
                      width:
                        image.childImageSharp
                          .gatsbyImageData.width,
                      height:
                        image.childImageSharp
                          .gatsbyImageData.height,
                    }}
                  />
                </div>
              ) : null}
            <p>{location}</p>
            <p>{description}</p>
            {email && 
              <p><a href={`mailto:${email}`}>{email}</a></p>
            }
            {/* {contact.telephone && 
              <p>Tel: <a href={`tel:${contact.telephone}`}>{contact.telephone}</a></p>
            }
            {contact.telephone2 && 
              <p>Tel: <a href={`tel:${contact.telephone2}`}>{contact.telephone2}</a></p>
            } */}
            <ul style={{ listStyle: 'none'}}>
              <li>Accepts Commissions: {acceptsCommissions}</li>
              <li>Media: {media}</li>
              <li>Specialty: {specialty}</li>
            </ul>
            <PostContent content={content} />
            {/* {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null} */}
          </div>
        </div>
      </div>
    </section>
  );
};

ArtistPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const ArtistPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ArtistPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        email={post.frontmatter.email}
        acceptsCommissions={post.frontmatter.acceptsCommissions}
        media={post.frontmatter.media}
        specialty={post.frontmatter.specialty}
        image={post.frontmatter.artistimage}
        name={post.frontmatter.name}
        location={post.frontmatter.location}
        helmet={
          <Helmet titleTemplate="Artist | %s">
            <title>{`${post.frontmatter.name}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
      />
    </Layout>
  );
};

ArtistPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default ArtistPost;

export const pageQuery = graphql`
  query ArtistPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name
        description
        email
        location
        acceptsCommissions
        media
        specialty
        artistimage {
          childImageSharp {
            gatsbyImageData(
              width: 120
              quality: 100
              layout: CONSTRAINED
            )

          }
        }
        tags
      }
    }
  }
`;
