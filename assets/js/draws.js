class Draws extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "quali"
    };
  }
  componentDidMount() {
    this.reload("singles");
  }
  handleChange(e) {
    this.reload(e.target.value);
  }
  reload(draw) {
    this.setState({
      selected: draw
    });
    fetch("/assets/json/" + draw + ".json").then(response => {
      return response.json();
    }).then(json => {
      $("#singles").brackets(json);
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      class: "row"
    }, /*#__PURE__*/React.createElement("select", {
      class: "col-3 col-12-mobile",
      name: "selected",
      value: this.state.selected,
      onChange: this.handleChange.bind(this)
    }, /*#__PURE__*/React.createElement("option", {
      value: "quali"
    }, "Qualifications"), /*#__PURE__*/React.createElement("option", {
      value: "singles"
    }, "Singles"), /*#__PURE__*/React.createElement("option", {
      value: "doubles"
    }, "Doubles")), /*#__PURE__*/React.createElement("section", {
      id: "singles"
    }));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(Draws, null), document.getElementById("results"));