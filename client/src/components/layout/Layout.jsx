import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

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
