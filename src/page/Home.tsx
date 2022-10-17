import { Link } from 'react-router-dom';
import { Adsense } from '../components/adsense/Adsense';
import { OutboundLink } from '../components/OutboundLink';
import pages from '../data.json';
import logo from '../logo.svg';

export interface HomeProps {
  children?: JSX.Element;
}
export function Home(props: HomeProps) {
  document.title = 'Homepage - React for github pages';
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <OutboundLink
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Learn React
        </OutboundLink>

        <div>{props.children}</div>
        <div>
          <ul className="inline">
            {pages.map((page, i) => {
              const pathname = '/page/' + page.id + '.html';
              return (
                <li key={pathname + i}>
                  <Link to={pathname}>{pathname}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="adsw" style={{ margin: '2px' }}>
          <Adsense
            identifier="Home Ads"
            id="ads1"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            client="ca-pub-2188063137129806"
            slot="8481296455"
          />
        </div>
      </header>
    </div>
  );
}
