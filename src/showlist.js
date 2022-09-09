import React, { Component} from 'react'
import { withRouter } from "react-router";
import "./App.css";

 class showlist extends Component {
  constructor(props){
    super(props);
    this.state={
    tabledata : [],
    showText: false,
    };
  }

  componentDidMount() {
    if((localStorage.getItem('token') === "admin"))
    {
        this.setState({tabledata: JSON.parse(localStorage.getItem('this.state.SelectedList'))})
    }
    else if((localStorage.getItem('token') === "user"))
    {
        this.setState({tabledata: JSON.parse(localStorage.getItem('this.state.SelectedList'))})
    }
    
  
  this.setState((state) => ({
    showText: !state.showText  
}))
  }
  
  render() {
    const showtabledata = 
    (this.state.tabledata !== null) ? 
    this.state.tabledata.map((allMeme) =>{   
            return(
            <tr key={allMeme.id}>
                <td>{allMeme.id}</td>
                <td>{allMeme.name}</td>
                <td><img src={allMeme.url} alt="" width="50" height="50" /></td>
            </tr>
            )
            
        })
        :
            null
            return(
              <>    
                  <br />
                  
                  {
                      (this.state.tabledata !== null) ?
                      this.state.showText &&
                      <table border="2">
    
                      <tr>
                          <th>Sr no</th>
                          <th>Name</th>
                          <th>Image</th>
                      </tr>
                      
                          {showtabledata}
                      
                      </table>
                  :
                      <p>No List Selected</p>
                  }
    
              </>
              )
          }
      }

export default withRouter(showlist);



































