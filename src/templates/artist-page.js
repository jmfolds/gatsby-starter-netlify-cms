import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import { ListGroup } from "react-bootstrap";

export const ArtistPostTemplate = ({
  // content,
  contentComponent,
  image,
  gallery,
  description,
  acceptsCommissions,
  media,
  specialty,
  contact,
  email,
  // tags,
  location,
  name,
  helmet,
}) => {
  const PostContent = contentComponent || Content;
  console.log(gallery)
  return (
    <section className="container-fluid">
      {helmet || ""}
      <div className="row">
        {gallery?.length ? (
          <div className="col mt-3">
            {/* <h3>Gallery</h3> */}
            <div className="row">
            {gallery?.map(g => {
                return(
                  g && (
                  <div key={g.childImageSharp.fluid.src} className="col-6 d-flex align-items-center justify-content-center mb-3">
                    <img className="img-fluid" src={g.childImageSharp.fluid.src} />
                  </div>
                  )
              )})}
            </div>
          </div>
        ) : null}

        <div className="col">
          <div className="row">
            <div className="d-flex">
              <div className="m-3">
                <h2 className="m-0">
                  {name}
                </h2>
                <span>{location}</span>
              </div>
              <div>
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
              </div>

            </div>
          </div>
          <div className="row">
            <div className="col my-3">
              <div className="d-flex">
                <ListGroup style={{ padding: 0, listStyle: 'none'}}>
                  {acceptsCommissions && <ListGroup.Item className="bg-dark text-white"><strong>Accepts Commissions:</strong> {acceptsCommissions}</ListGroup.Item>}
                  { media && <ListGroup.Item className="bg-dark text-white"><strong>Media:</strong> {media}</ListGroup.Item>}
                  {specialty && <ListGroup.Item className="bg-dark text-white"><strong>Specialty:</strong> {specialty}</ListGroup.Item>}
                </ListGroup>
              </div>
            </div>
          </div>
          <p><PostContent content={description} /></p>
          {(contact || email) ? (
            <div>
              <h4>Contact</h4>
              <p>
                {email && 
                  <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
                }
                <PostContent content={contact} />
              </p>

            </div>
          ) : null}

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
        // content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        email={post.frontmatter.email}
        contact={post.frontmatter.contact}
        acceptsCommissions={post.frontmatter.acceptsCommissions}
        media={post.frontmatter.media}
        specialty={post.frontmatter.specialty}
        image={post.frontmatter.artistimage}
        gallery={post.frontmatter.galleryImages}
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
        // tags={post.frontmatter.tags}
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
        contact
        galleryImages {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
