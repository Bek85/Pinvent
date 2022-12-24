import { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const activeSublink = ({ isActive }) => (isActive ? 'active' : 'link');
const activeLink = ({ isActive }) => (isActive ? 'active' : 'link');

export default function SidebarItem({ item, isOpen }) {
  const [expandMenu, setExpandMenu] = useState(false);
  if (item.children) {
    return (
      <div
        className={
          expandMenu ? 'sidebar-item s-parent open' : 'sidebar-item s-parent'
        }
      >
        <div className='sidebar-title'>
          <span>
            {item.icon && <div className='icon'>{item.icon}</div>}
            {isOpen && <div>{item.title}</div>}
          </span>
          <MdKeyboardArrowRight
            onClick={() => setExpandMenu(!expandMenu)}
            className='arrow-icon'
            size={25}
          />
        </div>
        <div className='sidebar-content'>
          {item.children.map((item, idx) => {
            return (
              <div key={idx} className='s-child'>
                <NavLink to={item.path} className={activeSublink}>
                  <div className='sidebar-item'>
                    <div>
                      <div className='sidebar-title'>
                        <span>
                          {item.icon && <div className='icon'>{item.icon}</div>}
                          {isOpen && <div>{item.title}</div>}
                        </span>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink to={item.path} className={activeLink}>
        <div className='sidebar-item s-parent'>
          <div>
            <div className='sidebar-title'>
              <span>
                {item.icon && <div className='icon'>{item.icon}</div>}
                {isOpen && <div>{item.title}</div>}
              </span>
            </div>
          </div>
        </div>
      </NavLink>
    );
  }
}
