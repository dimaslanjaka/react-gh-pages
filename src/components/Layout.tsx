import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export interface LayoutProperties {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProperties) {
  return (
    <main className="container-fluid">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
