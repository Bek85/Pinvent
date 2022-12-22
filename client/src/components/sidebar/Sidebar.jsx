import './Sidebar.scss';

export default function Sidebar({ children }) {
  return (
    <div className='layout'>
      <div className='sidebar'>
        <h2>Sidebar</h2>
      </div>
      <main>{children}</main>
    </div>
  );
}
