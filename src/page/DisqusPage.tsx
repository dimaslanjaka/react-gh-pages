import { DiscussionEmbed } from 'disqus-react';
import { Layout } from '../components/Layout';

export function DisqusPage() {
  return (
    <Layout>
      <div className="row">
        <div className="col-lg-6 col-12 mb-3">
          <div className="text-center">
            <h5>
              Using{' '}
              <a
                href="https://www.npmjs.com/package/disqus-react"
                rel="nofollow noopener noreferer"
              >
                disqus-react
              </a>
            </h5>
          </div>
          <DiscussionEmbed
            shortname="dimaslanjaka"
            config={{
              url: 'https://www.webmanajemen.com/react-gh-pages/disqus',
              identifier: 'this.props.article.id',
              title: 'Disqus Comment Page Title'
              //language: 'zh_TW' //e.g. for Traditional Chinese (Taiwan)
            }}
          />
        </div>
        <div className="col-12 col-lg-6 mb-3">
          <div className="text-center">
            <h5>
              Using{' '}
              <a href="https://www.webmanajemen.com/comment.html?url=https://www.webmanajemen.com/react-gh-pages/disqus">
                Iframe
              </a>
            </h5>
          </div>
          <iframe
            src="https://www.webmanajemen.com/comment.html?url=https://www.webmanajemen.com/react-gh-pages/disqus"
            frameBorder="0"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
    </Layout>
  );
}
