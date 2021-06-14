import React from "react";
import "./Questionnaires.css"

function Survey(props) {
	function handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		props.onChangeQuest(props.index, name, value);
	}

	const modules = props.modules.map((m, i) =>
		<Module
			key={i}
			index={i}
			moduleId={m.id}
			modulesLength={props.modules.length}
			description={m.description}
			moduleQuestions={props.moduleQuestions}
			questions={props.questions}
			questionsSelected={props.questionsSelected}
			onChangeModule={props.onChangeModule}
			onSelectQuestion={props.onSelectQuestion}
			onAddQuestion={props.onAddQuestion}
			onDeleteModule={props.onDeleteModule}
			onRemoveQuestion={props.onRemoveQuestion}
		/>
	);

	return (
		<div className="survey">
			<div className="survey-header">
				<input
					className="titleStyle"
					type="text"
					name="description"
					value={props.description}
					onChange={handleInputChange}
				/>
			</div>
			<div className="survey-body">
				{modules}
			</div>
			<div className="survey-tail">
				<button
					type="button"
					onClick={() => props.onCreateModule(props.index)}>
					Novo módulo
				</button>
				<button type="button" onClick={() => props.onSaveQuest(props.index)}>
					Salvar
				</button>
			</div>
		</div>
	);
}

function Module(props) {
	function handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		props.onChangeModule(
			props.index,
			name,
			value
		);
	}

	const questions = props.moduleQuestions.map((q, i) => (
		<Question
			key={i}
			index={i}
			moduleId={props.moduleId}
			questions={props.questions}
			questionId={q.question_id}
			onSelectQuestion={props.onSelectQuestion}
			onRemoveQuestion={props.onRemoveQuestion}
		/>
	));

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
				{questions}
			</div>
			<div className="module-tail">
				<button
					type="button"
					onClick={() => props.onAddQuestion(props.moduleId)}
				>
					Nova pergunta
				</button>
				<button
					type="button"
					onClick={() => props.onDeleteModule(props.moduleId)}
					disabled={props.modulesLength === 1}
				>
					Deletar módulo
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
			props.index,
			value,
		);
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
					onClick={() => props.onRemoveQuestion(props.index)}
					disabled={props.index === 0}
				>
					Apagar pergunta
				</button>
			</div>
		</div>
	);
}

export default Survey;
