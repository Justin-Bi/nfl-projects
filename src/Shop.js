import React, {useState, useEffect} from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Shop() {

  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch('https://www.reddit.com/r/ACTrade/comments/i9ms4n/giveaway_rare_diys/.json');
    const items = await data.json();
    console.log(items);
    setItems(items);
  }
  return (
    <div>
      
      <h1>Shop Page</h1>

      {items.map(item => (
        <h1 key={item.data.children[0].data.author}>
          <Link to={`/shop/${item.data.children[0].data.author}`}>
            {item.data.children[0].data.author}
          </Link>
        </h1>
      ))}
    </div>
  );
}

export default Shop;
