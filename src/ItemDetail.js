import React, {useState, useEffect} from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Item({match}) {

  useEffect(() => {
    fetchItem();
  }, []);

  const [item, setItem] = useState('');

  const fetchItem = async () => {
    setItem(match.params.id)
  }

  return (
    <div>
      <h1>{item}</h1>
    </div>
  );
}

export default Item;
