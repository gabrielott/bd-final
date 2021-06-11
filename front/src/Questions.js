import React from "react";
import "./Questions.css";

class QuestionEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: 0,
			questions: this.props.questions,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		const questions = this.state.questions.slice();
		const question = questions[this.state.selected];
		question[name] = value;

		this.setState({questions: questions});

		console.log(`index=${this.state.selected} name=${name} value=${value}`);
	}

	handleSelect(index) {
		this.setState({selected: index});
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
					<ul>
						{questions}
					</ul>
				</div>
				<div className="qeditor-right">
					<input
						name="description"
						value={this.state.questions[this.state.selected].description}
						onChange={this.handleInputChange}
					/>
					<select
						name="type"
						value={this.state.questions[this.state.selected].type}
						onChange={this.handleInputChange}
					>
						{type_options}
					</select>
					<select
						name="list_type"
						value={this.state.questions[this.state.selected].list_type}
						onChange={this.handleInputChange}
					>
						{list_type_options}
					</select>
				</div>
			</div>
		);
	}
}

export default QuestionEditor;
