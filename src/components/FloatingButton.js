import React from 'react';

class FloatingButton extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { showBtn: true}
  }

    render() {
      //this.props.toggleViewButton();
      return(
        <div className="floatbtn"onClick={this.props.handleClick}>
          <a>
            <span className="floatbtn-icon fa fa-plus"></span>
          </a>
        </div>  
      );
    }
}

export default FloatingButton;
