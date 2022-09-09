import React, { Component, Fragment } from "react";
import axios from 'axios';
import './App.css'
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class List extends Component {
  constructor(props){
    super(props);
    this.state={
    file:[],
    value:'',
    checked:false,
    SelectedList:[],
    selecteddata:''
    };
    this.ClickCheckbox = this.ClickCheckbox.bind(this);
  }
  
   onCheck(e) {
    let tempList = this.state.file;
    tempList.slice(0, 15).map((allMeme) => (allMeme.selected = e.target.checked));
    this.setState({
      checked: e.target.checked,
      file: tempList,
      SelectedList: this.state.file.filter((e) => e.selected),
    });
  }

  onItemCheck(e, allMeme1) {
    let tempList = this.state.file;
    tempList.map((allMeme) => {
      if (allMeme.id === allMeme1.id) {
        allMeme.selected = e.target.checked; 
      }
      return allMeme;
    });

    const totalItems = this.state.file.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;

    this.setState({
      checked: totalItems === totalCheckedItems,
      file: tempList,
      SelectedList: this.state.file.filter((e) => e.selected),
      
    });
  }

  getSelectedRows() {
    this.setState({
      SelectedList: this.state.file.filter((e) => e.selected),
    });
  }


   ClickCheckbox() {
    if(localStorage.getItem('token') === "admin")
    {
      localStorage.setItem('this.state.SelectedList', JSON.stringify(this.state.SelectedList));
      alert('list saved successfully')
    }
    else if(localStorage.getItem('token') === "user")
    {
      localStorage.setItem('this.state.SelectedList', JSON.stringify(this.state.SelectedList));
      alert('list saved successfully')
    }
    else
    {
      localStorage.setItem('this.state.SelectedList', []);
      localStorage.setItem('this.state.SelectedList', []);
    }
  }

  componentDidMount() {
    axios.get('https://api.imgflip.com/get_memes').then(res =>{
    console.log(res.data.data.memes);
    this.setState({file:res.data.data.memes})
      })
    }
 
  render() {
    return (
      <Fragment>
        <div className="container">
        <div >
        <form >
        <button className="S-btn" type="button" onClick={this.ClickCheckbox}> Save </button>
        </form>
        <Link to="/dashboard">
        <form>
        <button className="C-btn" > Cancel </button>
        </form>
        </Link>
        </div>
        <table className="tabledata">
        <thead>
        <tr>
          <th> <input type="checkbox" className="form-check-input" checked={this.state.checked}
                  id="check" onChange={(e) => this.onCheck(e)}/></th>
          <th>Sr no</th>
          <th>Name</th>
          <th>Image</th>
        </tr>
        </thead>
        <tbody>
        { (this.state.file.length > 0) ? this.state.file.slice(0,15).map( (allMeme, index) =>{
          return(
           <tr key={allMeme.id} className={allMeme.selected ? "selected" : ""}>
             <td> <input
                                type="checkbox"
                                checked={allMeme.selected}
                                className="form-check-input"
                                id="rowcheck{allMeme.id}"
                                onChange={(e) => this.onItemCheck(e, allMeme)}
                                /></td>
             <td>{allMeme.id}</td>
             <td>{allMeme.name}</td>
             <td><img src={allMeme.url} alt="" width="100" height="100"></img></td>
           </tr>
           )
          }) : <tr><td colSpan="4"></td></tr> }
           
        </tbody>
        </table>  
        <button
                className="btn btn-primary"
                onClick={() => this.getSelectedRows()}
                >
                    Selected Items {this.state.SelectedList.length} 
                </button>
        </div>
      </Fragment>
      
    );
  }
}
export default withRouter(List);






























































