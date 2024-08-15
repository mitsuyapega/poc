import type { FormEvent } from 'react';
import {Button, Card, CardContent, Flex, Form, Input} from "@pega/cosmos-react-core";
import { useNavigate } from "react-router-dom";
import styled, {createGlobalStyle} from "styled-components";
import clickUpLogo from './assets/clickup logo.svg'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const StyledPage = styled.div`
  height: 100%;
  width: 100%;
  background-color: #F8F8FF;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;

const StyledClickUp = styled.img`
  width: 10vw;
  height: 30px;
`;

const StyledSpan = styled.span`
  margin-right: 10px;
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: mediumpurple;
  color: white;
`;

const StyledForm = styled.div`
  height: 60%;
  width: 100%;
`;

const StyledCard = styled.div`
  width: 30%;
  margin: auto;
  padding: 10px;
  box-shadow: 1px 1px gray;
`;

const StyledWelcome = styled.span`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  font-family: Helvetica;
  margin-bottom: 10px;
`;

const StyledGIcon = styled.img`
  width: 10%;
  height: 20px;
  margin-right: 40px;
`;

const StyledGButton = styled.button`
  justify-content: flex-start;
`;

const StyledDivide = styled.span`
  display: flex;
  align-items: center;
  width: 300px;
  margin: 20px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: gray;
  };
  
  &::before {
    margin-right: 10px;
  };
  
  &::after {
    margin-left: 10px;
  };
  
  span {
    font-size: 14px;
    color: black;
  };
`;

const StyledLogin = styled.button`
  width: 100%;
  background-color: slateblue;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  margin-top: 20px;
  margin-bottom: 20px;
`

const StyledSSO = styled.span`
  text-align: center;
  font-size: 15px;
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleForm = () => {
    navigate('/Board');
  }

  return (
    <>
      <GlobalStyle />
      <StyledPage>
        <StyledHeader>
          <a href="https://clickup.com/" target="_blank">
            <StyledClickUp src={clickUpLogo} className="logo" alt="Clickup logo"/>
          </a>
          <div>
            <StyledSpan>Don't have an account?</StyledSpan>
            <StyledButton>Sine up</StyledButton>
          </div>
        </StyledHeader>

        <Flex
          container={{justify: 'center', alignItems: 'center'}}
          as={StyledForm}
        >
          <Card as={StyledCard}>
            <CardContent>
              <StyledWelcome>Welcome back!</StyledWelcome>
              <Button as={StyledGButton}>
                <StyledGIcon
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                />
                Continue with Google
              </Button>
              <Form onSubmit={(e: FormEvent) => {e.preventDefault();}}>
                <StyledDivide>
                  <span>OR</span>
                </StyledDivide>
                <Input as={StyledInput} label='Work Email' type='email' />
                <Input as={StyledInput} label='Password' type='password' />
                <Button
                  as={StyledLogin}
                  name='Submit'
                  type='submit'
                  variant='primary'
                  onClick={() => {handleForm()}}
                >
                  Log in
                </Button>
              </Form>
              <StyledSSO>or login with SSO</StyledSSO>
            </CardContent>
          </Card>
        </Flex>
      </StyledPage>
    </>
  )
}

export default Login
