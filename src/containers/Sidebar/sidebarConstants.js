export const MENU_ITEMS = [
  {
    id: "gogo",
    link: "/app/gogo",
    icon: "iconsmind-Air-Balloon",
    intlID: "menu.gogo",
    isSingle: false,
    subMenus: [
      {
        parent: "gogo",
        link: "/app/gogo/start",
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

