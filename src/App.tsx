import { useState } from 'react'
import type { MouseEvent, FormEvent } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Card, Form, Input } from "@pega/cosmos-react-core";
import { BrowserRouter, useNavigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  const handleForm = () => {
    navigate('/Form');
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Card>
        <Input label='Work Email' />
      </Card>
      <Form
        actions={
          <>
            <Button name='Submit' type='submit' variant='primary'>
              Submit
            </Button>
          </>
        }
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          // action('Submit')(`Form:${e.type}`);
        }}
        style={{ margin: 'auto', maxWidth: '37.5rem' }}
      >
        <Input label='Work Email' />
      </Form>
</>
  )
}

export default App
