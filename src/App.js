import React, {useState, useEffect} from 'react';
import './index.scss';
import {Success} from './components/Success';
import {Users} from './components/Users';

function App() {
  const [users, setUsers] = useState([]);
  const [invited, setInvited] = useState([]);
  const [success, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((response) => response.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    if (invited.includes(id)) {
      setInvited((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvited((prev) => [...prev, id]);
    }
  };

	const onClickSendInvites = () => {
		setSuccess(true);
	}

  return (
    <div className="App">
      {success ? (
        <Success count={invited.length} />
      ) : (
        <Users
          items={users}
          isLoading={isLoading}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          invited={invited}
          onClickInvite={onClickInvite}
					onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
