import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import pages from './data.json';
import { DisqusPage } from './page/DisqusPage';
import { Home } from './page/Home';
import { PageItem } from './page/PageItem';

const Gallery = () => {
  return (
    <Layout>
      <h2>Gallery</h2>
    </Layout>
  );
};

const About = () => {
  return (
    <Layout>
      <h2>About</h2>
      <div className="container">
        <p>React for github pages</p>
        <p>
          <b className="text-center">External Links</b>
          <a
            href="https://google.com"
            rel="nofollow noopener noreferer"
            title="google"
          >
            Google
          </a>
          <a
            href="https://facebook.com"
            rel="nofollow noopener noreferer"
            title="facebook"
          >
            Facebook
          </a>
          <a
            href="https://github.com"
            rel="nofollow noopener noreferer"
            title="github"
          >
            GitHub
          </a>
        </p>
        <p>
          <b className="text-center">Internal Links</b>
          <ul className="inline">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="https://www.webmanajemen.com/">
                Website Management Indonesia
              </a>
            </li>
          </ul>
        </p>
      </div>
    </Layout>
  );
};

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
        <Routes>
          {/** static route */}
          <Route
            path="/"
            element={
              <Home>
                <ul className="inline">
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/gallery">Gallery</Link>
                  </li>
                  <li>
                    <Link to="/disqus">Disqus Comment</Link>
                  </li>
                </ul>
              </Home>
            }
            index
          ></Route>
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/disqus" element={<DisqusPage />} />

          {pages.map((page) => {
            const pathname = '/page/' + page.id + '.html';
            //console.log(pathname);
            return (
              <Route
                key={page.id}
                path={pathname}
                element={<PageItem {...page} />}
              ></Route>
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

export type propx = React.PropsWithChildren;

/**
 * Get list of paths from <Routes><Route>
 * @param routes
 */
function _getRoutes(routes: JSX.Element) {
  const paths: any[] = [];
  /**
   * Walk in list of routes tree
   * @param element
   */
  const walkTree = (element: JSX.Element) => {
    if (element.props.children && element.props.children.length > 0) {
      element.props.children.forEach((elem: JSX.Element) => walkTree(elem));
    } else if (element.props.path && typeof element.props.path === 'string') {
      paths.push(element.props.path);
    }
  };
  walkTree(routes);
  return paths;
}
