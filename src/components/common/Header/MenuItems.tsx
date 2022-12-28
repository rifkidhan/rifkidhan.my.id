import { FC } from 'react';
import useSWR from 'swr';
import { fetcher } from '@libs/directus';
import Link from 'next/link';
import { Close } from '@components/icons';
import s from './Header.module.css';

interface MenuItemsType {
  changeToggle?: any;
  className: string;
}

const menuFetch = `menu?fields=id,title,slug`;

const MenuItems: FC<MenuItemsType> = ({ changeToggle, ...props }) => {
  const { data: menu } = useSWR(menuFetch, fetcher);

  return (
    <nav {...props}>
      <button
        onClick={changeToggle}
        aria-label="close menu buttton"
        className={s.menuToggleClose}
        name="close menu buttton"
      >
        <Close className={`${s.menuClose} closeAnime`} />
      </button>
      <div className={`${s.menuItem} isContainer menuItemsAnime`}>
        {menu?.data.map((menu: any) => (
          <div key={menu.id}>
            {menu.slug === 'home' && (
              <Link href={`/`} passHref onClick={changeToggle}>
                {menu.title}
              </Link>
            )}
            {menu.slug !== 'home' && (
              <Link href={`/${menu.slug}`} passHref onClick={changeToggle}>
                {menu.title}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default MenuItems;
