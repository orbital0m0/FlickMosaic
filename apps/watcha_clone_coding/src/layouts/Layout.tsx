import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main">
        <div className="main-content">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
