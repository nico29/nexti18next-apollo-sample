import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withNamespaces } from "../i18n";

const RICK_QUERY = gql`
  query RICK_QUERY {
    character(id: 1) {
      name
      image
    }
  }
`;

class HomePage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ["home"]
    };
  }
  render() {
    const { t } = this.props;
    return (
      <>
        <h1>{t("welcome")}</h1>
        <Query query={RICK_QUERY}>
          {({ data, error, loading }) => {
            if (error) return <p>{error.message}</p>;
            if (loading) return <p>Loading...</p>;
            return (
              <React.Fragment>
                <p>{data.character.name}</p>
                <img
                  src={data.character.image}
                  alt={data.character.name}
                  style={{ height: 300 }}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </>
    );
  }
}

export default withNamespaces("home")(HomePage);
