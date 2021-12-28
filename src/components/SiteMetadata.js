import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { site, markdownRemark } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
          }
        }
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
          frontmatter {
            title
          }
        }
      }
    `
  )
  return { ...site.siteMetadata, configTitle: markdownRemark.frontmatter.title }
}

export default useSiteMetadata
