import React, { useState } from 'react';
import { Collapse } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const SubMenuSettings = ({ title, links }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div
        onClick={handleToggle}
        className='marginLink p-0 textToggle'
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>{title}</span>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>

      <Collapse className='mb-3' in={open} timeout="auto" unmountOnExit>
        <div style={{ marginLeft: '15px', marginTop: '10px' }}>
          {links.map((link, index) => (
            <Link key={index} className='' to={link.path} style={link.style}>
              {link.label}
            </Link>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default SubMenuSettings;
