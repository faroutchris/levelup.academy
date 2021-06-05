import React from 'react';
import Link from 'next/link';
import ButtonLink from './ButtonLink';
import NavActions from './NavActions';
import Navbar from './Navbar';
import NavContent from './NavContent';
import NavItem from './NavItem';
import STATIC_ROUTES from '../constants/routes';

const Nav: React.FC = () => {
  return (
    <Navbar>
      <NavContent>
        <NavItem>
          <Link href="#">
            <a>Courses</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="#">
            <a>Discussions</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="#">
            <a>Articles</a>
          </Link>
        </NavItem>
      </NavContent>
      <NavActions>
        <Link href={STATIC_ROUTES.Signin}>
          <ButtonLink color="primary">Sign in</ButtonLink>
        </Link>
        <Link href={STATIC_ROUTES.Signup}>
          <ButtonLink color="accent">Sign up</ButtonLink>
        </Link>
      </NavActions>
    </Navbar>
  );
};

export default Nav;
