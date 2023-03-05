import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div style={{ minHeight: '80vh' }} className='--pad'>
        {children}
      </div>
      <Footer />
    </>
  );
}
