import React from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const logout = async () => {}

  return (
    <Navbar collapseOnSelect expand='lg' bg='primary' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>NAZIV APLIKACIJE</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <>
              {/*   <LinkContainer to='/books'>
                <Nav.Link>Books</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/newbook'>
                <Nav.Link>New Book</Nav.Link>
              </LinkContainer> */}
            </>
          </Nav>

          <Nav>
            <NavDropdown title='Admin' id='ugovori'>
              <NavDropdown.Item style={{ backgroundColor: '#78c2ad' }}>
                <LinkContainer to='admin/trainers'>
                  <Nav.Link> Treneri</Nav.Link>
                </LinkContainer>
                <LinkContainer to='admin/players'>
                  <Nav.Link> Igraci</Nav.Link>
                </LinkContainer>
                <LinkContainer to='admin/teams'>
                  <Nav.Link> Timovi</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Reports' id='ugovori'>
              <NavDropdown.Item style={{ backgroundColor: '#78c2ad' }}>
                <LinkContainer to='/reports'>
                  <Nav.Link> Reports</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/playerstat'>
                  <Nav.Link> Player Stat</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/teamstat'>
                  <Nav.Link> Team Stat</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/twoplayersstat'>
                  <Nav.Link>Compare Players Stat</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
            </NavDropdown>
            <LinkContainer to='/loaddata'>
              <Nav.Link>Load data</Nav.Link>
            </LinkContainer>

            <LinkContainer to='/login'>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/register'>
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>

            <Nav.Link onClick={logout}>Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
