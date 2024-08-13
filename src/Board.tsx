import { useRef } from 'react';
import styled from 'styled-components';
import {Flex, useConsolidatedRef, useDraggable} from "@pega/cosmos-react-core";


const StyledTaskContainer = styled.div`
  .tile {
    width: 100%;
    height: 100px;
    display: inline-block;
    border: 1px double;
    margin: 10px;
    list-style: none;
  }
`;

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

  return (
    <>
      <Flex container direction="column">
        <h1>Board</h1>
        <ul>
          <StyledTaskContainer ref={tileContainerRef} className='container1'>
            {/*{items.map(item => {*/}
            {/*return (*/}
            {/*  <>*/}
                <li className='tile' ref={containerRef1}><p ref={dragRef1}>tile1</p></li>
                <li className='tile' ref={containerRef2}><p ref={dragRef2}>tile2</p></li>
                <li className='tile' ref={containerRef3}><p ref={dragRef3}>tile3</p></li>
                {/*<li className='tile' ref={`containerRef${item.id}`} ><p ref={`dragRef${item.id}`}>{item.name}</p></li>*/}
              {/*</>*/}
            {/*);*/}
            {/*})}*/}
          </StyledTaskContainer>
        </ul>
      </Flex>
    </>
  );
};

export default Board