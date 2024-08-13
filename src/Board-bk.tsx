import {Card, CardContent, CardHeader, Flex, Input} from "@pega/cosmos-react-core";
import styled from "styled-components";
import {useDraggable, useConsolidatedRef, } from "@pega/cosmos-react-core";
import {useRef} from "react";

export interface FloatingPanelProps {
  /** The heading rendered. */
  heading: string;
  /** Content of the panel */
  // children: ReactNo;
  /** Action button to be rendered in header */
  // actions?: FloatingPanelActionProps[];
  /** If true, the component will be draggable */
  draggable?: boolean;
  /** If true, the panel is visible. */
  visible?: boolean;
  /** Reference to the root component. */
  // ref?: Ref<HTMLDivElement>;
}

function Board() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useConsolidatedRef(ref);
  const dragRef = useRef<HTMLDivElement>(null);
  useDraggable(containerRef, dragRef, true)

  return (
    <>
      <div>
        <Flex container={{ gap: 5, pad: 1 }}>
          <ul ref={containerRef}>
            <li draggable="true" ref={dragRef}>task1</li>
            <li draggable="true" ref={dragRef}>task3</li>
            <li draggable="true">task2</li>
          </ul>
          <Card ref={containerRef}>
            <CardHeader ref={dragRef}>
              head
            </CardHeader>
            <CardContent>
              cont
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              head
            </CardHeader>
            <CardContent>
              cont
            </CardContent>
          </Card>
        </Flex>
      </div>

    </>
  )
}

// export default Board
