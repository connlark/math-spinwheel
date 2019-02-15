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
import CountUp from 'react-countup';
var random = require("random-js")(); // uses the nativeMath engine



var divStyle = {
 // background: "#eee",
  padding: "20px",
  margin: "20px"
};

const pStyle = {
  fontSize: '15px',
  textAlign: 'center'
};

class App extends Component {
  state = {
    open: false,
    resultCount: 0,
    totalWon: 0,
    score: 5,
    wheelOptions: {
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
        result: require('./imgs/large.jpg')
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
  };

  display(spinResult){
    console.log('dispres', spinResult)

    //this.setState({ resultCount: this.state.resultCount });
    //return <img src={`${spinResult}`} alt={"result"} />
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    
    //window.location.reload()
    window.location.href=window.location.href
    //this.setState({ open: false });
  };

  calcTotalWon = (e) => {
    let retuner = 0;
    let chance = 0;
    switch (e) {
      case '/static/media/med.3de86e32.jpg':
        retuner =  random.integer(5, 7);
        chance = 'Decent Luck (5-7)';
        break;
      case '/static/media/small.2d17d3a1.jpeg':
        chance = 'Not Great (1-4)';
        retuner =  random.integer(1, 4);
        break;
      default:
        chance = 'Good Luck 😁 (8-11)';
        retuner = random.integer(8, 11);
        break;
    }
    //alert(retuner)
    this.setState({chanceWon: chance})
    return retuner
    
  }

  componentDidUpdate(prevProps, prevState) {
    //alert('ff')
    if (this.props.todos?.length > 0 && this.props.todos?.length !== prevProps.todos?.length){
     // alert('riogjrogijriojgroigjrogjrgoij')
     console.log(this.props.todos)
      const totalWon = this.calcTotalWon(this.props.todos[this.props.todos.length-1]?.text);
      
      this.setState({
        totalWon: totalWon
      }, () => {
        this.handleClickOpen()
      })

    }

    /*if (this.props.score !== prevProps.score){
      console.log(this.state.wheelOptions)
      this.setState({wheelOptions: this.state.wheelOptions})
    }*/
    
    //alert(this.props.todos)
  }

  render() {
    const { chanceWon, wheelOptions } = this.state;
    return (
      <>
      <MenuAppBar/>
      <div className="App-header">
      
      <div style={divStyle}>

      
      <SpinningWheel
        sources={wheelOptions}
        displayResult={this.display.bind(this)}
        
        numberOfSources={3}
        //rotations={5}
        backgroundColor="black"
        outerRingColor="black"
        buttonColor="red"
        onEndME={(res) => alert(res)}
      />
      </div>
    
       </div>
       
       {/* <SimpleDialogDemo
         score={this.state.score}
         updateScore={(score) => {
           this.setState({score: score})
           console.log(this.state.wheelOptions);
           let newopts = this.state.wheelOptions;
           newopts[5] = undefined
           this.setState({wheelOptions: newopts})
          }}
       /> */}

       <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >

        
          <DialogTitle id="alert-dialog-title">{`Luck Factor: ${chanceWon}`}</DialogTitle>

          <DialogContent>
       

          
          <CountUp 
            end={this.state.totalWon} 
            duration={2}
            decimals={3}
            prefix={`Punches Won: `}
            className="App-textwon"
          />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Again
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
