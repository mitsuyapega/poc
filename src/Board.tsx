import { useRef } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {Card, CardContent, Flex, useConsolidatedRef, useDraggable} from "@pega/cosmos-react-core";
import {StyledList, StyledSublistItem} from "@pega/cosmos-react-core/lib/components/List/List";


const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const StyledPage = styled.div`
  height: 90%;
  width: 90%;
`;

const StyledTask = styled(StyledList)`
  border: 2px solid black;
`

const StyledTaskList = styled(StyledSublistItem)`
  border: 1px solid blue;
`

const StyledCard = styled.div`
  border: 1px solid gray;
`

interface item {
  id: number;
  name: string;
}

const Board = () => {
  const items = Array.from({length: 4}, (_, i) => {
    const id = `${i}`;
    return {
      id: `${id}`,
      name: `tile${id}`,
    }
  });
  const tileContainerRef = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const containerRef1 = useConsolidatedRef(ref1);
  const dragRef1 = useRef<HTMLDivElement>(null);
  useDraggable(containerRef1, dragRef1, true)
  const ref2 = useRef<HTMLDivElement>(null);
  const containerRef2 = useConsolidatedRef(ref2);
  const dragRef2 = useRef<HTMLDivElement>(null);
  useDraggable(containerRef2, dragRef2, true)
  const ref3 = useRef<HTMLDivElement>(null);
  const containerRef3 = useConsolidatedRef(ref3);
  const dragRef3 = useRef<HTMLDivElement>(null);
  useDraggable(containerRef3, dragRef3, true)

  const tasklist = [
    {name: "Open", subtitle: ""},
    {name: "Todo", subtitle: ""},
    {name: "In Progress", subtitle: ""},
    {name: "Review", subtitle: ""},
    {name: "Complete", subtitle: ""},
    {name: "Close", subtitle: ""},
  ]
  const data = [
    {title: "Fill the board", assignedTo: "PersonA", status: "Todo"},
    {title: "Implement", assignedTo: "PersonB", status: "Open"},
    {title: "Issue", assignedTo: "PersonB", status: "Open"},
    {title: "Reply to devops mail", assignedTo: "PersonB", status: "Open"},
    {title: "Send email to contribute for tables", assignedTo: "PersonC", status: "In Progress"},
    {title: "Error section", assignedTo: "PersonC", status: "In Progress"},
    {title: "Report tile issue", assignedTo: "PersonC", status: "Complete"},
    {title: "Weeding", assignedTo: "PersonD", status: "Complete"},
    {title: "Check cows behavior", assignedTo: "PersonD", status: "Close"},
  ]
  return (
    <>
      <GlobalStyle />
      <StyledPage>

      <h1>Board</h1>
      <Flex as={StyledTask} container={{ direction: 'row' }}>
        {tasklist.map(task => {
          return (
            <>
              <Flex as={StyledTaskList} container={{ direction: 'column' }}>
                <span>{task.name}</span>
                {data.map(element => {
                  if (task.name == element.status) {
                    return (
                      <Card as={StyledCard}>
                        <CardContent>
                          {task.name == element.status &&
                              <>
                                <span>{element.title}</span>
                                <span>{element.assignedTo}</span>
                              </>
                          }
                        </CardContent>
                      </Card>
                    );
                  }
                })
                }
              </Flex>
            </>
            );
          })
        }
      </Flex>
      </StyledPage>
    </>
  );
};

export default Board