import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Survey from "./Forms.js";
import QuestionEditor from "./Questions.js";
import "./react-tabs.css";
import "./App.css";

class App extends React.Component {
	constructor(props) {
		super(props);

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

		const group = {
			description: "Um grupo",
			comment: "Comentando sobre o grupo",
			questions: [0, 1, 2, 3, 4],
		};

		const module = {
			description: "Um módulo",
			groups: [group],
		};

		const form = {
			description: "Um formulário",
			modules: [module],
		};

		const questions = [
			{
				id: 0,
				description: "Uma pergunta",
				type: 0,
				list_type: 0,
			},
			{
				id: 1,
				description: "Outra pergunta",
				type: 1,
				list_type: 1,
			},
			{
				id: 2,
				description: "Mais uma pergunta",
				type: 2,
				list_type: 2,
			},
			{
				id: 3,
				description: "Quem diria? É outra pergunta",
				type: 2,
				list_type: 2,
			},
			{
				id: 4,
				description: "Outra",
				type: 0,
				list_type: 0,
			},
		];

		this.state = {
			questions: questions,
			forms: [form],
			types: types,
			list_types: list_types,
			tempid: 0,
		};

		this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
		this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
		this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);

		this.handleChangeForm = this.handleChangeForm.bind(this);
		this.handleChangeModule = this.handleChangeModule.bind(this);
		this.handleChangeGroup = this.handleChangeGroup.bind(this);
		this.handleSelectQuestion = this.handleSelectQuestion.bind(this);
		this.handleCreateModule = this.handleCreateModule.bind(this);
		this.handleCreateGroup = this.handleCreateGroup.bind(this);
		this.handleAddQuestion = this.handleAddQuestion.bind(this);
		this.handleDeleteModule = this.handleDeleteModule.bind(this);
		this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
		this.handleRemoveQuestion = this.handleRemoveQuestion.bind(this);
		this.handleSaveForm = this.handleSaveForm.bind(this);
	}

	// Chamadas pela aba de questões

	handleChangeQuestion(index, name, value) {
		const questions = this.state.questions.slice();
		questions[index][name] = value;
		this.setState({questions: questions});
	}

	handleCreateQuestion() {
		// TODO: ID único sincronizado com back

		const questions = this.state.questions.slice();
		questions.push({
			id: `new-${this.state.tempid}`,
			description: "Nova pergunta",
			type: 0,
			list_type: 0,
		});

		this.setState((state, props) => ({
			questions: questions,
			tempid: state.tempid + 1,
		}));
	}

	handleDeleteQuestion(index) {
		const questions = this.state.questions.slice();
		questions.splice(index, 1);
		this.setState({questions: questions});
	}

	// Chamadas pela aba de formulários
	
	handleChangeForm(formIndex, name, value) {
		const forms = this.state.forms.slice();
		const form = forms[formIndex];

		form[name] = value;
		this.setState({forms: forms});
	}

	handleChangeModule(formIndex, moduleIndex, name, value) {
		console.log(`module=${moduleIndex}`)
		console.log(`name=${name} value=${value}`);

		const forms = this.state.forms.slice();
		const module = forms[formIndex].modules[moduleIndex];

		module[name] = value;
		this.setState({forms: forms});
	}

	handleChangeGroup(formIndex, moduleIndex, groupIndex, name, value) {
		console.log(`module=${moduleIndex} group=${groupIndex}`)
		console.log(`name=${name} value=${value}`);

		const forms = this.state.forms.slice();
		const group = forms[formIndex].modules[moduleIndex].groups[groupIndex];

		group[name] = value;
		this.setState({forms: forms});

	}

	handleSelectQuestion(formIndex, moduleIndex, groupIndex, questionIndex, newId) {
		const forms = this.state.forms.slice();
		const questions = forms[formIndex].modules[moduleIndex].groups[groupIndex].questions;
		questions[questionIndex] = newId;

		this.setState({forms: forms});
	}

	handleCreateModule(formIndex) {
		const forms = this.state.forms.slice();
		const modules = forms[formIndex].modules;

		modules.push({
			description: "Novo módulo",
			groups: [],
		});
		this.setState({forms: forms});
	}

	handleCreateGroup(formIndex, moduleIndex) {
		const forms = this.state.forms.slice();
		const groups = forms[formIndex].modules[moduleIndex].groups;

		groups.push({
			description: "Novo grupo",
			comment: "Novo comentário",
			questions: [],
		});
		this.setState({forms: forms});
	}

	handleAddQuestion(formIndex, moduleIndex, groupIndex) {
		const forms = this.state.forms.slice();
		const questions = forms[formIndex].modules[moduleIndex].groups[groupIndex].questions;

		questions.push(-1);
		this.setState({forms: forms});
	}

	handleDeleteModule(formIndex, moduleIndex) {
		const forms = this.state.forms.slice();
		const modules = forms[formIndex].modules;
		modules.splice(moduleIndex, 1);
		this.setState({forms: forms});
	}

	handleDeleteGroup(formIndex, moduleIndex, groupIndex) {
		const forms = this.state.forms.slice();
		const groups = forms[formIndex].modules[moduleIndex].groups;
		groups.splice(groupIndex, 1);
		this.setState({forms: forms});
	}

	handleRemoveQuestion(formIndex, moduleIndex, groupIndex, questionIndex) {
		const forms = this.state.forms.slice();
		const group = forms[formIndex].modules[moduleIndex].groups[groupIndex]
		group.questions.splice(questionIndex, 1);
		this.setState({forms: forms});
	}

	handleSaveForm(formIndex) {
		console.log(`save form ${formIndex}`);
	}

	render() {
		return (
			<Tabs className="tabs">
				<TabList className="tablist">
					<Tab>Formulários</Tab>
					<Tab>Questões</Tab>
					<Tab>Listas</Tab>
				</TabList>

				<TabPanel>
					<Survey
						index={0}
						description={this.state.forms[0].description}
						modules={this.state.forms[0].modules}
						questions={this.state.questions}
						onChangeForm={this.handleChangeForm}
						onChangeModule={this.handleChangeModule}
						onChangeGroup={this.handleChangeGroup}
						onSelectQuestion={this.handleSelectQuestion}
						onCreateModule={this.handleCreateModule}
						onCreateGroup={this.handleCreateGroup}
						onAddQuestion={this.handleAddQuestion}
						onDeleteModule={this.handleDeleteModule}
						onDeleteGroup={this.handleDeleteGroup}
						onRemoveQuestion={this.handleRemoveQuestion}
						onSaveForm={this.handleSaveForm}
					/>
				</TabPanel>

				<TabPanel>
					<QuestionEditor
						questions={this.state.questions}
						types={this.state.types}
						list_types={this.state.list_types}
						onChangeQuestion={this.handleChangeQuestion}
						onCreateQuestion={this.handleCreateQuestion}
						onDeleteQuestion={this.handleDeleteQuestion}
					/>
				</TabPanel>

				<TabPanel>
					<h1>Listas</h1>
				</TabPanel>
			</Tabs>
		);

	}
}

export default App;
