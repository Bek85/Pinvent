import Footer from 'pinvent/components/footer/Footer';
import Header from 'pinvent/components/header/Header';

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
