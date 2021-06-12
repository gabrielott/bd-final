import React from "react";
import "./Forms.css"

class Survey extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			description: this.props.description,
			modules: this.props.modules,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});

		console.log(`survey: ${name} = ${value}`);
	}

	render() {
		const modules = this.state.modules.map((m, i) =>
			<Module
				key={i}
				index={i}
				formIndex={this.props.index}
				description={m.description}
				groups={m.groups}
				questions={this.props.questions}
				onChangeModule={this.props.onChangeModule}
				onChangeGroup={this.props.onChangeGroup}
				onSelectQuestion={this.props.onSelectQuestion}
				onCreateGroup={this.props.onCreateGroup}
				onAddQuestion={this.props.onAddQuestion}
				onDeleteModule={this.props.onDeleteModule}
				onDeleteGroup={this.props.onDeleteGroup}
				onRemoveQuestion={this.props.onRemoveQuestion}
			/>
		);

		return (
			<div className="survey">
				<div className="survey-header">
					<input
						className="titleStyle"
						type="text"
						name="description"
						value={this.state.description}
						onChange={this.handleInputChange}
					/>
				</div>
				<div className="survey-body">
					{modules}
				</div>
				<div className="survey-tail">
					<button
						type="button"
						onClick={() => this.props.onCreateModule(this.props.index)}>
						Novo módulo
					</button>
					<button type="button" onClick={() => this.props.onSaveForm(this.props.index)}>
						Salvar
					</button>
				</div>
			</div>
		);
	}
}

function Module(props) {
	function handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		props.onChangeModule(
			props.formIndex,
			props.index,
			name,
			value
		);
	}

	const groups = props.groups.map((g, i) =>
		<Group
			key={i}
			index={i}
			formIndex={props.formIndex}
			moduleIndex={props.index}
			description={g.description}
			comment={g.comment}
			questions={props.questions}
			questionIds={g.questions}
			onChangeGroup={props.onChangeGroup}
			onSelectQuestion={props.onSelectQuestion}
			onAddQuestion={props.onAddQuestion}
			onDeleteGroup={props.onDeleteGroup}
			onRemoveQuestion={props.onRemoveQuestion}
		/>
	);

	return (
		<div className="module">
			<div className="module-header" >
				<input
					type="text"
					name="description"
					value={props.description}
					onChange={handleInputChange}
				/>
			</div>
			<div className="module-body">
				{groups}
			</div>
			<div className="module-tail">
				<button
					type="button"
					onClick={() => props.onCreateGroup(props.formIndex, props.index)}>
					Novo grupo
				</button>
				<button
					type="button"
					onClick={() => props.onDeleteModule(props.formIndex, props.index)}
					disabled={props.index === 0}
				>
					Deletar módulo
				</button>
			</div>
		</div>
	);
}

function Group(props) {
	function handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		props.onChangeGroup(
			props.formIndex,
			props.moduleIndex,
			props.index,
			name,
			value
		);
	}

	const questions = props.questionIds.map((id, i) =>
		<Question
			key={i}
			index={i}
			formIndex={props.formIndex}
			moduleIndex={props.moduleIndex}
			groupIndex={props.index}
			questions={props.questions}
			questionId={id}
			onSelectQuestion={props.onSelectQuestion}
			onRemoveQuestion={props.onRemoveQuestion}
		/>
	);

	return (
		<div className="group">
			<div className="group-header" >
				<input
					type="text"
					name="description"
					value={props.description}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="comment"
					value={props.comment}
					onChange={handleInputChange}
				/>
			</div>
			<div className="group-body">
				{questions}
			</div>
			<div className="group-tail">
				<button
					type="button"
					onClick={() => props.onAddQuestion(props.formIndex, props.moduleIndex, props.index)}>
					Nova pergunta
				</button>
				<button
					type="button"
					onClick={() => props.onDeleteGroup(props.formIndex, props.moduleIndex, props.index)}
					disabled={props.index === 0}
				>
					Apagar grupo
				</button>
			</div>
		</div>
	);
}

function Question(props) {
	function handleInputChange(event) {
		const target = event.target;
		const value = target.value;

		props.onSelectQuestion(
			props.formIndex,
			props.moduleIndex,
			props.groupIndex,
			props.index,
			value,
		);

		console.log(`question: ${value}`);
	}

	const questions = props.questions.map((q, i) =>
		<option value={q.id} key={i}>
			{q.description}
		</option>
	);

	return (
		<div className="question">
			<div className="question-body">
				<select
					name="question"
					value={props.questionId}
					onChange={handleInputChange}
				>
					{questions}
				</select>
			</div>
			<div className="question-tail">
				<button
					type="button"
					onClick={() => props.onRemoveQuestion(props.formIndex, props.moduleIndex, props.groupIndex, props.index)}
					disabled={props.index === 0}
				>
					Apagar pergunta
				</button>
			</div>
		</div>
	);
}

export default Survey;
