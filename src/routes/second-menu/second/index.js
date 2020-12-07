import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row } from "reactstrap";
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";

class Second extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="menu.second" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        {
          /*Enjoy!*/
        }
      </Fragment>
    );
  }
}

export default Second;
