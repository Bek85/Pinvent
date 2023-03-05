const footerYear = new Date().getFullYear();

export default function Footer() {
  return (
    <div className='--flex-center --py2'>
      <p>Copyright &copy; {footerYear} All rights reserved</p>
    </div>
  );
}
