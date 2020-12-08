import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { FormattedMessage, injectIntl } from "react-intl";
import { menuHiddenBreakpoint, searchPath, localeOptions } from "../containers/Application/appConstants";
import { menuSelector, settingsSelector } from "../containers/Application/appSelectors";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input
} from "reactstrap";
import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale
} from "../containers/Application/appActions";

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.mobileMenuButtonClick = this.mobileMenuButtonClick.bind(this);
    this.search = this.search.bind(this);
    this.handleChangeLocale = this.handleChangeLocale.bind(this);
    this.handleDocumentClickSearch = this.handleDocumentClickSearch.bind(this);
    this.addEventsSearch = this.addEventsSearch.bind(this);
    this.removeEventsSearch = this.removeEventsSearch.bind(this);

    this.state = {
      isInFullScreen: false,
      searchKeyword: ""
    };
  }

  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  handleChangeLocale = locale => {
    this.props.changeLocale(locale);
  };

  handleSearchIconClick = (e) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        this.search();
        elem.classList.remove("mobile-view");
        this.removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  }

  addEventsSearch() {
    document.addEventListener("click", this.handleDocumentClickSearch, true);
  }

  removeEventsSearch() {
    document.removeEventListener("click", this.handleDocumentClickSearch, true);
  }

  handleDocumentClickSearch(e) {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) {
        input.classList.remove("mobile-view");
      }
      this.removeEventsSearch();
      this.setState({
        searchKeyword: ""
      });
    }
  }
  handleSearchInputChange(e) {
    this.setState({
      searchKeyword: e.target.value
    });
  }
  handleSearchInputKeyPress(e) {
    if (e.key === "Enter") {
      this.search();
    }
  }

  search() {
    this.props.history.push(`${searchPath}/${this.state.searchKeyword}`);
    this.setState({
      searchKeyword: ""
    });
  }

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen
    });
  };

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  menuButtonClick(e, menuClickCount, containerClassnames) {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(++menuClickCount, containerClassnames);
  }
  mobileMenuButtonClick(e, containerClassnames) {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  }

  render() {
    const { menu, settings, intl: { messages } } = this.props;
    const { containerClassnames, menuClickCount } = menu;
    return (
      <nav className="navbar fixed-top">
        {/* Menu button */}
        <NavLink
          to="#"
          className="menu-button d-none d-md-block"
          onClick={e => {
            return this.menuButtonClick(e, menuClickCount, containerClassnames);
          }}
        >
          <svg
            className="main"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 9 17"
          >
            <rect x="0.48" y="0.5" width="7" height="1" />
            <rect x="0.48" y="7.5" width="7" height="1" />
            <rect x="0.48" y="15.5" width="7" height="1" />
          </svg>
          <svg
            className="sub"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 17"
          >
            <rect x="1.56" y="0.5" width="16" height="1" />
            <rect x="1.56" y="7.5" width="16" height="1" />
            <rect x="1.56" y="15.5" width="16" height="1" />
          </svg>
        </NavLink>
        <NavLink
          to="#"
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={e => { return this.mobileMenuButtonClick(e, containerClassnames); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
            <rect x="0.5" y="0.5" width="25" height="1" />
            <rect x="0.5" y="7.5" width="25" height="1" />
            <rect x="0.5" y="15.5" width="25" height="1" />
          </svg>
        </NavLink>
        {/* Search container */}
        <div className="search" data-search-path="/app/layouts/search">
          <Input
            name="searchKeyword"
            id="searchKeyword"
            placeholder={messages["menu.search"]}
            value={this.state.searchKeyword}
            onChange={e => { this.handleSearchInputChange(e); }}
            onKeyPress={e => { this.handleSearchInputKeyPress(e); }}
          />
          <span className="search-icon" onClick={e => { this.handleSearchIconClick(e); }}>
            <i className="simple-icon-magnifier" />
          </span>
        </div>
        {/* Switch language prop */}
        <div className="d-inline-block">
          <UncontrolledDropdown className="ml-2">
            <DropdownToggle
              caret
              color="light"
              size="sm"
              className="language-button"
            >
              <span className="name">{settings.locale.toUpperCase()}</span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              {
                localeOptions.map((l) => {
                  return (
                    <DropdownItem key={`too-navbar-lang-select${l.id}`} onClick={() => { this.handleChangeLocale(l.id); }}>
                      {l.name}
                    </DropdownItem>
                  );
                })
              }
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        {/* Logo */}
        <a className="navbar-logo" href="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>
        {/* Navbar right side actions */}
        <div className="ml-auto">
          <div className="header-icons d-inline-block align-middle">
            {/* Shortcut action button */}
            <div className="position-relative d-none d-sm-inline-block">
              <UncontrolledDropdown className="dropdown-menu-right">
                <DropdownToggle className="header-icon" color="empty">
                  <i className="simple-icon-grid" />
                </DropdownToggle>
                <DropdownMenu
                  className="position-absolute mt-3"
                  right
                  id="iconMenuDropdown"
                >
                  <NavLink to="#" className="icon-menu-item">
                    <i className="iconsmind-Air-Balloon d-block" />{" "}
                    <FormattedMessage id="menu.gogo" />
                  </NavLink>
                  <NavLink to="#" className="icon-menu-item">
                    <i className="iconsmind-Pantone d-block" />{" "}
                    <FormattedMessage id="menu.ui" />
                  </NavLink>
                  <NavLink to="#" className="icon-menu-item">
                    <i className="iconsmind-Bar-Chart d-block" />{" "}
                    <FormattedMessage id="menu.charts" />
                  </NavLink>
                  <NavLink to="#" className="icon-menu-item">
                    <i className="iconsmind-Speach-BubbleDialog d-block" />{" "}
                    <FormattedMessage id="menu.chat" />
                  </NavLink>
                  <NavLink to="#" className="icon-menu-item">
                    <i className="iconsmind-Formula d-block" />{" "}
                    <FormattedMessage id="menu.survey" />
                  </NavLink>
                  <NavLink to="#" className="icon-menu-item">
                    <i className="iconsmind-Check d-block" />{" "}
                    <FormattedMessage id="menu.todo" />
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            {/* Notification action button */}
            <div className="position-relative d-inline-block">
              <UncontrolledDropdown className="dropdown-menu-right">
                <DropdownToggle
                  className="header-icon notificationButton"
                  color="empty"
                >
                  <i className="simple-icon-bell" />
                  <span className="count">3</span>
                </DropdownToggle>
                <DropdownMenu
                  className="position-absolute mt-3 scroll"
                  right
                  id="notificationDropdown"
                >
                  <PerfectScrollbar
                    options={{ suppressScrollX: true, wheelPropagation: false }}
                  >
                    {
                      <div>no notification</div>
                    }
                  </PerfectScrollbar>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            {/* Fullscreen button */}
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                  <i className="simple-icon-size-fullscreen d-block" />
                )}
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menu: menuSelector(state),
    settings: settingsSelector(state)
  };
};

const mapDispatchToProps = { setContainerClassnames, clickOnMobileMenu, logoutUser, changeLocale };

const enhancer = compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(TopNav);