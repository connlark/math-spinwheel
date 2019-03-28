import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import React, { Fragment, useState } from "react";
import "./spinningWheelStyle.css";
import Wedges from "./createWedges.js";
import { connect } from 'react-redux'
import { addTodo } from '../../actions'

import { AwesomeButton } from "react-awesome-button";

import "react-awesome-button/dist/styles.css";
//const [count, setCount] = useState(0);


const SpinningWheel =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(SpinningWheel, _React$Component);

    function SpinningWheel(props) {
      var _this;

      _classCallCheck(this, SpinningWheel);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(SpinningWheel).call(this, props)
      );
      _this.startSpin = _this.startSpin.bind(
        _assertThisInitialized(_assertThisInitialized(_this))
      );
      var numberOfSources = _this.props.numberOfSources;

      if (!numberOfSources || numberOfSources < 10) {
        numberOfSources = 10;
      }

      _this.state = {
        sources: _this.props.sources,
        numberOfSources: numberOfSources,
        backgroundColor: _this.props.backgroundColor || "orange",
        outerRingColor: _this.props.outerRingColor || "white",
        buttonColor: _this.props.buttonColor || "orange",
        durationOfSpin: _this.props.durationOfSpin || 5,
        showWedges: _this.props.showWedges === false ? false : true,
        fadeInTime: _this.props.fadeInTime || 1,
        spinning: false,
        wedgeSources: {},
        spinBy: 0,
        resultLocation: 0,
        result: "",
        displayResult: false,
        disableButton: false,
        updateWheel: false,
        setToZero: false,
        firstSpin: true,
        loadInResult: false,
        onEndME: _this.props.onEndME
      };
      return _this;
    }

    _createClass(SpinningWheel, [
      {
        key: "componentDidMount",
        value: function componentDidMount() {
          if (typeof this.state.sources === "function") {
            this.getWedges();
          } else {
            var sources = this.state.sources;
            var currentValues = Object.values(sources);

            if (currentValues.length < this.state.numberOfSources) {
              sources = this.properNumberOfSources(currentValues);
            }

            this.setWedges(sources);
          }
        }
      },
      {
        key: "properNumberOfSources",
        value: function properNumberOfSources(sources) {
          var currentValues = Object.values(sources);

          while (currentValues.length < this.state.numberOfSources) {
            currentValues = _toConsumableArray(currentValues).concat(
              _toConsumableArray(currentValues)
            );
          }

          currentValues = currentValues.slice(0, this.state.numberOfSources);
          var newSources = this.createShuffleObj(currentValues);
          return newSources;
        }
      },
      {
        key: "createShuffleObj",
        value: function createShuffleObj(array) {
          var sources = {};

          for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var _ref = [array[j], array[i]];
            array[i] = _ref[0];
            array[j] = _ref[1];
          }

          for (var k = 0; k < array.length; k++) {
            sources[k + 1] = array[k];
          }

          return sources;
        }
      },
      {
        key: "getWedges",
        value: function getWedges() {
          var _this2 = this;

          if (typeof this.state.sources === "function") {
            return this.state.sources().then(function(payload) {
              var currentValues = Object.values(payload);

              if (
                currentValues.length < _this2.state.numberOfSources ||
                currentValues.length > _this2.state.numberOfSources
              ) {
                payload = _this2.properNumberOfSources(currentValues);
              }

              _this2.setWedges(payload);
            });
          } else {
            var newOrder = this.createShuffleObj(
              Object.values(this.state.wedgeSources)
            );
            this.setWedges(newOrder);
          }
        }
      },
      {
        key: "setWedges",
        value: function setWedges(sources) {
          this.setState({
            spinning: false,
            wedgeSources: sources,
            spinBy: 0,
            resultLocation: 0,
            displayResult: false,
            updateWheel: false,
            setToZero: true,
            result: null,
            loadInResult: false
          });
        }
      },
      {
        key: "setResult",
        value: function setResult(result, resultLocation) {
          //alert('hi')
          this.setState({
            result: result,
            resultLocation: resultLocation,
            loadInResult: true
          });
        }
      },
      {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
          var _this3 = this;

          if (
            !this.state.firstSpin &&
            !this.state.updateWheel &&
            prevState.result !== this.state.result
          ) {
            this.startSpin();
          } else if (
            prevState.result !== this.state.result &&
            this.state.showWedges &&
            this.state.spinning
          ) {
            this.startSpin();
          } else if (this.state.disableButton) {
            setTimeout(function() {
              _this3.setState({
                displayResult: true,
                disableButton: false,
                spinning: false,
                updateWheel: true
              });
              //////////////////////////////////////////////////////////////////////////////////////////
             //this._this3.onEndME(_this3.state.result)
            // setCount(count + 1)
            prevProps.dispatch(addTodo(_this3.state.result))

              //alert(_this3.state.result)
            }, this.state.durationOfSpin * 1000);
          }
        }
      },
      {
        key: "startSpin",
        value: function startSpin() {
          if (this.state.updateWheel) {
            this.getWedges();
          } else if (!this.state.showWedges) {
            this.setState({
              showWedges: true,
              spinning: true
            });
          } else {
            this.setState({
              spinBy: this.state.resultLocation,
              disableButton: true,
              spinning: true,
              setToZero: false,
              firstSpin: false
            });
          }
        }
      },
      {
        key: "circleStyle",
        value: function circleStyle() {
          if (!this.state.setToZero) {
            return {
              backgroundColor: "".concat(this.props.backgroundColor),
              boxShadow: "0px 0px 0px 12px\n        ".concat(
                this.props.outerRingColor
              ),
              transform: "translate(-50%, 0%) rotate(".concat(
                this.state.spinBy,
                "deg)"
              ),
              transitionDuration: "".concat(this.state.durationOfSpin, "s")
            };
          } else {
            return {
              backgroundColor: "".concat(this.props.backgroundColor),
              boxShadow: "0px 0px 0px 12px\n        ".concat(
                this.props.outerRingColor
              ),
              transform: "translate(-50%, 0%) rotate(0deg)"
            };
          }
        }
      },
      {
        key: "onFIN",
        value: function onFIN() {
          alert('ibFIN')
        }
      },
      {
        key: "buttonStyle",
        value: function buttonStyle() {
          if (this.state.displayResult) {
            return {
              backgroundColor: this.props.buttonColor,
              transition: "opacity ".concat(this.state.fadeInTime, "s"),
              opacity: ".5",
              border: "4px solid ".concat(this.props.buttonBorder),
              outline: "none"

            };
          } else {
            return {
              backgroundColor: this.props.buttonColor,
              border: "4px solid ".concat(this.props.buttonBorder),
              outline: "none"
            };
          }
        }
      },
      {
        key: "displayResultStyle",
        value: function displayResultStyle() {
          if (this.state.displayResult) {
            return {
              transition: "opacity ".concat(this.state.fadeInTime, "s"),
              opacity: "1",
              zIndex: "4"
            };
          } else {
            return {
              opacity: "0"
            };
          }
        }
      },
      {
        key: "render",
        value: function render() {
          var _this4 = this;

          
          var circleState = this.circleStyle();
          var buttonStyle = this.buttonStyle();
          var displayResultStyle = this.displayResultStyle();
          var pointerColor = this.props.outerRingColor
            ? {
                borderColor: "".concat(
                  this.props.outerRingColor,
                  " transparent transparent"
                )
              }
            : {
                borderColor: "white transparent transparent"
              };

              console.log('this.state.loadInResult', this.state.loadInResult)
          var displayResult =
            this.state.loadInResult && this.state.result
              ? React.createElement(
                  "div",
                  {
                    style: displayResultStyle,
                    className: "displayResult"
                  },
                  this.props.displayResult(this.state.result)
                )
              : null;
          var displayWedges = this.state.showWedges
            ? React.createElement(Wedges, {
                sources: this.state.wedgeSources,
                rotations: this.props.rotations,
                setResult: this.setResult.bind(this)
              })
            : null;
          return React.createElement(
            Fragment,
            null,
            React.createElement(
              "div",
              {
                className: "min"
              },
              displayResult,
              React.createElement(
                "div",
                {
                  className: "alignmentOnCircle"
                },
                React.createElement("div", {
                  style: pointerColor,
                  className: "pointer"
                }),
                React.createElement(
                  "div",
                  {
                    disabled: this.state.disableButton,
                    style: buttonStyle,
                    className: "spinnerButton",
                    onClick: function onClick() {
                      //alert('hi')
                      return _this4.startSpin();
                    }
                  },
                  <AwesomeButton ripple style={buttonStyle} >🚀</AwesomeButton>
                )
              ),
              React.createElement(
                "div",
                {
                  style: circleState,
                  className: "circleStyle"
                },
                React.createElement(
                  "div",
                  {
                    className: "createCirlce"
                  },
                  React.createElement(
                    "div",
                    {
                      className: "cirlcePlacement"
                    },
                    displayWedges
                  )
                )
              )
            )
          );
        }
      }
    ]);

    return SpinningWheel;
  })(React.Component);

export default connect()(SpinningWheel);
