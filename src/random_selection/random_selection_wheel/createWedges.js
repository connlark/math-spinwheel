import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Fragment } from "react";
import "./styleWedges.css";


var Wedges =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Wedges, _React$Component);

  function Wedges(props) {
    var _this;

    _classCallCheck(this, Wedges);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Wedges).call(this, props));
    _this.state = {
      sources: _this.props.sources,
      rotations: (_this.props.rotations || 8) * 360,
      wedges: null
    };
    return _this;
  }

  _createClass(Wedges, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.createWedges();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.sources !== this.props.sources || prevState.rotations !== this.state.rotations) {
        this.createWedges();
      } else if (prevProps.rotations !== this.props.rotations) {
        this.setState({
          rotations: (this.props.rotations || 8) * 360
        });
      }
    }
  }, {
    key: "triangleStyle",
    value: function triangleStyle(numOfWedges) {
      var leftSideObj = {
        10: 19,
        11: 23,
        12: 26,
        13: 30,
        14: 32,
        15: 34,
        17: 35.5,
        18: 35.6,
        20: 36,
        30: 40,
        40: 43,
        50: 44,
        60: 45.5,
        70: 45.7,
        80: 45.8,
        90: 45.9,
        100: 47.2
      };
      var rightSideObj = {
        10: 81,
        11: 79,
        12: 77.5,
        13: 76,
        14: 75,
        15: 74,
        17: 70.5,
        18: 69,
        20: 66,
        30: 60,
        40: 58,
        50: 56,
        60: 55,
        70: 54,
        80: 53,
        90: 52.5,
        100: 52.8
      };
      var numAsString = "" + numOfWedges;
      var onesPlace = +numAsString[numAsString.length - 1];

      if (rightSideObj[numOfWedges]) {
        return {
          clipPath: "polygon(50% 100%, ".concat(leftSideObj[numOfWedges], "% 0%, ").concat(rightSideObj[numOfWedges], "% 0%)")
        };
      } else {
        var tensPlace = +("" + numOfWedges)[0];
        var lowerRange = +(tensPlace + "0");
        var upperRange = +("" + (tensPlace + 1) + "0");

        if (numOfWedges < 20 && numOfWedges > 15) {
          lowerRange = null;
          upperRange = null;
          var counter = 1;

          while (!lowerRange || !upperRange) {
            if (rightSideObj[numOfWedges + counter]) upperRange = numOfWedges + counter;
            if (rightSideObj[numOfWedges - counter]) lowerRange = numOfWedges - counter;
            counter++;
          }
        }

        var range = [lowerRange, upperRange];

        var _this$findTheSlope = this.findTheSlope(range, leftSideObj, rightSideObj),
            _this$findTheSlope2 = _slicedToArray(_this$findTheSlope, 2),
            leftSlope = _this$findTheSlope2[0],
            rightSlope = _this$findTheSlope2[1];

        var xRight = rightSlope * onesPlace + rightSideObj[lowerRange];
        var xLeft = leftSlope * onesPlace + leftSideObj[lowerRange];
        return {
          clipPath: "polygon(50% 100%, ".concat(xLeft, "% 0%, ").concat(xRight, "% 0%)")
        };
      }
    }
  }, {
    key: "findTheSlope",
    value: function findTheSlope(range, leftKey, rightKey) {
      var lowerRange = range[0];
      var upperRange = range[1];
      var leftSlope = (leftKey[upperRange] - leftKey[lowerRange]) / 10;
      var rightSlope = (rightKey[upperRange] - rightKey[lowerRange]) / 10;
      return [leftSlope, rightSlope];
    }
  }, {
    key: "createWedges",
    value: function createWedges() {
      var wedges = [];
      var totalWedges = Object.keys(this.props.sources).length;
      var degree = 360 / totalWedges;
      var rotateBy = 0;
      var selected = Math.floor(Math.random() * totalWedges);
      var result;
      var triangleStyle = this.triangleStyle(totalWedges);

      for (var key in this.props.sources) {
        var rotation = {
          transform: "rotate(".concat(rotateBy, "deg)")
        };

        if (key == selected || selected == 0 && key == 1) {
          console.log(this.props.sources[key]["image"]);
          console.log(this.props.sources[key]["result"]);
          result = this.props.sources[key]["result"];
        }

        wedges.push(React.createElement("div", {
          key: key,
          style: rotation,
          className: "scaleDiv wedgePosition"
        }, React.createElement("div", {
          style: triangleStyle,
          className: "triangleTransform"
        }, React.createElement("div", null, React.createElement("img", {
          className: "sourceImage",
          src: "".concat(this.props.sources["".concat(key)]["image"]),
          alt: "preview"
        })))));
        rotateBy += degree;
      }

//console.log(result, this.spinBy(degree, selected) + this.state.rotations)

      this.props.setResult(result, this.spinBy(degree, selected) + this.state.rotations);
      this.setState({
        wedges: wedges
      });
    }
  }, {
    key: "spinBy",
    value: function spinBy(degree, selected) {
      return degree * selected - degree < 0 ? 0 : -(degree * selected - degree);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(Fragment, null, this.state.wedges);
    }
  }]);

  return Wedges;
}(React.Component);

export default Wedges;