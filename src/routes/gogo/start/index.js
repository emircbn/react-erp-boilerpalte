import React from "react";
import IntlMessages from "Util/IntlMessages";
import { Row } from "reactstrap";
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";

class StartPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="menu.start" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        {
          /*Enjoy!*/
        }
      </React.Fragment>
    );
  }
}

export default StartPage;
