import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Survey from "./Questionnaires.js";
import QuestionEditor from "./Questions.js";
import ListEditor from "./Lists.js";
import "./react-tabs.css";
import "./App.css";

class App extends React.Component {
	constructor(props) {
		super(props);

		const questionnaires = [
			{
				id: 1,
				description: "Um questionário",
			},
		];

		const modules = [
			{
				id: 1,
				questionnaire_id: 1,
				description: "Um módulo",
			},
		];

		// question_groups_forms no back
		const module_questions = [
			{
				id: 1,
				// id do módulo
				crf_form_id: 1,
				question_id: 1,
				question_order: 1,
			},
		];

		const questions = [
			{
				id: 1,
				description: "Uma pergunta",
				question_type_id: 1,
				list_type_id: null,
				question_type: {
					id: 1,
					description: "Um tipo",
				},
			},
			{
				id: 2,
				description: "Outra pergunta",
				question_type_id: 1,
				list_type_id: null,
				question_type: {
					id: 2,
					description: "Dois tipo",
				},
			},
			{
				id: 3,
				description: "Mais uma pergunta",
				question_type_id: 1,
				list_type_id: null,
				question_type: {
					id: 3,
					description: "Três tipo",
				},
			},
		];

		const lists = [
			{
				id: 1,
				description: "Um list type",
				list_of_values: [
					{
						id: 1,
						description: "Uma opção",
					},
				],
			},
		];

		const types = [
			{
				id: 1,
				description: "Um tipo",
			},
			{
				id: 2,
				description: "dois tipo",
			},
			{
				id: 3,
				description: "Três tipo",
			},
		];

		this.state = {
			quests: questionnaires,
			modules: modules,
			module_questions: module_questions,
			questions: questions,
			lists: lists,
			types: types,
			tempid: 0,
		};

		this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
		this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
		this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);

		this.handleChangeQuest = this.handleChangeQuest.bind(this);
		this.handleChangeModule = this.handleChangeModule.bind(this);
		this.handleSelectQuestion = this.handleSelectQuestion.bind(this);
		this.handleCreateModule = this.handleCreateModule.bind(this);
		this.handleAddQuestion = this.handleAddQuestion.bind(this);
		this.handleDeleteModule = this.handleDeleteModule.bind(this);
		this.handleRemoveQuestion = this.handleRemoveQuestion.bind(this);
		this.handleSaveQuest = this.handleSaveQuest.bind(this);
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

	// Chamadas pela aba de listas

	handleChangeList() {

	}
	
	handleCreateList() {

	}

	handleDeleteList() {

	}

	// Chamadas pela aba de formulários
	
	handleChangeQuest(questIndex, name, value) {
		const quests = this.state.quests.slice();
		const quest = quests[questIndex];

		quest[name] = value;
		this.setState({quests: quests});
	}

	handleChangeModule(moduleIndex, name, value) {
		const modules = this.state.modules.slice();
		const module = modules[moduleIndex];
		module[name] = value;
		this.setState({modules: modules});
	}

	handleSelectQuestion(moduleQuestionIndex, questionId) {
		const module_questions = this.state.module_questions.slice();
		module_questions[moduleQuestionIndex].question_id = questionId;
		this.setState({module_questions: module_questions});
	}

	handleCreateModule(questIndex) {
		const modules = this.state.modules.slice();
		modules.push({
			id: "new",
			questionnaire_id: questIndex,
			description: "Novo módulo",
		});
		this.setState({modules: modules});
	}

	handleAddQuestion(moduleId) {
		// TODO: Id padrão
		
		console.log(`module=${moduleId}`);

		const module_questions = this.state.module_questions.slice();
		module_questions.push({
			id: "new",
			crf_form_id: moduleId,
			question_id: 1,
			question_order: "new",
		});

		this.setState({module_questions: module_questions});
	}

	handleDeleteModule(moduleIndex) {
		const modules = this.state.modules.slice();
		modules.splice(moduleIndex, 1);
		this.setState({modules: modules});
	}

	handleRemoveQuestion(moduleQuestionIndex) {
		const module_questions = this.state.module_questions.slice();
		module_questions.splice(moduleQuestionIndex, 1);
		this.setState({module_questions: module_questions});
	}

	handleSaveQuest(questIndex) {
		console.log(`save form ${questIndex}`);
	}

	render() {
		return (
			<Tabs className="tabs">
				<TabList className="tablist">
					<Tab>Questionários</Tab>
					<Tab>Questões</Tab>
					<Tab>Listas</Tab>
				</TabList>

				<TabPanel>
					<Survey
						index={0}
						description={this.state.quests[0].description}
						modules={this.state.modules}
						moduleQuestions={this.state.module_questions}
						questions={this.state.questions}
						onChangeQuest={this.handleChangeQuest}
						onChangeModule={this.handleChangeModule}
						onSelectQuestion={this.handleSelectQuestion}
						onCreateModule={this.handleCreateModule}
						onAddQuestion={this.handleAddQuestion}
						onDeleteModule={this.handleDeleteModule}
						onRemoveQuestion={this.handleRemoveQuestion}
						onSaveQuest={this.handleSaveQuest}
					/>
				</TabPanel>

				<TabPanel>
					<QuestionEditor
						questions={this.state.questions}
						lists={this.state.lists}
						types={this.state.types}
						onChangeQuestion={this.handleChangeQuestion}
						onCreateQuestion={this.handleCreateQuestion}
						onDeleteQuestion={this.handleDeleteQuestion}
					/>
				</TabPanel>

				<TabPanel>
					<ListEditor
						lists={this.state.lists}
					/>
				</TabPanel>
			</Tabs>
		);

	}
}

export default App;
