import { useState } from 'react'
import { AppRouter } from './routes/AppRouter'
import { Preloader } from './components/ui/Preloader'

function App() {
  const [showPreloader, setShowPreloader] = useState(true)

  return (
    <>
      {showPreloader && <Preloader onFinish={() => setShowPreloader(false)} />}
      <AppRouter />
    </>
  )
}

export default App
