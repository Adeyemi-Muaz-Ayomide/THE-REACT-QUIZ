import { useEffect, useReducer, useState } from 'react';
import Header from './Header'
import Main from './Main';
import Loader from './Loader';
import Error from './Error';

const initialState = { questions: [], status: 'ready' };

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
     return {...state, questions: action.payload};
    case 'reset':
      return initialState;
  
    default:
      break;
  }
}
const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
 // const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=20&category=9&difficulty=medium');
        const jsonData = await response.json();
        dispatch({ type: 'dataReceived', payload: jsonData.results });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <div><Error /></div>;
  }

  return (
    <div className="app">
      <Header />
      <Main />

      {/* <div>
        {data && (
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
}

export default App;
