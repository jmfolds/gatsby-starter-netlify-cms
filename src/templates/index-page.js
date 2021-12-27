import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
// import { getImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
// import Features from "../components/Features";
// import BlogRoll from "../components/BlogRoll";
// import FullWidthImage from "../components/FullWidthImage";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  // title,
  // heading,
  // subheading,
  // mainpitch,
  // description,
  // intro,
}) => {
  return (
    <div className="d-flex flex-grow-1">
      <section className="container">
        <PreviewCompatibleImage imageInfo={image} imageStyles={{ width: '345px', margin: '0 auto' }}/>
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        subheading
        description
      }
    }
  }
`;
