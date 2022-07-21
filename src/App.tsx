import Counter from "./components/Counter"
import Navbar from "./components/Navbar"
import Todo from "./components/Todo"

function App() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />
      <div className="px-4 mt-3">
        {/* <Counter /> */}
        <Todo />
      </div>
    </div>
  )
}

export default App
