import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { JSXElementConstructor, ReactElement, ReactFragment } from 'react';

interface IDocument {
  html: string;
  head?: JSX.Element[];
  styles?: ReactElement<any, string | JSXElementConstructor<any>>[] | ReactFragment;
}

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<IDocument> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;1,400;1,500&family=DM+Serif+Display:ital@0;1&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
