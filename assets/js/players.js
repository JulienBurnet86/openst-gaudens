const e = React.createElement;

function EntryList(title, entries) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, " ", title, " "), /*#__PURE__*/React.createElement("table", {
    className: "table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Ranking"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Country"))), /*#__PURE__*/React.createElement("tbody", null, entries.map(e => {
    const player = e.players[0];
    const link = "https://www.itftennis.com/" + player.profileLink;
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, " ", player.atpWtaRank), /*#__PURE__*/React.createElement("td", null, " ", /*#__PURE__*/React.createElement("a", {
      target: "blank",
      href: link
    }, " ", player.familyName, " ", player.givenName, " ")), /*#__PURE__*/React.createElement("td", null, " ", player.nationalityCode));
  }))), /*#__PURE__*/React.createElement("hr", null));
}

class EntryLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }

  componentDidMount() {
    fetch("assets/js/entryList.json").then(response => {
      return response.json();
    }).then(json => {
      return json[0].entryClassifications;
    }).then(lists => {
      this.setState({
        lists: lists
      });
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, this.state.lists.map(list => {
      return EntryList(list.entryClassification, list.entries);
    }));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(EntryLists, null), document.getElementById("entryList"));