import type { FormEvent } from 'react';
import './App.css'
import {Button, Flex, Form, Input} from "@pega/cosmos-react-core";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledLogin = styled.div`
  //margin: 0 auto;
  //padding: 10rem;
  height:100%;
  width: 100%;
`;

const Login = ()=>{ 
  const navigate = useNavigate();
  const handleForm = () => {
    navigate('/Board');
  }

  return (
      <Flex
        container={{justify: 'center', alignItems: 'center'}}
        as={StyledLogin}
      >
        <Form
          actions={
            <>
              <Button name='Submit' type='submit' variant='primary' onClick={() => {handleForm()}}>
                Log in
              </Button>
            </>
          }
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            // action('Submit')(`Form:${e.type}`);
          }}
          // style={{ margin: 'auto', maxWidth: '37.5rem' }}
        >
          <Input label='Work Email' type='email' />
          <Input label='Password' type='password' />
        </Form>
      </Flex>
  )
}

export default Login
