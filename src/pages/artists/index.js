import * as React from "react";

import Layout from "../../components/Layout";
import ArtistRoll from "../../components/ArtistRoll";

export default class ArtistIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <h1
          style={{
            color: "white",
            padding: "1rem",
          }}
        >
          Artists
        </h1>
        <section className="section">
          <div className="container">
            <div className="content">
              <ArtistRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
