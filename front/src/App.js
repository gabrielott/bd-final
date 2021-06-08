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

		this.handleEdit = this.handleEdit.bind(this);
	}

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
					onDelete={() => this.props.onDelete(this.props.index)}
					onEdit={this.handleEdit}
					onMoveUp={() => this.props.onMoveUp(this.props.index)}
					onMoveDown={() => this.props.onMoveDown(this.props.index)}
					label={this.props.label}
					type={this.props.type}
					numQuestions={this.props.numQuestions}
					index={this.props.index}
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
		return (
			<div className="question-panel">
				<div className="question-panel-editing">
					<button type="button" onClick={this.props.onDelete}>Apagar</button>
					<Popup
						trigger={<button type="button">Editar</button>}
						position="left center"
						contentStyle={{width: "300px"}}
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
				<div className="question-panel-ordering">
					<button
						disabled={this.props.index === 0}
						type="button"
						onClick={this.props.onMoveUp}
					>
						/\
					</button>
					<button
						disabled={this.props.index === this.props.numQuestions - 1}
						type="button"
						onClick={this.props.onMoveDown}
					>
						\/
					</button>
				</div>
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
		this.handleDelete = this.handleDelete.bind(this);
		this.handleMoveUp = this.handleMoveUp.bind(this);
		this.handleMoveDown = this.handleMoveDown.bind(this);
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

	handleDelete(index) {
		const labels = this.state.labels.slice();
		const names = this.state.names.slice();
		const types = this.state.types.slice();
		const questions = this.state.questions.slice();

		labels.splice(index, 1);
		names.splice(index, 1);
		types.splice(index, 1);
		questions.splice(index, 1);

		this.setState({
			labels: labels,
			names: names,
			types: types,
			questions: questions,
		});

		console.log(`delete ${index}`);
	}

	handleMoveUp(index) {
		console.log(`up ${index}`);

		const labels = this.state.labels.slice();
		const names = this.state.names.slice();
		const types = this.state.types.slice();
		const questions = this.state.questions.slice();

		labels[index - 1] = labels.splice(index, 1, labels[index - 1])[0]
		names[index - 1] = names.splice(index, 1, names[index - 1])[0]
		types[index - 1] = types.splice(index, 1, types[index - 1])[0]
		questions[index - 1] = questions.splice(index, 1, questions[index - 1])[0]

		this.setState({
			labels: labels,
			names: names,
			types: types,
			questions: questions,
		});
	}

	handleMoveDown(index) {
		console.log(`down ${index}`);

		const labels = this.state.labels.slice();
		const names = this.state.names.slice();
		const types = this.state.types.slice();
		const questions = this.state.questions.slice();

		labels[index + 1] = labels.splice(index, 1, labels[index + 1])[0]
		names[index + 1] = names.splice(index, 1, names[index + 1])[0]
		types[index + 1] = types.splice(index, 1, types[index + 1])[0]
		questions[index + 1] = questions.splice(index, 1, questions[index + 1])[0]

		this.setState({
			labels: labels,
			names: names,
			types: types,
			questions: questions,
		});
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
					onDelete={this.handleDelete}
					onMoveUp={this.handleMoveUp}
					onMoveDown={this.handleMoveDown}
					data={this.state}
					index={i}
					numQuestions={this.state.labels.length}
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
