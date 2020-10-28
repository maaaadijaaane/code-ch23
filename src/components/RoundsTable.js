import React from 'react';
import AppMode from './../AppMode.js';
import ConfirmDialogue from './ConfirmationBox.js';

class RoundsTable extends React.Component {
  constructor(props){
    super(props);
    this.state ={showConfirmDelete: false,
                confirmDeleteRound: false,
                table: []
    };
  }
  
  //editRound -- Triggered when the user clicks the edit button for a given
  //round. The id param is the unique property that identifies the round.
  //Set the state variable representing the id of the round to be edited and
  //then switch to the ROUNDS_EDITROUND mode to allow the user to edit the
  //chosen round.
  editRound = (id) => {
    this.props.setEditId(id);
    this.props.changeMode(AppMode.ROUNDS_EDITROUND);
  }

  remove = (rowID) => {
    const arrayCopy = this.state.data.filter((row) => row.id !== rowID);
    this.setState({data: arrayCopy});
  }
  //confirmDelete -- Triggered when the user clicks the delete button
  //for a given round. The id paam is the unique property that 
  //identifies the round. Set the state variable representing the id
  //of the round to be deleted and then present a dialog box asking
  //the user to confirm the deletion.
  //TO DO: Implement the confirmation dialog box. For now, we
  //present alert box placeholder
  confirmDelete = (id) => {
    this.props.setDeleteId(id);
    if(this.showConfirmDelete)
    {
      this.ConfirmDialogue();
      this.props.deleteRound();
    }
    this.props.changeMode(AppMode.ROUNDS);
    // if(this.confirmDeleteRound){
    //   var table = [...this.state.table];
    //   table.splice(id, 1);
    //   this.setState({table});
    // }
    // this.props.changeMode(AppMode.ROUNDS);
  }

  //renderTable -- render an HTML table displaying the rounds logged
  //by the current user and providing buttons to view/edit and delete each round.
  renderTable = () => {
  let table = [];
  for (const r in this.props.rounds) {
    table.push(
      <tr key={r}>
        <td>{this.props.rounds[r].date}</td>
        <td>{this.props.rounds[r].course}</td>
        <td>{(Number(this.props.rounds[r].strokes) + 
              Number(this.props.rounds[r].minutes)) +
              ":" + this.props.rounds[r].seconds + " (" + 
              this.props.rounds[r].strokes + 
              " in " + this.props.rounds[r].minutes + ":" + 
              this.props.rounds[r].seconds + ")"}
        </td>
        <td><button onClick={this.props.menuOpen ? null : () => 
          this.editRound(r)}>
              <span className="fa fa-eye"></span></button></td>
        <td><button onClick={this.props.menuOpen ? null : 
          () => this.confirmDelete}>
              <span className="fa fa-trash"></span></button></td>
      </tr> 
    );
  }
  return table;
  }

  searchRoundsTable(searchVal) {
    searchVal = searchVal.toUpperCase(); //case insensitive
    let table = document.getElementById("myRoundsTable");
    let tr = table.getElementsByTagName("tr");
    let td, rowText, i, j, txtVal;
    for (i = 1; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      rowText = "";
      for (j = 0; j < 3; ++j) { //only consider Date, Course, Score cols
        txtVal = td[j].textContent;
        rowText += txtVal;
      }
      if (rowText != "") {
        if (rowText.toUpperCase().indexOf(searchVal) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  
  addToOrUpdateRoundTable(add, roundIndex) {
  let user = localStorage.getItem("userId");
  let data = JSON.parse(localStorage.getItem(user));
  let roundData = data.rounds[roundIndex]; //the round data to add/edit
  let roundsTable = document.getElementById("myRoundsTable");
  let roundRow;
  if (add) { //add new row
    //Test whether table is empty
    if (roundsTable.rows[1].innerHTML.includes ("colspan")) {
      //empty table! Need to remove this row before adding new one
      roundsTable.deleteRow(1);
     }
     roundRow = roundsTable.insertRow(1); //insert new row
     roundRow.classList.add("row-item"); //Needed for sorting
     roundRow.id = "r-" + roundIndex; //set id of this row so we can edit/delete later
  } else { //update existing row
    roundRow = document.getElementById("r-" + roundIndex);
  }
  //Add/update row with five cols to table
  roundRow.innerHTML = "<td>" + roundData.date + "</td><td>" +
   roundData.course + "</td><td>" + roundData.SGS + 
   " (" + roundData.strokes +
   " in " + roundData.minutes + ":" + roundData.seconds + 
   ")</td>" +
   "<td><button onclick='editRound(" + roundIndex + ")'><span class='fas fa-eye'>" +
   "</span>&nbsp;<span class='fas fa-edit'></span></button></td>" +
   "<td><button onclick='confirmDelete(" + roundIndex + ")'>" +
   "<span class='fas fa-trash'></span></button></td>";
}
  //render--render the entire rounds table with header, displaying a "No
  //Rounds Logged" message in case the table is empty.
  render() {
    return(
    <div className="padded-page">
      <div class="input-group center-search">
        <span class="input-group-prepend">
          <div class="input-group-text bg-transparent border-right-0">
            <i class="fa fa-search"></i>
          </div>
        </span>
        <input class="form-control py-2 border-left 0 border" placeholder="Search Rounds" type="search" value="" id="searchRounds"
        onkeyup="searchRoundsTable(this.value)" onsearch="searchRoundsTable(this.value)"></input>
      </div>
      <h1></h1>
      <table className="table table-hover">
        <thead className="thead-light">
        <tr>
          <th onClick="w3.sortHTML('#myRoundsTable','.row-item','td:nth-child(1)'" style="cursor-pointer">
            <span class="fas fa-sort"></span>&nbsp;Date
            </th>
          <th onClick="w3.sortHTML('#myRoundsTable','.row-item','td:nth-child(2)'" style="cursor-pointer">
            <span class="fas fa-sort"></span>&nbsp;Course
            </th>
          <th onClick="w3.sortHTML('#myRoundsTable','.row-item','td:nth-child(3)'" style="cursor-pointer">
            <span class="fas fa-sort"></span>&nbsp;Score
          </th>
          <th>View/Edit...</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
          {Object.keys(this.props.rounds).length === 0 ? 
          <tr>
          <td colSpan="5" style={{fontStyle: "italic"}}>No rounds logged</td>
          </tr> : this.renderTable()
          }
        </tbody>
      </table>
    </div>
    );
  }
}

export default RoundsTable;
