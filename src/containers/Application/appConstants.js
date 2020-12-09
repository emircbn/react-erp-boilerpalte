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
    icon: "iconsmind-Air-Balloon",
    intlID: "menu.gogo",
    isSingle: false,
    subMenus: [
      {
        parent: "homepage",
        link: "/app/homepage/start",
        icon: "simple-icon-paper-plane",
        intlID: "menu.start"
      }
    ]
  },
  {
    id: "second-menu",
    link: "/app/second-menu",
    icon: "iconsmind-Chemical-3",
    intlID: "menu.second-menu",
    isSingle: false,
    subMenus: [
      {
        parent: "second-menu",
        link: "/app/second-menu/second",
        icon: "simple-icon-paper-plane",
        intlID: "menu.second"
      }
    ]
  },
  {
    id: "third-single",
    link: "/app/third-single",
    icon: "iconsmind-Space-Needle",
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
