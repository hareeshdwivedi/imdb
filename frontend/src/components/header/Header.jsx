import './header.css'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/userSlice'
import { useNavigate } from 'react-router-dom'
import { resetState } from '../../features/movieSlice'
const Header = () => {
  const { user } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Navbar collapseOnSelect expand='lg' bg='black' variant='dark'>
      <Container>
        <LinkContainer to={'/'}>
          <Navbar.Brand>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png' />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0 w-100'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Form className='d-flex flex-grow-1 justify-content-center'>
              <Form.Control
                type='search'
                placeholder='Search'
                className='me-2 rounded-pill border-0 bg-dark'
                aria-label='Search'
                style={{ maxWidth: '20rem' }}
              />
              <Button variant='outline-danger' className='rounded-pill'>
                Search
              </Button>
            </Form>
            {user ? (
              <NavDropdown title={user.email} id='basic-nav-dropdown'>
                {user.role === 'producer' && user.approve && (
                  <>
                    <LinkContainer to={'/movies/movie/add'}>
                      <NavDropdown.Item onClick={() => dispatch(resetState())}>
                        Add Film
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={'/movies/list'}>
                      <NavDropdown.Item onClick={() => dispatch(resetState())}>
                        Movies list
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                  </>
                )}
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(logout())
                    navigate('/')
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>{'Login'}</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
