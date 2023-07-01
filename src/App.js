import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';


function App() {

  const [question, setQuestion] = useState('What is your favorite place?');
  const [options, setOptions] = useState([
    { label: 'Beach', votes: 0 },
    { label: 'Mountain', votes: 0 },
    { label: 'City', votes: 0 },
  ]);
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedOptions = localStorage.getItem('pollOptions');
    if (savedOptions) {
      setOptions(JSON.parse(savedOptions));
    }
  }, []);

  const handleVote = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption === '') {
      // No option selected, show an error message
      alert('Please select an option before submitting.');
    } else {
      const updatedOptions = options.map((option) => {
        if (option.label === selectedOption) {
          return {
            ...option,
            votes: option.votes + 1,
          };
        }
        return option;
      });

      setOptions(updatedOptions);
      setSubmitted(true);
      alert('Thank you for submitting your vote!');
      localStorage.setItem('pollOptions', JSON.stringify(updatedOptions));
    }
  };

  const resetPoll = () => {
    setOptions((prevOptions) =>
      prevOptions.map((option) => ({ ...option, votes: 0 }))
    );
    setSelectedOption('');
    setSubmitted(false);
    localStorage.removeItem('pollOptions');
  };
  return (
    <div className="container">
      <div>
        <div>
          <h1>{question}</h1>
          <form>
            {options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="option"
                  value={option.label}
                  checked={selectedOption === option.label}
                  onChange={handleVote}
                />
                {option.label}
              </label>
            ))}
          </form>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div>
          <h2>Results:</h2>
          <p>Hover on Pie-Chart Area to know the Option Name</p>
          <PieChart
            data={options.map((option) => ({
              title: option.label,
              value: option.votes,
              color: '#' + Math.floor(Math.random() * 16777215).toString(16), // Random color for each slice
              label: option.label, // Include option label in the pie chart
            }))}
          />
          <table>
            <thead>
              <tr>
                <th>Option</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              {options.map((option, index) => (
                <tr key={index}>
                  <td>{option.label}</td>
                  <td>{option.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={resetPoll}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
