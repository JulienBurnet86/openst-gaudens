class Draws extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: "singles"
		}
		
	}

	componentDidMount() {
		this.reload("singles")
	}

	handleChange(e) {
		this.reload(e.target.value)
	}
	
	reload(draw) {
		this.setState({selected: draw})
		fetch("/assets/json/"+draw+".json")
		.then(response => {
			return response.json();
		})
		.then(json => {
			var titles = ['1st Round', '2nd round', '3rd round', 'Quarter', 'Semi', 'Finale']; //-- example titles
			console.log(json)
			$('#singles').brackets(json);
		});
	}

	render() {
		return <div>
				<select name="selected" value={this.state.selected} onChange={ this.handleChange.bind(this) } >
					<option value="singles">Singles</option>
					<option value="doubles">Doubles</option>
					<option value="quali">Qualifications</option>
				</select>
				<section id="singles">

				</section>
			</div>
			;
	}
	
}

ReactDOM.render(<Draws />, document.getElementById("results"));
