const e = React.createElement;

function EntryList(title, entries) {
	return (
		<div>
			<h2> { title } </h2>
			<table className="table">
				<thead>
					<tr>
						<th>Ranking</th>
						<th>Name</th>
						<th>Country</th>
					</tr>
				</thead>
				<tbody>
				{
					entries.map((e) => {
						const player = e.players[0];
						const link = "https://www.itftennis.com/" + player.profileLink;
						return (
							<tr>
								<td> {player.atpWtaRank}</td>
								<td> <a target="blank" href={link}> {player.familyName} {player.givenName} </a></td>
								<td> {player.nationalityCode}</td>
							</tr> 
						)
					} )
				}
				</tbody>
			</table>
			<hr />
		</div>
		
	);
} 

class EntryLists extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: []
		}
		
	}

	componentDidMount() {
		fetch("assets/js/entryList.json")
		.then(response => {
			return response.json();
		})
		.then(json => {
			return json[0].entryClassifications
		})
		.then(lists => {
			this.setState({ lists: lists});
		});
	}

	render() {
		return <div>
					{this.state.lists.map(list => {
						return (EntryList(list.entryClassification, list.entries)) 
					})}
				</div>;
	}
	
}

ReactDOM.render(<EntryLists />, document.getElementById("entryList"));
