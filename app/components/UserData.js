import React from "react";
import { fetchUser } from "../utils/api";
import Timestamp from "./Timestamp";

export default class UserData extends React.Component{
  state = {
    created: null,
    karma: null,
  }

  componentDidMount() {
    fetchUser(this.props.id).then((res) => this.setState({
      created: res.created,
      karma: res.karma
    }))
  }


  render() {


  return (
    <React.Fragment>
      <h1 className="header">{this.props.id}</h1>
      <div className="meta-info-light">
        <span>
          joined{" "}
          <b>
            <Timestamp timestamp={this.state.created} />
          </b>
        </span>
        <span>
          has <b>{this.state.karma}</b> karma
        </span>
      </div>
    </React.Fragment>
  );
  }
}

/*

      <React.Fragment>
      <h1 className='header'>{user.id}</h1>
      <div className="meta-info-light">
      <span>joined <b><Timestamp timestamp={user.created}/></b></span>
      <span>has <b>{user.karma}</b> karma</span>
      </div>
      </React.Fragment>

      */
