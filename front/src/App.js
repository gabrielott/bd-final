import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Survey from "./Forms.js";
import QuestionEditor from "./Questions.js";
import "./react-tabs.css";
import "./App.css";

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

	const group = {
		description: "Um grupo",
		comment: "Comentando sobre o grupo",
		questions: [0, 1, 2, 3, 4],
	};

	const module = {
		description: "Um módulo",
		groups: [group],
	};

	return (
		<Tabs className="tabs">
			<TabList className="tablist">
				<Tab>Formulários</Tab>
				<Tab>Questões</Tab>
				<Tab>Listas</Tab>
			</TabList>

			<TabPanel>
				<Survey
					description="Title"
					modules={[module]}
					questions={questions}
				/>
			</TabPanel>
			<TabPanel>
				<QuestionEditor
					questions={questions}
					types={types}
					list_types={list_types}
				/>
			</TabPanel>
			<TabPanel>
				<h1>Listas</h1>
			</TabPanel>
		</Tabs>
	);
}

export default App;
