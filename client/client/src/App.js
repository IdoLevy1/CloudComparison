import './App.css';
import CPU from './CPU';

function App() {
  return (
    <div className='App'>
      <h1>Cloud Comparison</h1>
      <div class="custom-select" style = {
        {
          width: '400px'
        }
      }>
        <label>Choose cloud provider:
      <select name='providers'>
        <option value="select provider">Select provider:</option>
        <option value="microsoft Azure">Microsoft Azure</option>
        <option value="amazon AWS">Amazon AWS</option>
        <option value="google cloud">Google cloud</option>
      </select>
      </label>

      <label>Choose machine location:
      <select name='locations'>
        <option value="select location">Select location:</option>
        <option value="usa">USA</option>
        <option value="europe">Europe</option>
        <option value="israel">Israel</option>
      </select>
      </label>
    </div>
    <div>
      <CPU />
    </div>
   
    </div>
  );
}

export default App;
