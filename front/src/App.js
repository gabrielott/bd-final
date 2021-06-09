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

function Question(props) {
	return (
		<div className="question">
			<div className="question-left" onChange={props.onChange}>
				<div className="question-title">
					{props.description.label}
				</div>
				{props.description.question}
			</div>
			<QuestionPanel
				description={props.description}
				index={props.index}
				numQuestions={props.numQuestions}
				onEdit={props.onEdit}
				onDelete={() => props.onDelete(props.index)}
				onMoveUp={() => props.onMoveUp(props.index)}
				onMoveDown={() => props.onMoveDown(props.index)}
			/>
		</div>
	);
}

class QuestionPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			label: this.props.description.label,
			type: this.props.description.type,
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
								onClick={() => this.props.onEdit(this.props.index, this.state.label, this.state.type)}>
								Salvar
							</button>
						</form>
					</Popup>
				</div>
				<div className="question-panel-ordering">
					<button
						disabled={this.props.description.index === 0}
						type="button"
						onClick={this.props.onMoveUp}
					>
						/\
					</button>
					<button
						disabled={this.props.description.index === this.props.numQuestions - 1}
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
			items: [
				{
					label: "texto label 3",
					name: "textoC",
					type: QuestionType.text,
					question: <TextQuestion name="texto3"/>
				},
				{
					label: "texto label 2",
					name: "textoB",
					type: QuestionType.text,
					question: <TextQuestion name="texto2"/>,
				},
				{
					label: "date label",
					name: "dateA",
					type: QuestionType.date,
					question: <DateQuestion name="date1"/>,
				},
				{
					label: "texto label",
					name: "textoA",
					type: QuestionType.text,
					question: <TextQuestion name="texto1"/>,
				},
				{
					label: "radio label",
					name: "radio",
					type: QuestionType.boolean,
					question: <BoolQuestion name="radio"/>,
				},
			],
		};

		this.unique_iter = 0;

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
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

	handleCreate() {
		const items = this.state.items.slice();
		items.push({
			label: "Nova pergunta",
			name: this.unique_iter,
			type: QuestionType.text,
			question: <TextQuestion name={this.unique_iter}/>,
		});

		this.unique_iter++;
		this.setState({items: items});
	}

	handleEdit(index, label, type) {
		console.log(`edit index=${index} label=${label} type=${type}`)
		const items = this.state.items.slice();
		const item = this.state.items[index];

		item.label = label;
		item.type = type;
		switch (item.type) {
			case QuestionType.text:
				item.question = <TextQuestion name={item.name}/>;
				break;
			case QuestionType.boolean:
				item.question = <BoolQuestion name={item.name}/>;
				break;
			case QuestionType.date:
				item.question = <DateQuestion name={item.name}/>;
				break;
			default:
				break;
		}

		items.splice(index, 1, item);
		this.setState({items: items});
	}


	handleDelete(index) {
		const items = this.state.items.slice();
		items.splice(index, 1);
		this.setState({items: items});
	}

	handleMoveUp(index) {
		const items = this.state.items.slice();
		items[index - 1] = items.splice(index, 1, items[index - 1])[0];
		this.setState({items: items});
	}

	handleMoveDown(index) {
		const items = this.state.items.slice();
		items[index + 1] = items.splice(index, 1, items[index + 1])[0];
		this.setState({items: items});
	}

	render() {
		const generic_questions = this.state.items.map((item, i) => {
			return (
				<Question
					description={item}
					key={item.name}
					index={i}
					numQuestions={this.state.items.length}
					onChange={this.handleInputChange}
					onEdit={this.handleEdit}
					onDelete={this.handleDelete}
					onMoveUp={this.handleMoveUp}
					onMoveDown={this.handleMoveDown}
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
