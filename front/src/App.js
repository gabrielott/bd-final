import React from "react";
import Popup from "reactjs-popup";
import './App.css';
import "reactjs-popup/dist/index.css";

const QuestionType = Object.freeze({
	text: "1",
	boolean: "2",
	date: "3"
});

function TextQuestion(props) {
	return (
		<div className="question-inner">
			<label>
				<input defaultValue={props.label} type="text" name={props.name}/>
			</label>
		</div>
	);
}

function DateQuestion(props) {
	return (
		<div className="question-inner">
			<label>
				<input defaultValue={props.label} type="date" name={props.name}/>
			</label>
		</div>
	);
}

function BoolQuestion(props) {
	return (
		<div className="question-inner">
			<label>
				<input type="radio" value="true" name={props.name}/>
				Sim
			</label>
			<label>
				<input type="radio" value="false" name={props.name}/>
				Não
			</label>
		</div>
	);
}

class Question extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			question: this.props.question,
			label: this.props.label,
			type: this.props.type
		};

		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}

	handleDelete() {
		console.log(`delete ${this.props.name}`);
	}

	/*handleCreate() {
		let question;
		switch (type) {
			case QuestionType.text:
				question = <TextQuestion name={this.props.name}/>;
				break;
			case QuestionType.boolean:
				question = <BoolQuestion name={this.props.name}/>;
				break;
			case QuestionType.date:
				question = <DateQuestion name={this.props.name}/>;
				break;
			default:
				break;
		}

		this.setState({question: question, label: label, type: type});
	}*/

	handleEdit(label, type) {
		let question;
		switch (type) {
			case QuestionType.text:
				question = <TextQuestion name={this.props.name}/>;
				break;
			case QuestionType.boolean:
				question = <BoolQuestion name={this.props.name}/>;
				break;
			case QuestionType.date:
				question = <DateQuestion name={this.props.name}/>;
				break;
			default:
				break;
		}

		this.setState({question: question, label: label, type: type});
	}

	render() {
		return (
			<div className="question">
				<div className="question-left" onChange={this.props.onChange}>
					<div className="question-title">
						{this.state.label}
					</div>
					{this.state.question}
				</div>
				<QuestionPanel
					onDelete={this.handleDelete}
					onEdit={this.handleEdit}
					onChange={this.handleInputChange}
					label={this.props.label}
					type={this.props.type}
				/>
			</div>
		);
	}
}

class QuestionPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			label: this.props.label,
			type: this.props.type,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = (target.type === "checkbox") ? target.checked : target.value;
		const name = target.name;

		console.log(`${name} = ${value}`);

		this.setState({
			[name]: value
		});
	}


	render() {
		const popupStyle = {
			width: "300px"
			// height: "20%",
		};

		return (
			<div className="question-panel">
				<button type="button" onClick={this.props.onDelete}>Apagar</button>
				<Popup
					trigger={<button type="button">Editar</button>}
					position="left center"
					contentStyle={popupStyle}
					closeOnDocumentClick
				>
					<form className="edit-popup" onChange={this.handleInputChange}>
						<label>
							Título:
							<input
								name="label"
								type="text"
								value={this.state.label}
							/>
						</label>
						<div className="edit-radio">
							<label>
								<input name="type" type="radio" value={QuestionType.text}/>
								Textual
							</label>
							<label>
								<input name="type" type="radio" value={QuestionType.boolean}/>
								Booleano
							</label>
							<label>
								<input name="type" type="radio" value={QuestionType.date}/>
								Data
							</label>
						</div>
						<button
							type="button"
							onClick={() => this.props.onEdit(this.state.label, this.state.type)}>
							Salvar
						</button>
					</form>
				</Popup>
			</div>
		);
	}

}

function Survey(props) {
	return (
		<div className="survey">
			<h1>{props.title}</h1>
			<form onSubmit={props.onSubmit}>
				{props.questions}
				<input type="submit"/>
			</form>
		</div>
	);
}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			labels: [
				"radio label",
				"texto label",
				"date label",
				"texto label 2",
				"texto label 3"
			],
			names: [
				"radio",
				"textoA",
				"dateA",
				"textoB",
				"textoC"
			],
			types: [
				QuestionType.boolean,
				QuestionType.text,
				QuestionType.date,
				QuestionType.text,
				QuestionType.text
			],
			questions: [
				<BoolQuestion name="radio"/>,
				<TextQuestion name="texto1"/>,
				<DateQuestion name="date1"/>,
				<TextQuestion name="texto2"/>,
				<TextQuestion name="texto3"/>
			]
		};

		this.unique_iter = 0;

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
	}

	handleSubmit(event) {
		console.log(this.state.texto);
		event.preventDefault();
	}

	handleInputChange(event) {
		const target = event.target;
		const value = (target.type === "checkbox") ? target.checked : target.value;
		const name = target.name;

		console.log(`${name} = ${value}`);

		this.setState({
			[name]: value
		});
	}

	handleCreate(event) {
		let auxl = this.state.labels;
		auxl.push("label nova");
		let auxn = this.state.names;
		auxn.push("texto"+this.unique_iter);
		let auxt = this.state.types;
		auxt.push(QuestionType.text);
		let auxq = this.state.questions;
		auxq.push(<TextQuestion name="textonovo"/>);
		this.setState({
			labels: auxl,
			names: auxn,
			types: auxt,
			questions: auxq
		});
		this.unique_iter++;
	}

	render() {

		const generic_questions = this.state.questions.map((q, i) => {
			return (
				<Question
					label={this.state.labels[i]}
					question={q}
					name={this.state.names[i]}
					key={this.state.names[i]}
					type={this.state.types[i]}
					onChange={this.handleInputChange}
				/>
			);
		});

		return (
			<div>
				<div className="add-button">
					<button type="button" onClick={this.handleCreate}>+</button>
				</div>	
				<Survey title="Questionário" questions={generic_questions}/>
			</div>
		);
	}
}

export default App;
