import './Sidebar.scss';
import { HiMenuAlt3 } from 'react-icons/hi';
import { RiProductHuntLine } from 'react-icons/ri';
import SidebarItem from './SidebarItem';
import { useState } from 'react';
import menuItems from './sidebarMenuData';
import { Link } from 'react-router-dom';

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='layout'>
      <div className='sidebar' style={{ width: isOpen ? '230px' : '60px' }}>
        <div className='top_section'>
          <Link
            to='/'
            className='logo'
            style={{ display: isOpen ? 'block' : 'none' }}
          >
            <RiProductHuntLine size={35} style={{ cursor: 'pointer' }} />
          </Link>
          <div
            className='bars'
            style={{ marginLeft: isOpen ? '100px' : '0px' }}
          >
            <HiMenuAlt3 onClick={() => setIsOpen(!isOpen)} />
          </div>
        </div>
        {menuItems.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>
      <main
        style={{
          paddingLeft: isOpen ? '230px' : '60px',
          transition: 'all .5s',
        }}
      >
        {children}
      </main>
    </div>
  );
}
