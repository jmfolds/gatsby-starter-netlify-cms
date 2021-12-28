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
        markdownRemark(frontmatter: { templateKey: { eq: "layout-page" } }) {
          frontmatter {
            title,
            logo {
              childImageSharp {
                gatsbyImageData(quality: 100, layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    `
  )
  return { ...markdownRemark.frontmatter , ...site.siteMetadata, configTitle: markdownRemark.frontmatter.title }
}

export default useSiteMetadata
