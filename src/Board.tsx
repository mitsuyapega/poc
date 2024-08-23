import { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { Button, Card, defaultThemeProp, Flex, Input } from "@pega/cosmos-react-core";
import { StyledList, StyledSublistItem } from "@pega/cosmos-react-core/lib/components/List/List";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { addTask, updateTask, deleteTask } from './tasksSlice';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${defaultThemeProp.theme.base["font-family"]};
  }
`;

const StyledPage = styled.div`
  padding: 20px;
  width: 90%;
`;

const StyledTask = styled(StyledList)`
`;

const StyledTaskList = styled(StyledSublistItem)(() => {
  const {
    white,
    'gray': {
        'extra-light': extraLight,
    },
  } = defaultThemeProp.theme.base.colors;

  return css`
    padding: 10px;
    border-radius: 10px;
    background-color: ${white};
    box-shadow: 0 2px 10px ${extraLight};
    margin-bottom: 20px;
  `
});

const StyledCard = styled(Card)`
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px ${defaultThemeProp.theme.base.colors.gray.light};
  margin-bottom: 10px;
  background-color: ${defaultThemeProp.theme.base.colors.white};
`;

const TaskTitle = styled.span`
  font-weight: ${defaultThemeProp.theme.base["font-weight"].bold};
  font-size: 16px;
`;

const TaskDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const StyledTaskName = styled.span(props => {
  const {
    black,
    white,
    'gray': {'light': grayLight},
    'blue': {'light': blueLight},
    'green': {'medium': greenMedium},
    'purple': {'medium': purpleMedium},
  } = defaultThemeProp.theme.base.colors;
  let backgroundColor = grayLight;
  let fontColor = white;
  switch (props.status) {
    case 'Todo':
      fontColor = black;
      break;
    case 'In Progress':
      backgroundColor = blueLight;
      break;
    case 'Complete':
      backgroundColor = greenMedium;
      break;
    case 'Review':
      backgroundColor = purpleMedium;
      break;
    case 'Close':
      backgroundColor = greenMedium;
      break;
    case 'Open':
      fontColor = black;
      break;
  }
  return css`
    background-color: ${backgroundColor};
    color: ${fontColor};
  `;
});

const StatusTag = styled.span`
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: ${defaultThemeProp.theme.base.colors.gray.light};
  }
`;

const VerticalEllipsisButton = styled(Button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  padding: 0;
  
  span {
    width: 4px;
    height: 4px;
    background-color: ${defaultThemeProp.theme.base.colors.black};
    border-radius: 50%;
    margin: 2px 0;
  }
`;

const Board = () => {
  const dispatch = useDispatch();
  const statuses = useSelector((state: RootState) => state.tasks.statuses);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [movingTask, setMovingTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleMoveTask = (task) => {
    setMovingTask(task);
    setNewStatus(task.status);
  };

  const handleUpdateTask = (task) => {
    setEditingTask(task);
    setNewTitle(task.title);
  };

  const handleSaveTask = () => {
    if (movingTask) {
      const updatedTask = { ...movingTask, status: newStatus};
      dispatch(updateTask(updatedTask));
      setMovingTask(null);
      setNewStatus('');
    }
    if (editingTask) {
      const updatedTask = { ...editingTask, title: newTitle };
      dispatch(updateTask(updatedTask));
      setEditingTask(null);
      setNewTitle('');
    }
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleDropdownClick = (task) => {
    setSelectedTask(task);
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownSelect = (action) => {
    if (action === 'move') {
      handleMoveTask(selectedTask);
    } else if (action === 'update') {
      handleUpdateTask(selectedTask);
    } else if (action === 'delete') {
      handleDeleteTask(selectedTask.id);
    }
    setDropdownVisible(false);
  };

  return (
    <>
      <GlobalStyle />
      <StyledPage>
        {movingTask && (
          <div>
            <Input type="text" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
            <Button onClick={handleSaveTask}>Save</Button>
          </div>
        )}
        {editingTask && (
          <div>
            <Input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <Button onClick={handleSaveTask}>Save</Button>
          </div>
        )}
        <Flex as={StyledTask} container={{ direction: 'row' }}>
          {statuses.map((status, statusIndex) => (
            <Flex as={StyledTaskList} container={{ direction: 'column' }} key={statusIndex}>
              <StyledTaskName status={status.title}>{status.title}</StyledTaskName>
              {tasks.filter(task => status.title === task.status).map((task, index) => {
                return (
                    <Card as={StyledCard} key={`${statusIndex}-${index}`}>
                      <TaskTitle>{task.title}</TaskTitle>
                      <TaskDetails>
                        <span>{task.assignedTo}</span>
                        <StatusTag>{task.status}</StatusTag>
                        <VerticalEllipsisButton onClick={() => handleDropdownClick(task)}>
                          <span></span>
                          <span></span>
                          <span></span>
                        </VerticalEllipsisButton>
                        {dropdownVisible && selectedTask === task && (
                          <div>
                            <DropdownItem onClick={() => handleDropdownSelect('move')}>Move</DropdownItem>
                            <DropdownItem onClick={() => handleDropdownSelect('update')}>Update</DropdownItem>
                            <DropdownItem onClick={() => handleDropdownSelect('delete')}>Delete</DropdownItem>
                          </div>
                        )}
                      </TaskDetails>
                    </Card>
                );
              })}
            </Flex>
          ))}
        </Flex>
      </StyledPage>
    </>
  );
};

export default Board;