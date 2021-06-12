import React from "react";
import "./Questions.css";

class QuestionEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: 0,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
		this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.props.onChangeQuestion(this.state.selected, name, value);
	}

	handleSelect(index) {
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

	render() {
		const questions = this.props.questions.map((q, i) =>
			<li
				key={i}
				className={this.state.selected === i ? "qeditor-question-selected" : "qeditor-question"}
				onClick={() => this.handleSelect(i)}
			>
				{q.description}
			</li>
		);

		const type_options = this.props.types.map((t, i) =>
			<option value={i} key={i}>
				{t.description}
			</option>
		);

		const list_type_options = this.props.list_types.map((t, i) =>
			<option value={i} key={i}>
				{t.description}
			</option>
		);

		return (
			<div className="qeditor">
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
							name="list_type"
							value={this.props.questions[this.state.selected].list_type}
							onChange={this.handleInputChange}
						>
							{list_type_options}
						</select>
					</div>
				}
			</div>
		);
	}
}

export default QuestionEditor;
