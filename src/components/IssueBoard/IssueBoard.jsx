import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { moveIssue } from '../../features/issuesSlice';

import './IssueBoard.scss';

function IssueBoard() {
  const { todo, inProgress, done } = useSelector(state => state.issues);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return; // Exit if dropped outside a droppable area

    dispatch(moveIssue({
      from: source.droppableId,
      to: destination.droppableId,
      fromIndex: source.index,
      toIndex: destination.index
    }));
  };

  if (!todo || !inProgress || !done) {
    return <div>Loading issues...</div>;
  }

  const columns = { todo, inProgress, done };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="issueBoard">
        {Object.keys(columns).map((key) => (
          <Droppable key={key} droppableId={key}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`column ${snapshot.isDraggingOver ? 'draggingOver' : ''}`}
              >
                <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                {columns[key].map((issue, index) => (
                  <Draggable key={issue.id} draggableId={`issue-${issue.id}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`issue ${snapshot.isDragging ? 'dragging' : ''}`}
                      >
                        {issue.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

export default IssueBoard;