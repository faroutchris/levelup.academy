import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { JSXElementConstructor, ReactElement, ReactFragment } from 'react';
import { getCssString } from '../config/stitches.config';
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
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssString() }} />
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
