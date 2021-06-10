import React from "react";
import Popup from "reactjs-popup";
import './App.css';
import "reactjs-popup/dist/index.css";

const modules = {
	id: "1",
	description: "Descrição módulo",
	groups: [
		{
			id: "1",
			description: "Descrição grupo",
			comment: "Comentário grupo",
			questions: [
				{
					id: "1",
					description: "Descrição pergunta",
					type: {
						id: "1",
						description: "Tipo de pergunta",
					},
					list_type: {
						id: "1",
						description: "Tipo de lista",
					},
				},
				{
					id: "2",
					description: "Descrição pergunta 2",
					type_id: "1",
				},
			],
		},
	],
};

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

	handleQuestionChange(moduleIndex, groupIndex, questionIndex, name, value) {
		console.log(`module=${moduleIndex} group=${groupIndex} question=${questionIndex}`)
		console.log(`name=${name} value=${value}`);

		const modules = this.state.modules.slice();
		const question = modules[moduleIndex].groups[groupIndex].questions[questionIndex];

		question[name] = value;
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

		questions.push({
			description: "Nova pergunta",
			type: 1,
			list_type: 1,
		});
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
				types={this.props.types}
				list_types={this.props.list_types}
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
					<button type="button" onClick={this.handleSave}>
						Salvar
					</button>
				</div>
				<div className="survey-tail">
					<button
						type="button"
						onClick={this.handleCreateModule}>
						Novo módulo
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
			questions={g.questions}
			types={props.types}
			list_types={props.list_types}
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

	const questions = props.questions.map((q, i) =>
		<Question
			key={i}
			index={i}
			moduleIndex={props.moduleIndex}
			groupIndex={props.index}
			description={q.description}
			type={q.type}
			list_type={q.list_type}
			types={props.types}
			list_types={props.list_types}
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
		const name = target.name;

		props.onQuestionChange(
			props.moduleIndex,
			props.groupIndex,
			props.index,
			name,
			value
		);
	}

	const type_options = props.types.map((t) =>
		<option value={t.id} key={t.id}>
			{t.description}
		</option>
	);

	const list_type_options = props.list_types.map((t) =>
		<option value={t.id} key={t.id}>
			{t.description}
		</option>
	);

	return (
		<div className="question">
			<div className="question-header" >
				<input
					type="text"
					name="description"
					value={props.description}
					onChange={handleInputChange}
				/>
			</div>
			<div className="question-body">
				<select
					name="type"
					onChange={handleInputChange}
				>
					{type_options}
				</select>
				<select
					name="list_type"
					onChange={handleInputChange}
				>
					{list_type_options}
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

function App(props) {
	const types = [
		{
			id: "1",
			description: "tipo 1",
		},
		{
			id: "2",
			description: "tipo 2",
		},
		{
			id: "3",
			description: "tipo 3",
		},
	];

	const list_types = [
		{
			id: "1",
			description: "lista tipo 1",
		},
		{
			id: "2",
			description: "lista tipo 2",
		},
		{
			id: "3",
			description: "lista tipo 3",
		},
	];

	const question = {
		description: "Uma pergunta",
		type: 1,
		list_type: 1,
	}

	const group = {
		description: "Um grupo",
		comment: "Comentando sobre o grupo",
		questions: [question],
	}

	const module = {
		description: "Um módulo",
		groups: [group],
	}

	return (
		<div className="survey">
			<Survey
				description="Title"
				modules={[module]}
				types={types}
				list_types={list_types}
			/>
		</div>
	);
}

export default App;
