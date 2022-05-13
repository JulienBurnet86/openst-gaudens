class Draws extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: "quali"
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
			$('#singles').brackets(json);
		});
	}

	render() {
		return <div>
				<select name="selected" value={this.state.selected} onChange={ this.handleChange.bind(this) } >
					<option value="quali">Qualifications</option>
					<option value="singles">Singles</option>
					<option value="doubles">Doubles</option>
				</select>
				<section id="singles">

				</section>
			</div>
			;
	}
	
}

ReactDOM.render(<Draws />, document.getElementById("results"));
