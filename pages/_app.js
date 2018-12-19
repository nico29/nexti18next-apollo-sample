import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";
import { appWithTranslation as withTranslations } from "../i18n";
class SampleApp extends App {
  static displayName = "SampleApp";
  static async getInitialProps({ Component: Page, ctx }) {
    let pageProps = {};
    if (Page.getInitialProps) {
      pageProps = await Page.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component: Page, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Page {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(withTranslations(SampleApp));
