import {Card, CardContent, CardHeader, Flex, Input} from "@pega/cosmos-react-core";
import styled from "styled-components";

function Board() {

  return (
    <>
      <div>
        <Flex container={{ gap: 5, pad: 1 }}>
          <Card>
            <CardHeader>
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

export default Board
