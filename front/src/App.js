import React from 'react';
import './App.css';

function TextQuestion(props) {
	return (
		<div className="question" onChange={props.onChange}>
			<label className="inner-question">
				{props.label}:
				<input type="text" name={props.name}/>
			</label>
			<button onClick={props.onEdit}>
				Editar
			</button>
		</div>
	);
}

function BoolQuestion(props) {
	return (
		<div className="question" onChange={props.onChange}>
			<label className="inner-question">
				{props.label}:
				<label>
					Sim
					<input type="radio" value="true" name={props.name}/>
				</label>
				<label>
					Não
					<input type="radio" value="false" name={props.name}/>
				</label>
			</label>
			<button onClick={props.onEdit}>
				Editar
			</button>
		</div>
	);
}

function Survey(props) {
	return (
		<div className="survey">
			<form>
				{props.questions}
				<input type="submit"/>
			</form>
		</div>
	);
}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = (target.type === "checkbox") ? target.checked : target.value;
		const name = target.name;

		console.log(`${name} = ${value}`);

		this.setState({
			[name]: value,
		});
	}

	render() {
		const questions = [
			<BoolQuestion key="1" name="radio" label="uma pergunta" onChange={this.handleInputChange}/>,
			<TextQuestion key="2" name="texto" label="teste" onChange={this.handleInputChange}/>,
			<TextQuestion key="3" name="texto" label="teste" onChange={this.handleInputChange}/>,
			<TextQuestion key="4" name="texto" label="teste" onChange={this.handleInputChange}/>,
		];

		return (
			<Survey questions={questions}/>
		);
	}
}

export default App;
