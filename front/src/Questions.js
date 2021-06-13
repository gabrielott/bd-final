import React from "react";
import "./Questions.css";

class QuestionEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: 0,
			pending: false,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
		this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleDiscard = this.handleDiscard.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.props.onChangeQuestion(this.state.selected, name, value);
		this.setState({pending: true});
	}

	handleSelect(index) {
		if (this.state.pending) {
			return;
		}

		this.setState({selected: index});
	}

	handleCreateQuestion() {
		this.props.onCreateQuestion(this.state.selected);
		this.setState((state, props) => ({
			selected: props.questions.length - 1,
		}));
	}

	handleDeleteQuestion() {
		this.props.onDeleteQuestion(this.state.selected);
		this.setState((state, props) => ({
			selected: Math.max(0, state.selected - 1),
		}));
	}

	handleSave() {
		console.log("salvar");
		this.setState({pending: false});
	}

	handleDiscard() {
		this.setState({pending: false});
	}

	render() {
		const questions = this.props.questions.map((q, i) => {
			let qclass = "qeditor-question";
			if (this.state.selected === i) {
				if (this.state.pending) {
					qclass= "qeditor-question-pending";
				} else {
					qclass = "qeditor-question-selected";
				}
			} else if (this.state.pending) {
				qclass = "qeditor-question-blocked";
			}

			return (
				<li
					key={i}
					className={qclass}
					onClick={() => this.handleSelect(i)}
				>
					{q.description}
				</li>
			);
		});

		const type_options = this.props.types.map((t, i) =>
			<option value={i} key={i}>
				{t.description}
			</option>
		);

		const list_options = this.props.lists.map((t, i) =>
			<option value={i} key={i}>
				{t.description}
			</option>
		);

		return (
			<div className="qeditor">
				<div className="qeditor-body">
					<div className="qeditor-left">
						<div className="qeditor-left-bar">
							<button onClick={this.handleCreateQuestion}>
								Nova pergunta
							</button>
							<button
								onClick={this.handleDeleteQuestion}
								disabled={this.props.questions.length === 0}
							>
								Apagar selecionada
							</button>
						</div>
						<ul>
							{questions}
						</ul>
					</div>
					{this.props.questions.length > 0 &&
					<div className="qeditor-right">
						<input
							name="description"
							value={this.props.questions[this.state.selected].description}
							onChange={this.handleInputChange}
						/>
						<select
							name="type"
							value={this.props.questions[this.state.selected].type}
							onChange={this.handleInputChange}
						>
							{type_options}
						</select>
						<select
							name="list"
							value={this.props.questions[this.state.selected].list}
							onChange={this.handleInputChange}
						>
							{list_options}
						</select>
					</div>
					}
				</div>
				<div className="qeditor-tail">
					<button
						onClick={this.handleSave}
						disabled={!this.state.pending}
					>
						Salvar
					</button>
					<button
						onClick={this.handleDiscard}
						disabled={!this.state.pending}
					>
						Descartar
					</button>
				</div>
			</div>
		);
	}
}

export default QuestionEditor;
