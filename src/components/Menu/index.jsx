import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import './style.scss';

class Menu extends React.Component {
  render() {
    const menu = this.props.data;

    const menuBlock = (
      <ul className="menu__list">
        {menu.map(item =>
          <li className="menu__list-item" key={item.path}>
            <Link
              exact to={item.path}
              className="menu__list-item-link"
              activeClassName="menu__list-item-link menu__list-item-link--active"
            >
              {item.label}
            </Link>
          </li>
        )}
      </ul>
    );

    return (
      <nav className="menu">
        {menuBlock}
      </nav>
    );
  }
}

Menu.propTypes = {
  data: PropTypes.array.isRequired
};

export default Menu;
