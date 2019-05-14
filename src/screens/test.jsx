import React, { Component } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { getNotes } from "../services/noteServices";
import { Card } from "@material-ui/core";

const SortableItem = SortableElement(({ value }) => (
  <div style={{ cursor: "move", width: "150px", margin: "2%" }}>
    <Card style={{ backgroundColor: value.color }}>
      <div>{value.title}</div>
      <div>{value.description}</div>
    </Card>
  </div>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

export default class SortableComponent extends Component {
  state = {
    notes: []
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ notes }) => ({
      notes: arrayMove(notes, oldIndex, newIndex)
    }));
    console.log("OLD INDEX", oldIndex);
    console.log("NEW INDEX", newIndex);
  };
  componentDidMount() {
    getNotes()
      .then(result => {
        this.setState({
          notes: result.data.data
        });
        console.log("getNotes result from back-end", result);
      })
      .catch(error => {
        alert(error);
      });
  }
  render() {
    return (
      <SortableList
        items={this.state.notes}
        axis="xy"
        onSortEnd={this.onSortEnd}
      />
    );
  }
}
