import React, { Component } from "react";
import { Redirect, Switch,Route,  Link } from "react-router-dom";
import { withRouter } from "react-router";
import Makelist from './makelist'
import Showlist from './showlist'
import IndexDashboard from "./Indexdashboard";
import NotFound from "./404";
import "./App.css";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogout: false,
      file:[],
      value:'',
      checked: false,
      selectedList: [],
      selecteddata:'',
    };
  }
  signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("this.state.SelectedList")
    this.setState({
      islogout: true
    });
  };
  render() {
    if (this.state.islogout) {
      return <Redirect to="/login" />;
    }
    const { match } = this.props;
    const user = localStorage.getItem("token")
    return (
      <div>
        <ul>
          <li>
            <Link to={`${match.path}`}>Dashboard</Link>
          </li>
          <li>
            <Link to={`${match.path}/makelist`}>Make a list</Link>
          </li>
          <li>
            <Link to={`${match.path}/showlist`}>Show my List</Link>
          </li>
          <li>
          {
                    localStorage.getItem('token') ?
                    <Link className="acive" Redirect to="/"> id :- <b>{user}</b></Link>
                :
                    null
                }
                </li>
          <li className="push-right">
            <button onClick={this.signOut} href="#">
              Log Out
            </button>
          </li>
        </ul>
        <main role="main">
          <div className="main">
          <Switch>
              <Route path={`${match.path}/makelist`}>
                <Makelist />
              </Route>
              <Route path={`${match.path}/showlist`}>
                <Showlist />
              </Route>
              <Route exact path={`${match.path}`}>
                <IndexDashboard />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(Dashboard);