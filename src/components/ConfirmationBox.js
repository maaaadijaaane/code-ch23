import React from 'react';

class ConfirmDialogue extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
          <div className="modal" role="dialog">
            <div className="modal-content">
                <div className="modal-header">
                  <p className="modal-title">Confirm Round Deletion</p>
                    <button className="close-modal-button" onClick={this.cancelDelete}>
                      &times;</button>
                </div>
                <div className="modal-body">
                  <h4>Are you sure that you want to delete this round?</h4>
                  <div className="modal-footer">
                      <button className="btn btn-primary"
                        onClick={this.props.confirmDelete}>
                      Yes, delete round</button>
                      <button className="btn btn-secondary" 
                        onClick={this.props.confirmDelete}>
                      No, do not delete round</button>
                  </div>
                </div>
            </div>
          </div>
        );
    }   
}

export default ConfirmDialogue;