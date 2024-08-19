import type { FormEvent } from 'react';
import {Button, Card, CardContent, defaultThemeProp, Flex, Form, Input} from "@pega/cosmos-react-core";
import { useNavigate } from "react-router-dom";
import styled, {createGlobalStyle, css} from "styled-components";
import clickUpLogo from './assets/clickup logo.svg'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const StyledPage = styled.div(props => {
  const {
    'extra-light': extraLight
  } = props.theme.base.colors.gray;

  return css`
  height: 100%;
  width: 100%;
  background-color: ${extraLight};
  `
})

StyledPage.defaultProps = defaultThemeProp;

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

const StyledButton = styled.button(props => {
  const {
    spacing,
    'colors': {
      'purple': {
        'dark': colorDark,
      },
      white,
    }
  } = props.theme.base;

  return css`
    padding: ${spacing} 16px;
    background-color: ${colorDark};
    color: ${white};
  `
})

StyledButton.defaultProps = defaultThemeProp;

const StyledForm = styled.div`
  height: 60%;
  width: 100%;
`;

const StyledCard = styled.div`
  width: 30%;
  margin: auto;
  padding: 10px;
  box-shadow: 1px 1px ${(props) => props.theme.base.colors.gray.dark};
`;

const StyledWelcome = styled.span`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  font-family: ${defaultThemeProp.theme.base["font-family"]};
  margin-bottom: 10px;
`;

const StyledGIcon = styled.img`
  width: 10%;
  height: 20px;
`;

const StyledGButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`;

const StyledTextContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

const StyledDivide = styled.span`
  display: flex;
  align-items: center;
  margin: 20px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top: 1px solid ${defaultThemeProp.theme.base.colors.gray.medium};
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
    width: 30px;
    text-align: center;
  };
`;

const StyledLogin = styled.button`
  width: 100%;
  background-color: ${defaultThemeProp.theme.base.colors.purple.medium};
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
                <StyledTextContainer>Continue with Google</StyledTextContainer>
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
