import { faArchive, faAtom, faHome, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const defaultMenuType = "menu-sub-hidden"; //'menu-default', 'menu-hidden'
export const defaultStartPath = "/app/homepage/start";
export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "tr";
export const searchPath = "/app/homepage/start";

export const localeOptions = [
  { id: "tr", name: "Türkçe" },
  { id: "en", name: "English" }
];

export const MENU_ITEMS = [
  {
    id: "homepage",
    link: "/app/homepage",
    icon: faHome,
    intlID: "menu.gogo",
    isSingle: false,
    subMenus: [
      {
        parent: "homepage",
        link: "/app/homepage/start",
        icon: faPaperPlane,
        intlID: "menu.start"
      }
    ]
  },
  {
    id: "second-menu",
    link: "/app/second-menu",
    icon: faAtom,
    intlID: "menu.second-menu",
    isSingle: false,
    subMenus: [
      {
        parent: "second-menu",
        link: "/app/second-menu/second",
        icon: faPaperPlane,
        intlID: "menu.second"
      }
    ]
  },
  {
    id: "third-single",
    link: "/app/third-single",
    icon: faArchive,
    intlID: "menu.third-single",
    isSingle: true,
    subMenus: []
  }
];

const getSubmenus = () => {
  const subMenus = MENU_ITEMS.reduce((acc, item) => {
    acc = [...acc, ...item.subMenus];
    return acc;
  }, []);
  return subMenus;
};
export const SUBMENU_ITEMS = getSubmenus();
