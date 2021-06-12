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
		this.handleSave = this.handleSave.bind(this);
		this.handleModuleChange = this.handleModuleChange.bind(this);
		this.handleGroupChange = this.handleGroupChange.bind(this);
		this.handleQuestionChange = this.handleQuestionChange.bind(this);
		this.handleCreateModule = this.handleCreateModule.bind(this);
		this.handleCreateGroup = this.handleCreateGroup.bind(this);
		this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
		this.handleDeleteModule = this.handleDeleteModule.bind(this);
		this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
		this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
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

	handleSave() {
		console.log("survey: save");
	}

	handleModuleChange(moduleIndex, name, value) {
		console.log(`module=${moduleIndex}`)
		console.log(`name=${name} value=${value}`);

		const modules = this.state.modules.slice();
		const module = modules[moduleIndex];

		module[name] = value;
		this.setState({modules: modules});
	}

	handleGroupChange(moduleIndex, groupIndex, name, value) {
		console.log(`module=${moduleIndex} group=${groupIndex}`)
		console.log(`name=${name} value=${value}`);

		const modules = this.state.modules.slice();
		const group = modules[moduleIndex].groups[groupIndex];

		group[name] = value;
		this.setState({modules: modules});

	}

	handleQuestionChange(moduleIndex, groupIndex, questionIndex, newIndex) {
		const modules = this.state.modules.slice();
		const questions = modules[moduleIndex].groups[groupIndex].questions;
		questions[questionIndex] = newIndex;

		this.setState({modules: modules});
	}

	handleCreateModule() {
		const modules = this.state.modules.slice();

		modules.push({
			description: "Novo módulo",
			groups: [],
		});
		this.setState({modules: modules});
	}

	handleCreateGroup(moduleIndex) {
		const modules = this.state.modules.slice();
		const groups = modules[moduleIndex].groups;

		groups.push({
			description: "Novo grupo",
			comment: "Novo comentário",
			questions: [],
		});
		this.setState({modules: modules});
	}

	handleCreateQuestion(moduleIndex, groupIndex) {
		const modules = this.state.modules.slice();
		const questions = modules[moduleIndex].groups[groupIndex].questions;

		questions.push(-1);
		this.setState({modules: modules});
	}

	handleDeleteModule(moduleIndex) {
		const modules = this.state.modules.slice();
		modules.splice(moduleIndex, 1);
		this.setState({modules: modules});
	}

	handleDeleteGroup(moduleIndex, groupIndex) {
		const modules = this.state.modules.slice();
		modules[moduleIndex].groups.splice(groupIndex, 1);
		this.setState({modules: modules});
	}

	handleDeleteQuestion(moduleIndex, groupIndex, questionIndex) {
		const modules = this.state.modules.slice();
		modules[moduleIndex].groups[groupIndex].questions.splice(questionIndex, 1);
		this.setState({modules: modules});
	}

	render() {
		const modules = this.state.modules.map((m, i) =>
			<Module
				key={i}
				index={i}
				description={m.description}
				groups={m.groups}
				questions={this.props.questions}
				onModuleChange={this.handleModuleChange}
				onGroupChange={this.handleGroupChange}
				onQuestionChange={this.handleQuestionChange}
				onCreateGroup={this.handleCreateGroup}
				onCreateQuestion={this.handleCreateQuestion}
				onDeleteModule={this.handleDeleteModule}
				onDeleteGroup={this.handleDeleteGroup}
				onDeleteQuestion={this.handleDeleteQuestion}
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
						onClick={this.handleCreateModule}>
						Novo módulo
					</button>
					<button type="button" onClick={this.handleSave}>
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

		props.onModuleChange(
			props.index,
			name,
			value
		);
	}

	const groups = props.groups.map((g, i) =>
		<Group
			key={i}
			index={i}
			moduleIndex={props.index}
			description={g.description}
			comment={g.comment}
			questions={props.questions}
			questionsId={g.questions}
			onGroupChange={props.onGroupChange}
			onQuestionChange={props.onQuestionChange}
			onCreateQuestion={props.onCreateQuestion}
			onDeleteGroup={props.onDeleteGroup}
			onDeleteQuestion={props.onDeleteQuestion}
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
					onClick={() => props.onCreateGroup(props.index)}>
					Novo grupo
				</button>
				<button
					type="button"
					onClick={() => props.onDeleteModule(props.index)}
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

		props.onGroupChange(
			props.moduleIndex,
			props.index,
			name,
			value
		);
	}

	const questions = props.questionsId.map((id, i) =>
		<Question
			key={i}
			index={i}
			moduleIndex={props.moduleIndex}
			groupIndex={props.index}
			questions={props.questions}
			questionId={id}
			onQuestionChange={props.onQuestionChange}
			onDeleteQuestion={props.onDeleteQuestion}
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
					onClick={() => props.onCreateQuestion(props.moduleIndex, props.index)}>
					Nova pergunta
				</button>
				<button
					type="button"
					onClick={() => props.onDeleteGroup(props.moduleIndex, props.index)}
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

		props.onQuestionChange(
			props.moduleIndex,
			props.groupIndex,
			props.index,
			value,
		);
	}

	const questions = props.questions.map((q, i) =>
		<option value={i} key={i}>
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
					onClick={() => props.onDeleteQuestion(props.moduleIndex, props.groupIndex, props.index)}
					disabled={props.index === 0}
				>
					Apagar pergunta
				</button>
			</div>
		</div>
	);
}

export default Survey;
