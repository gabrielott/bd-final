import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Survey from "./Questionnaires.js";
import QuestionEditor from "./Questions.js";
import ListEditor from "./Lists.js";
import api from "./services/api";
import "./react-tabs.css";
import "./App.css";

class App extends React.Component {
	async getQuest(id) {
		const response = await api.get(`showQuestionnaire/${id}`);
		const modules = response.data.modules;
		const module_questions = response.data.groups;
		this.setState({
			questSelected: response.data.questionnaire,
			questionsSelected: response.data.questions,
			modules: modules,
			module_questions: module_questions,
		});
	}

	componentWillMount = async() => {
		if(!this.state.loading) return;
		const allQuests = await api.get('listQuestionnaires');
		const questionnaires = allQuests.data;

		const response = await api.get('showQuestionnaire/1')
		const modules = response.data.modules;

		// question_groups_forms no back
		const module_questions = response.data.groups;

		const allQuestions = await api.get('listQuestions');
		const questions = allQuestions.data;

		const allLists = await api.get('listListType');
		const lists = allLists.data;

		const allTypes = await api.get('listQuestionType');
		const types = allTypes.data;

		this.setState({
			quests: questionnaires,
			modules: modules,
			module_questions: module_questions,
			questions: questions,
			lists: lists,
			types: types,
			loading: false,
			questSelected: questionnaires[0],
			questionsSelected: response.data.questions,
		});
	}

	constructor(props) {
		super(props);

		this.state = {
			quests: [],
			modules: [],
			module_questions: [],
			questions: [],
			lists: [],
			types: [],
			tempid: 0,
			loading: true
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
		this.handleSelectQuest = this.handleSelectQuest.bind(this);
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

	handleSelectQuest(event) {
		const target = event.target;
		const value = target.value;

		this.getQuest(value);
	}

	async handleSaveQuest(questIndex) {
		console.log(this.state);
		const questionnaire = this.state.quests[questIndex]
		const modules = this.state.modules.filter((m) => m.questionnaire_id === questionnaire.id);
		const module_questions = this.state.module_questions.filter((mq) => modules.some((m) => m.id === mq.crf_form_id));
		const request = {
			questionnaire: questionnaire,
			modules: this.state.modules,
			module_questions: this.state.module_questions,
		}
		console.log(request);
		const response = await api.put('updateQuestionnaire/' + questionnaire.id, request);
		alert("Salvo com sucesso!");
	}

	render() {
		const quests = this.state.quests.map((q, i) => (
			<option key={i} value={q.id}>
				{q.description}
			</option>
		));

		return (
			<div>
			{this.state.loading &&
				<h1 style={{color: "white"}}>Carregando...</h1> 
			}
			{ !this.state.loading &&
			<Tabs className="tabs">
				<TabList className="tablist">
					<Tab>Questionários</Tab>
					<Tab>Questões</Tab>
					<Tab>Listas</Tab>
				</TabList>

				<TabPanel>
					<select
						value={this.state.questSelected.id}
						onChange={this.handleSelectQuest}
					>
						{quests}
					</select>
					<Survey
						index={this.state.questSelected}
						description={this.state.questSelected.description}
						modules={this.state.modules}
						moduleQuestions={this.state.module_questions}
						questions={this.state.questions}
						questionsSelected={this.state.questionsSelected}
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
			}
			</div>
		);

	}
}

export default App;
