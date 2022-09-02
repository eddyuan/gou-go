import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components

import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Card,
} from 'reactstrap';
const SitterCard = (props) => {
  return (
    <Link to='/'>
      <Card>
        <div className='sitter-card'>
          <div className='sitter-img-container'>
            <div className='img-wrapper'>
              <img src={props.sitter.img_url} />
            </div>
          </div>
          <div className='sitter-content-wrapper'>
            <h5>
              {props.sitter.first_name} {props.sitter.last_name}
            </h5>
            <p>{props.sitter.description}</p>
          </div>
          <div className='sitter-meta-wrapper'>
            <small>From</small>
            <div className='price'>${Math.round(props.sitter.price / 100)}</div>
            <small>per walk</small>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default SitterCard;
