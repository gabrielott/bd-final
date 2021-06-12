import React from "react";
import "./Lists.css";

class ListEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: 0,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleCreateList = this.handleCreateList.bind(this);
		this.handleDeleteList = this.handleDeleteList.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.props.onChangeList(this.state.selected, name, value);
	}

	handleSelect(index) {
		this.setState({selected: index});
	}

	handleCreateList() {
		this.props.onCreateList(this.state.selected);
		this.setState((state, props) => ({
			selected: props.lists.length - 1,
		}));
	}

	handleDeleteList() {
		this.props.onDeleteList(this.state.selected);
		this.setState((state, props) => ({
			selected: Math.max(0, state.selected - 1),
		}));
	}

	render() {
		const lists = this.props.lists.map((l, i) =>
			<li
				key={i}
				className={this.state.selected === i ? "leditor-list-selected" : "leditor-list"}
				onClick={() => this.handleSelect(i)}
			>
				{l.description}
			</li>
		);

		return (
			<div className="qeditor">
				<div className="qeditor-left">
					<div className="qeditor-left-bar">
						<button onClick={this.handleCreateList}>
							Nova lista
						</button>
						<button
							onClick={this.handleDeleteList}
							disabled={this.props.lists.length === 0}
						>
							Apagar selecionada
						</button>
					</div>
					<ul>
						{lists}
					</ul>
				</div>
				{this.props.lists.length > 0 &&
				<div className="leditor-right">
					<h1>lol</h1>
				</div>
				}
			</div>
		);
	}
}

export default ListEditor;
