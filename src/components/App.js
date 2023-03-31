import './App.css';
import DynamicForm from './DynamicForm';

function App() {
  return (
    <div className="App">
   <DynamicForm data={[]} onSave={formData => console.log(formData)}  />
    </div>
  );
}

export default App;
