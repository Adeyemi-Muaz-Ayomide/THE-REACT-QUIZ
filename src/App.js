import { useEffect, useState } from 'react';
import Header from './Header'
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=20&category=9&difficulty=medium');
        const jsonData = await response.json();
        setData(jsonData);
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
