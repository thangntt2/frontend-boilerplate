
import React, { Component, PropTypes } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.handleNavItemClicked = this.handleNavItemClicked.bind(this)
  }

  handleNavItemClicked(path) {
    return this.props.onChangeTab(path)
  }

  render() {
    const { loggedIn } = this.props
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">THANGNTT</a>
          </Navbar.Brand>
        </Navbar.Header>
        {loggedIn ?
          <Nav pullRight>
            <NavItem
              eventKey={1}
              onClick={() => this.handleNavItemClicked('/channels')}
              active={this.props.path === '/channels'}
            >
              Channels
            </NavItem>
            <NavItem
              eventKey={2}
              onClick={() => this.handleNavItemClicked('/metacontents')}
              active={this.props.path === '/metacontents'}
            >
              Metacontents
            </NavItem>
            <NavItem
              eventKey={2}
              onClick={() => this.handleNavItemClicked('/keywords')}
              active={this.props.path === '/keywords'}
            >
              Keywords
            </NavItem>
            <NavDropdown eventKey={3} title={<Glyphicon glyph="plus" />} id="basic-nav-dropdown">
              <MenuItem
                eventKey={3.1}
                onClick={() => this.handleNavItemClicked('/channel/create')}
              >
                New Channel
              </MenuItem>
              <MenuItem
                eventKey={3.1}
                onClick={() => this.handleNavItemClicked('/metacontent/create')}
              >
                New Metacontent
              </MenuItem>
              <MenuItem
                eventKey={3.1}
                onClick={() => this.handleNavItemClicked('/keyword/create')}
              >
                New Keyword
              </MenuItem>
            </NavDropdown>
            <NavItem
              eventKey={2}
              onClick={() => this.handleNavItemClicked('/logout')}
            >
              Logout
            </NavItem>
          </Nav>
          :
          <Nav pullRight>
            {this.props.path && this.props.path !== '/login' &&
              <NavItem
                eventKey={2}
                onClick={() => this.handleNavItemClicked('/login')}
              >
                Login
              </NavItem>
            }
          </Nav>
        }
      </Navbar>
    )
  }
}

Header.propTypes = {
  onChangeTab: PropTypes.func.isRequired,
  path: PropTypes.string,
  loggedIn: PropTypes.bool,
}
