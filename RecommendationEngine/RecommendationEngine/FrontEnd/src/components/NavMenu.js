import React from 'react';
import styled from 'styled-components';
import './NavMenu.css';

const Navigation = styled.nav`
    border-bottom: 1px solid black;
    box-shadow: 0 3px 3px 0px rgba(0,0,0,.2);
`;

const breadcrumb = {
  backgroundColor: 'white',
}

function NavMenu(props) {

  function isLast(index) {
    return index === props.crumbs.length - 1;
  }

  return (
      <Navigation>
        <ol className="breadcrumb" style={breadcrumb}>
          {
            props.crumbs.map((crumb, ci) => {
              const disabled = isLast(ci) ? 'disabled' : '';

              return (
                <li
                  key={ci}
                  className="breadcrumb-item align-items-center"
                >
                  <button className={`btn btn-sm shadow-none ${disabled}`} onClick={() => props.selected(crumb)}>
                    {crumb}
                  </button>
                </li>
              );
            })
          }
        </ol>
      </Navigation>
  );
}

export default NavMenu;
