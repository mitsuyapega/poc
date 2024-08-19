import { useRef } from 'react';
import styled, {createGlobalStyle, css} from 'styled-components';
import {Card, defaultThemeProp, Flex, useConsolidatedRef} from "@pega/cosmos-react-core";
import { StyledList, StyledSublistItem } from "@pega/cosmos-react-core/lib/components/List/List";
import ForwardedCardContent from './ForwardedCardContent';
import useDraggableWrapper from './useDraggableWrapper';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
    font-family: ${defaultThemeProp.theme.base["font-family"]};
  }
`;

const StyledPage = styled.div`
  padding: 20px;
  width: 90%;
`;
const StyledTask = styled(StyledList)`
  border: 2px solid ${defaultThemeProp.theme.base.colors.black};
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

const Board = () => {
  const taskList = [
    { name: "Open", subtitle: "" },
    { name: "Todo", subtitle: "" },
    { name: "In Progress", subtitle: "" },
    { name: "Review", subtitle: "" },
    { name: "Complete", subtitle: "" },
    { name: "Close", subtitle: "" },
  ];

  const data = [
    { title: "Fill the board", assignedTo: "PersonA", status: "Todo" },
    { title: "Implement", assignedTo: "PersonB", status: "Open" },
    { title: "Issue", assignedTo: "PersonB", status: "Open" },
    { title: "Reply to devops mail", assignedTo: "PersonB", status: "Open" },
    { title: "Send email to contribute for tables", assignedTo: "PersonC", status: "In Progress" },
    { title: "Error section", assignedTo: "PersonC", status: "In Progress" },
    { title: "Report tile issue", assignedTo: "PersonC", status: "Complete" },
    { title: "Weeding", assignedTo: "PersonD", status: "Complete" },
    { title: "Check cows behavior", assignedTo: "PersonD", status: "Close" },
  ];

  return (
    <>
      <GlobalStyle />
      <StyledPage>
        <Flex as={StyledTask} container={{ direction: 'row' }}>
          {taskList.map((task, taskIndex) => (
            <Flex as={StyledTaskList} container={{ direction: 'column' }} key={taskIndex}>
              <StyledTaskName status={task.name}>{task.name}</StyledTaskName>
              {data.filter(element => task.name === element.status).map((element, index) => {
                const cardContentRef = useRef<HTMLDivElement>();
                const cardContentContainerRef = useConsolidatedRef(cardContentRef);
                const cardContentDragRef = useRef<HTMLDivElement>();
                useDraggableWrapper(cardContentContainerRef, cardContentDragRef, true);

                return (
                  <Card as={StyledCard} key={`${taskIndex}-${index}`}>
                    <ForwardedCardContent ref={cardContentContainerRef}>
                      <div ref={cardContentDragRef}>
                        <TaskTitle>{element.title}</TaskTitle>
                        <TaskDetails>
                          <StatusTag>{element.status}</StatusTag>
                        </TaskDetails>
                        <TaskDetails>
                          <span>{element.assignedTo}</span>
                        </TaskDetails>
                      </div>
                    </ForwardedCardContent>
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