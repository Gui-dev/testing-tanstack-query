import './App.css'

import { useState } from 'react'
import { Posts } from './components/posts'
import { CreatePost } from './components/create-post'

function App() {
  const [isMounted, setIsMounted] = useState(false)

  return (
    <>
      <h1>Toggle Posts</h1>
      <button type="button" onClick={() => setIsMounted(prev => !prev)}>
        Toggle
      </button>
      <br />
      <br />
      <CreatePost />
      {isMounted ? <Posts /> : null}
    </>
  )
}

export default App
