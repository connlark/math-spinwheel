import React, { Component } from 'react';
import './App.css';
import { SpinningWheel } from "./random_selection";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux'
import CountUp from 'react-countup';
import Confetti from 'react-confetti'
import { withStyles } from '@material-ui/core/styles';
import { initializeApp } from 'firebase/app';
import { getPerformance } from "firebase/performance";
import { getAnalytics } from "firebase/analytics";
import gtag from 'ga-gtag'

import Reward from 'react-rewards';
import Particles from "react-tsparticles";
import { loadTrianglesPreset } from "tsparticles-preset-triangles";

import { Random } from "random-js";

const random = new Random(); // uses the nativeMath engine

const firebaseConfig = {
  apiKey: "AIzaSyBb2JLoPdIxxRDJcX1cXZWtN8veJeUPGVk",
  authDomain: "math-spinwheel.firebaseapp.com",
  databaseURL: "https://math-spinwheel.firebaseio.com",
  projectId: "math-spinwheel",
  storageBucket: "math-spinwheel.appspot.com",
  messagingSenderId: "719880866067",
  appId: "1:719880866067:web:ab00a4384e377ad0b472e6",
  measurementId: "G-VFT6D7KR5C"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const perf = getPerformance(app);


var divStyle = {
 // background: "#eee",
  padding: "20px",
  margin: "20px",
//  marginTop: -window.innerHeight * 0.8,
};

const wheelOptions = {
  1: {
    image: require('./imgs/small-min.webp'),
    result: require('./imgs/small-min.webp')
  },
  2: {
    image: require('./imgs/med-min.webp'),
    result: require('./imgs/med-min.webp')
  },
  3: {
    image: require('./imgs/large-min.webp'),
    result: require('./imgs/large-min.webp')
  },
  4: {
    image: require('./imgs/small-min.webp'),
    result: require('./imgs/small-min.webp')
  },
  5: {
    image: require('./imgs/med-min.webp'),
    result: require('./imgs/med-min.webp')
  },
  6: {
    image: require('./imgs/small-min.webp'),
    result: require('./imgs/small-min.webp')
  },
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      resultCount: 0,
      totalWon: 0,
      score: 5,
      wheelOptions: {
        1: {
          image: require('./imgs/small-min.webp'),
          result: require('./imgs/small-min.webp')
        },
        2: {
          image: require('./imgs/med-min.webp'),
          result: require('./imgs/med-min.webp')
        },
        3: {
          image: require('./imgs/large-min.webp'),
          result: require('./imgs/large-min.webp')
        },
        4: {
          image: require('./imgs/small-min.webp'),
          result: require('./imgs/small-min.webp')
        },
        5: {
          image: require('./imgs/med-min.webp'),
          result: require('./imgs/med-min.webp')
        },
        6: {
          image: require('./imgs/small-min.webp'),
          result: require('./imgs/small-min.webp')
        },
      },
      runConfetti: false
    };
    
    this.domRef = React.createRef();
  }
  

  display(spinResult){
    //console.log('dispres', spinResult)

    //this.setState({ resultCount: this.state.resultCount });
    //return <img src={`${spinResult}`} alt={"result"} />
  }

  handleClickOpen = () => {
    const { currentWon } = this.state;
        
    this.setState({ open: true }, () => {
      setTimeout(() => {
        if (currentWon < 3){
          this.reward.punishMe();
        }
        else { 
         // this.reward.rewardMe();
        }
      }, 200);
    });
  };

  handleClose = () => {
    
    window.location.reload(false)
    //window.location.href=window.location.href
   //this.setState({ open: false});
    //this.setState(this.state)
  };

  calcTotalWon = (e) => {
    let retuner = 0;
    let chance = 0;
    //console.log(e[0])
    //console.log(e?.[0]?.text)
    if (e.includes('med-min')){
      retuner =  random.integer(3, 6);
      chance = '🙂 (3-6)';
    }
    else if (e.includes('small-min')){
      chance = '😕 (1-3)';
      retuner =  random.integer(1, 3);
    }
    else {
      chance = '🤑 (7-10)';
      retuner = random.integer(7, 10);
    }

    

    this.setState({chanceWon: chance, currentWon: retuner})
    return retuner
    
  }

  componentDidUpdate(prevProps, prevState) {
    //alert('ff')
    if (this.props.todos?.length > 0 && this.props.todos?.length !== prevProps.todos?.length){
     // alert('riogjrogijriojgroigjrogjrgoij')
     //console.log(this.props.todos[this.props.todos.length-1].text)
      const totalWon = this.calcTotalWon(this.props.todos[this.props.todos.length-1]?.text);
      
      gtag('event', 'won', {
        score: String(totalWon),
      })
      


     

      this.setState({
        totalWon: totalWon,
        runConfetti: true
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

  customInit(main) {
    // this adds the preset to tsParticles, you can safely use the
    loadTrianglesPreset(main);
  }

  render() {


    const { chanceWon, wheelOptions, runConfetti} = this.state;
    const { classes  } = this.props;
    const options = {
      preset: "triangles",
      fpsLimit: 40,
      background: {
        color: {
          value: "#f04135",
        },
      },
      particles: {
        number: {
          value: 10,
          limit: 10,
          density: {
            enable: true,
            value_area: 800
          }
        },
      }
    };

    return (
      <>
       <Particles
      id="tsparticles"
  
      options={options} init={this.customInit} 
    />
                
      
                <div className="row">
    <div  style={{display: 'flex', justifyContent: 'center'}}>
      <div style={divStyle}>

      
      <SpinningWheel
        sources={wheelOptions}
        displayResult={this.display.bind(this)}
        
        numberOfSources={6}
        //rotations={5}
        durationOfSpin={3}
        backgroundColor="black"
        outerRingColor="black"
        buttonColor="transparent"
       // onEndME={(res) => alert(res)}
      />
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
       </div>
</div>
       
      
       <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{ paper: classes.dialogPaper }}
       

                  >
          
        
          <DialogTitle id="alert-dialog-title">{`                  `}</DialogTitle>

          <DialogContent>
       

          <Reward
            ref={(ref) => { this.reward = ref }}
            type='emoji'
            lifetime={2000}
            angle={95}
            elementCount={90}
            zIndex={100}
            spread={360}
          >
          
          <CountUp 
            end={this.state.totalWon} 
            duration={this.state.totalWon < 5 ? 0.01:1.2}
            decimals={0}
           // prefix={`Punches Won: `}
            className="App-textwon"
          />
          </Reward>

          </DialogContent>
          <Confetti
       style={{zIndex: 10, maxHeight: '30vh',
              maxWidth: '30vh', minWidth: '30vh'}}
    //numberOfPieces={40}
       // run={runConfetti}


          />

          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus style={{zIndex: 100}}> 
              Spin Again!
            </Button>
          </DialogActions>
        
        </Dialog>
       
       </>
    );
  }
}
const styles = {
  dialogPaper: {
    maxHeight: '40vh',
    maxWidth: '40vh'
},
};

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => null
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App))
