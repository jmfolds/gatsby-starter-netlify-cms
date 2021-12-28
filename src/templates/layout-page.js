import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const LayoutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="container-fluid">
      <h2 className="">
        {title}
      </h2>
      <PageContent className="content" content={content} />
    </section>
  );
};

LayoutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const LayoutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <LayoutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  );
};

LayoutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LayoutPage;

export const LayoutPageQuery = graphql`
  query LayoutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
