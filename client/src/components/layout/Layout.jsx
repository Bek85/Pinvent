import Footer from 'pinvent/footer/Footer';
import Header from 'pinvent/header/Header';

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
