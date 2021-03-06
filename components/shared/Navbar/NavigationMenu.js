import styled from "@emotion/styled";
import React from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import DownArrow from '../Icon/DownArrow';
import PropTypes from 'prop-types';

import {
  useMenuState,
  Menu as BaseMenu,
  MenuItem,
  MenuButton,
  MenuSeparator,
} from "reakit/Menu";

const Menu = React.forwardRef(
  ({ disclosure, menuItems, menuProps, ...props }, ref) => {
    const menu = useMenuState();
    return (
      <>
        <MenuButton ref={ref} {...menu} {...props} {...disclosure.props}>
          {(disclosureProps) => React.cloneElement(disclosure, disclosureProps)}
        </MenuButton>
        <BaseMenu {...menu} {...menuProps}>
          {menuItems.map((item, i) => {
            if (item.type === MenuSeparator) {
              return React.cloneElement(item, {
                ...menu,
                key: item.key || i,
                ...item.props,
              });
            }
            return (
              <MenuItem {...menu} {...item.props} key={item.key || i}>
                {(itemProps) => React.cloneElement(item, itemProps)}
              </MenuItem>
            );
          })}
        </BaseMenu>
      </>
    );
  }
);


const NavMenu = (props) => {
  const {
    href,
    title,
    links,
    link
  } = props;
    const router = useRouter()


  return (
    links.length ? (
        <StyledMenu>
        <Menu
          menuProps={{ "aria-label": "Menu", 'className': 'menu' }}
          disclosure={
            <StyledBtn>
              <p>{title}</p>
            <DownArrow height='24px' width='24px'  /></StyledBtn>
        
        }
          menuItems={
            links.map(l => (
              <React.Fragment key={l.href}>
                <Link
                href={`/${l.href}`}
                locale={router.locale || router.defaultLocale}
              >
                <a className="link">
                  {l.title}
                </a>
              </Link>
              <MenuSeparator />
              </React.Fragment>
            ))}
        />

        </StyledMenu>
      ) : (
       
        <Link
        href={`/${link}`}
        locale={router.locale || router.defaultLocale}
      >
      <StyledNavLink href={`/${link}`} className="link">
        {title}
      </StyledNavLink>
      </Link>
      )

  );
}


export default NavMenu;

NavMenu.propTypes = {
  links: PropTypes.array
}

NavMenu.defaultProps = {
  links: []
}

const StyledNavLink = styled.a`
  color: white;
  font-size: 2.5rem;
  padding: 2px 5px;
  font-family: 'Nunito Sans', sans-serif;
  /* &:focus {
    outline: 1px solid var(--text);
  } */
`

const StyledBtn = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: var(--text);
  border: none;
  outline: inherit;
  font-size: 2.5rem;
  padding: 2px 5px;
  font-family: 'Nunito Sans', sans-serif;
  &:focus-visible {
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
  }
  &:hover {
    color: var(--text-dark);
    background-color: var(--text);
  }
  p {
    white-space: nowrap;
  }
`

const StyledMenu = styled.div`

.link {
  padding: 10px 20px;
  color: var(--text-dark);
  font-size: 2.5rem;
  &:focus {
    color:  var(--headerBg);
    outline: 1px solid var(--text-dark);
    text-decoration: underline;

  }
  &:hover {
    color:  var(--headerBg);
    text-decoration: underline;
  }

}
.menu {
  display: flex;
  flex-direction: column !important;
  background-color: white;
  border-radius: 0;
  min-width: 100px;
  border: 1px black solid;
}
.menu-item {
  background-color: white;
  position: relative;
  color: black;
  text-decoration: none;
  padding: 5px;
  cursor: pointer;
  text-transform: capitalize;
  color: var(--text-dark);
  white-space: nowrap;  
}`

