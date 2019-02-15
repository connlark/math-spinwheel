import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SpinningWheel } from "./random_selection";
import MenuAppBar from './MenuAppBar'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SimpleDialogDemo from './SimpleDialogDemo'
import { connect } from 'react-redux'
import { addTodo } from './actions'

const wheelOptions = {
  1: {
    image: require('./imgs/small.jpeg'),
    result: require('./imgs/small.jpeg')
  },
  2: {
    image: require('./imgs/med.jpg'),
    result: require('./imgs/med.jpg')
  },
  3: {
    image: require('./imgs/large.jpg'),
    result: require('./imgs/med.jpg')
  },
  4: {
    image: require('./imgs/small.jpeg'),
    result: require('./imgs/small.jpeg')
  },
  5: {
    image: require('./imgs/med.jpg'),
    result: require('./imgs/med.jpg')
  },
  6: {
    image: require('./imgs/small.jpeg'),
    result: require('./imgs/small.jpeg')
  },
}


var divStyle = {
 // background: "#eee",
  padding: "20px",
  margin: "20px"
};

class App extends Component {
  state = {
    open: false,
    resultCount: 0
  };

  display(spinResult){
    console.log('dispres', spinResult)

    //this.setState({ resultCount: this.state.resultCount });
    return <img src={`${spinResult}`} alt={"result"} />
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  UNSAFE_componentDidUpdate(prevProps, prevState) {
    if (this.props.todos?.length !== prevProps.todos?.length){
      alert('riogjrogijriojgroigjrogjrgoij')
    }
  }

  render() {
    return (
      <>
      <MenuAppBar/>
      <div className="App-header">
      
      <div style={divStyle}>

      
      <SpinningWheel
        sources={wheelOptions}
        displayResult={this.display.bind(this)}
        
        numberOfSources={14}
        //rotations={5}
        backgroundColor="red"
        outerRingColor="black"
        buttonColor="red"
        onEndME={(res) => alert(res)}
      />
      </div>
      <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
        Hello World
      </Button>
    
       </div>
       
       <SimpleDialogDemo/>

       <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
       </>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => null
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
