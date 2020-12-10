import React from "react";
import ReactDOM from "react-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { menuSelector } from "../containers/Application/appSelectors";
import { MENU_ITEMS, SUBMENU_ITEMS } from "../containers/Application/appConstants";
import { compose } from "redux";
import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames
} from "../containers/Application/appActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleProps = this.handleProps.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.getContainer = this.getContainer.bind(this);
    this.getMenuClassesForResize = this.getMenuClassesForResize.bind(this);
    this.setSelectedLiActive = this.setSelectedLiActive.bind(this);

    this.state = {
      selectedParentMenu: "",
      viewingParentMenu: ""
    };
  }

  handleWindowResize(event) {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.props.menu;
    let nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(0, nextClasses.join(" "));
  }

  handleDocumentClick(e) {
    const container = this.getContainer();
    let isMenuClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("menu-button") ||
        e.target.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.parentElement.classList.contains(
          "menu-button-mobile"
        ))
    ) {
      isMenuClick = true;
    }
    if (
      (container.contains(e.target) && container !== e.target) ||
      isMenuClick
    ) {
      return;
    }
    this.toggle(e);
    this.setState({
      viewingParentMenu: ""
    });
  }

  getMenuClassesForResize(classes) {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props.menu;
    let nextClasses = classes.split(" ").filter(x => { return x !== ""; });
    const windowWidth = window.innerWidth;
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push("menu-mobile");
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter(x => { return x !== "menu-mobile"; });
      if (
        nextClasses.includes("menu-default") &&
        !nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses.push("menu-sub-hidden");
      }
    } else {
      nextClasses = nextClasses.filter(x => { return x !== "menu-mobile"; });
      if (
        nextClasses.includes("menu-default") &&
        nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses = nextClasses.filter(x => { return x !== "menu-sub-hidden"; });
      }
    }
    return nextClasses;
  }

  getContainer() {
    // eslint-disable-next-line
    return ReactDOM.findDOMNode(this);
  }

  toggle() {
    const { containerClassnames, menuClickCount } = this.props.menu;
    const currentClasses = containerClassnames
      ? containerClassnames.split(" ").filter(x => { return x !== ""; })
      : "";

    if (currentClasses.includes("menu-sub-hidden") && menuClickCount === 3) {
      this.props.setContainerClassnames(2, containerClassnames);
    } else if (
      currentClasses.includes("menu-hidden") ||
      currentClasses.includes("menu-mobile")
    ) {
      this.props.setContainerClassnames(0, containerClassnames);
    }
  }

  handleProps() {
    this.addEvents();
  }

  addEvents() {
    ["click", "touchstart"].forEach(event => {
      return document.addEventListener(event, this.handleDocumentClick, true);
    });
  }
  removeEvents() {
    ["click", "touchstart"].forEach(event => {
      return document.removeEventListener(event, this.handleDocumentClick, true);
    });
  }
  setSelectedLiActive() {
    const oldli = document.querySelector(".sub-menu  li.active");
    if (oldli != null) {
      oldli.classList.remove("active");
    }

    /* set selected parent menu */
    const selectedlink = document.querySelector(".sub-menu  a.active");
    if (selectedlink != null) {
      selectedlink.parentElement.classList.add("active");
      this.setState({
        selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
          "data-parent"
        )
      });
    } else {
      var selectedParentNoSubItem = document.querySelector(".main-menu  li a.active");
      if (selectedParentNoSubItem != null) {
        this.setState({
          selectedParentMenu: selectedParentNoSubItem.getAttribute(
            "data-flag"
          )
        });
      } else if (this.state.selectedParentMenu === "") {
        this.setState({
          selectedParentMenu: "gogo"
        });
      }

    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive();
      this.toggle();
      window.scrollTo(0, 0);
    }

    this.handleProps();
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
    this.handleProps();
    this.setSelectedLiActive();
  }

  componentWillUnmount() {
    this.removeEvents();
    window.removeEventListener("resize", this.handleWindowResize);
  }

  changeDefaultMenuType(e, containerClassnames) {
    e.preventDefault();
    let nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(0, nextClasses.join(" "));
  }

  openSubMenu(e, selectedParent) {
    e.preventDefault();
    const { containerClassnames, menuClickCount } = this.props.menu;
    const currentClasses = containerClassnames
      ? containerClassnames.split(" ").filter(x => { return x !== ""; })
      : "";

    if (!currentClasses.includes("menu-mobile")) {
      if (
        currentClasses.includes("menu-sub-hidden") &&
        (menuClickCount === 2 || menuClickCount === 0)
      ) {
        this.props.setContainerClassnames(3, containerClassnames);
      } else if (
        currentClasses.includes("menu-hidden") &&
        (menuClickCount === 1 || menuClickCount === 3)
      ) {
        this.props.setContainerClassnames(2, containerClassnames);
      } else if (
        currentClasses.includes("menu-default") &&
        !currentClasses.includes("menu-sub-hidden") &&
        (menuClickCount === 1 || menuClickCount === 3)
      ) {
        this.props.setContainerClassnames(0, containerClassnames);
      }
    } else {
      this.props.addContainerClassname(
        "sub-show-temporary",
        containerClassnames
      );
    }
    this.setState({
      viewingParentMenu: selectedParent
    });
  }
  changeViewingParentMenu(menu) {
    this.toggle();

    this.setState({ viewingParentMenu: menu });
  }

  render() {
    const { selectedParentMenu, viewingParentMenu } = this.state;

    return (
      <div className="sidebar">
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }}>
              <Nav vertical className="list-unstyled side-menu">
                {
                  MENU_ITEMS.map(({ id, link, icon, intlID, isSingle }) => {
                    return (
                      <NavItem
                        key={`parent-menu-${id}`}
                        className={((selectedParentMenu === id && viewingParentMenu === "") || viewingParentMenu === id) ? "active" : ""}
                      >
                        <NavLink
                          to={link}
                          onClick={e => {
                            if (isSingle) {
                              this.changeViewingParentMenu(id);
                            } else {
                              this.openSubMenu(e, id);
                            }
                          }}
                          data-flag={isSingle ? id : null}
                        >
                          <div className="menu-item">
                            <FontAwesomeIcon icon={icon} />
                            <FormattedMessage id={intlID} />
                          </div>
                        </NavLink>
                      </NavItem>
                    );
                  })
                }
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>
        <div className="sub-menu">
          <div className="scroll">
            <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }}>
              {SUBMENU_ITEMS.map(({ parent, link, icon, intlID }, index) => {
                return (
                  <Nav
                    key={`sub-menu-${parent}-${index}`}
                    data-parent={parent}
                    className={((selectedParentMenu === parent && viewingParentMenu === "") || viewingParentMenu === parent) ? "d-block" : ""}
                  >
                    <NavItem>
                      <NavLink to={link}>
                        <div className="sub-menu-item">
                          <FontAwesomeIcon icon={icon} />
                          <FormattedMessage id={intlID} />
                        </div>
                      </NavLink>
                    </NavItem>
                  </Nav>
                );
              })}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menu: menuSelector(state)
  };
};

const mapDispatchToProps = { setContainerClassnames, addContainerClassname, changeDefaultClassnames };

const enhancer = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(Sidebar);
