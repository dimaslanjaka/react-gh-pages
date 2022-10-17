import { Link } from 'react-router-dom';
import { Adsense } from '../components/adsense/Adsense';
import { Footer } from '../components/Footer';
import pages from '../data.json';

export function PageItem(props: typeof pages[number]) {
  document.title = `${props.name} ${props.id} - React for github pages`;
  return (
    <>
      <Footer />
      <div className="page">
        <div>
          <Link to="/">Go Back</Link>
        </div>
        <div>ID: {props.id}</div>
        <div>
          <pre>
            <code>{JSON.stringify(props, null, 2)}</code>
          </pre>
        </div>
        <div className="adsw">
          <Adsense
            id="ads2"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            client="ca-pub-2188063137129806"
            slot="8481296455"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
