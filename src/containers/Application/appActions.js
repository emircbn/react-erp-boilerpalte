
export const MENU_SET_CLASSNAMES = "MENU_SET_CLASSNAMES";
export const MENU_CONTAINER_ADD_CLASSNAME = "MENU_CONTAINER_ADD_CLASSNAME";
export const MENU_CLICK_MOBILE_MENU = "MENU_CLICK_MOBILE_MENU";
export const MENU_CHANGE_DEFAULT_CLASSES = "MENU_CHANGE_DEFAULT_CLASSES";
export const CHANGE_LOCALE = "CHANGE_LOCALE";
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const LOGOUT_USER = "LOGOUT_USER";

export const changeDefaultClassnames = (strCurrentClasses) => {
  return {
    type: MENU_CHANGE_DEFAULT_CLASSES,
    payload: strCurrentClasses
  };
};

export const addContainerClassname = (classname, strCurrentClasses) => {
  const newClasses = !strCurrentClasses.indexOf(classname) > -1 ? `${strCurrentClasses} ${classname}` : strCurrentClasses;
  return {
    type: MENU_CONTAINER_ADD_CLASSNAME,
    payload: newClasses
  };
};

export const clickOnMobileMenu = (strCurrentClasses) => {
  const currentClasses = strCurrentClasses ? strCurrentClasses.split(" ").filter(x => {
    return x !== "" && x !== "sub-show-temporary";
  }) : "";

  let nextClasses = "";
  if (currentClasses.includes("main-show-temporary")) {
    nextClasses = (currentClasses.filter(x => { return x !== "main-show-temporary"; })).join(" ");
  } else {
    nextClasses = `${currentClasses.join(" ")} main-show-temporary`;
  }

  return {
    type: MENU_CLICK_MOBILE_MENU,
    payload: { containerClassnames: nextClasses, menuClickCount: 0 }
  };
};

export const setContainerClassnames = (clickIndex, strCurrentClasses) => {
  const currentClasses = strCurrentClasses ? strCurrentClasses.split(" ").filter(x => { return x !== ""; }) : "";
  let nextClasses = " menu-mobile";
  if (clickIndex % 4 === 0) {
    if (currentClasses.includes("menu-default") && currentClasses.includes("menu-sub-hidden")) {
      nextClasses = "menu-default menu-sub-hidden";
    } else if (currentClasses.includes("menu-default")) {
      nextClasses = "menu-default";
    } else if (currentClasses.includes("menu-sub-hidden")) {
      nextClasses = "menu-sub-hidden";
    } else if (currentClasses.includes("menu-hidden")) {
      nextClasses = "menu-hidden";
    }
    clickIndex = 0;
  } else if (clickIndex % 4 === 1) {
    if (currentClasses.includes("menu-default") && currentClasses.includes("menu-sub-hidden")) {
      nextClasses = "menu-default menu-sub-hidden main-hidden sub-hidden";
    } else if (currentClasses.includes("menu-default")) {
      nextClasses = "menu-default sub-hidden";
    } else if (currentClasses.includes("menu-sub-hidden")) {
      nextClasses = "menu-sub-hidden main-hidden sub-hidden";
    } else if (currentClasses.includes("menu-hidden")) {
      nextClasses = "menu-hidden main-show-temporary";
    }
  } else if (clickIndex % 4 === 2) {
    if (currentClasses.includes("menu-default") && currentClasses.includes("menu-sub-hidden")) {
      nextClasses = "menu-default menu-sub-hidden sub-hidden";
    } else if (currentClasses.includes("menu-default")) {
      nextClasses = "menu-default main-hidden sub-hidden";
    } else if (currentClasses.includes("menu-sub-hidden")) {
      nextClasses = "menu-sub-hidden sub-hidden";
    } else if (currentClasses.includes("menu-hidden")) {
      nextClasses = "menu-hidden main-show-temporary sub-show-temporary";
    }
  } else if (clickIndex % 4 === 3) {
    if (currentClasses.includes("menu-default") && currentClasses.includes("menu-sub-hidden")) {
      nextClasses = "menu-default menu-sub-hidden sub-show-temporary";
    } else if (currentClasses.includes("menu-default")) {
      nextClasses = "menu-default sub-hidden";
    } else if (currentClasses.includes("menu-sub-hidden")) {
      nextClasses = "menu-sub-hidden sub-show-temporary";
    } else if (currentClasses.includes("menu-hidden")) {
      nextClasses = "menu-hidden main-show-temporary";
    }
  }
  if (currentClasses.includes("menu-mobile")) {
    nextClasses += " menu-mobile";
  }
  return (
    {
      type: MENU_SET_CLASSNAMES,
      payload: { containerClassnames: nextClasses, menuClickCount: clickIndex }
    }
  );
};

export const changeLocale = (locale) => {
  localStorage.setItem("currentLanguage", locale);
  return (
    {
      type: CHANGE_LOCALE,
      payload: locale
    }
  );
};

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history }
  };
};

export const loginUserSuccess = (user) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user
  };
};

export const registerUser = (user, history) => {
  return {
    type: REGISTER_USER,
    payload: { user, history }
  };
};

export const registerUserSuccess = (user) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: user
  };
};

export const logoutUser = (history) => {
  return {
    type: LOGOUT_USER,
    payload: { history }
  };
};


