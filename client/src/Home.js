import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import url from './config';

const Home = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url+'/api/rooms/getAllRooms');
        const data = response.data;
        setRooms(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>There are total 20 Rooms Available</h1>
      <Link to={'/view'}><Button>View All Bookings</Button></Link>
      <div className="card-container">
        {rooms.map((room) => (
          <div key={room._id} className="card">
            <img className="card-img" src={room.imageUrl[2]} alt={room.name} />
            <div className='card-body'>
                <h2 className='card-type'>Type: {room.type}</h2>
                <h4 className="card-price">{room.rentPerDay}₹ per day</h4>
            </div>
            <div>Available Rooms: {room.Count}</div>
            <p>{room.description}</p>
            <div className='card-btn'>
                <Link to={`/book/${room._id}`}>
                    <Button>Book Now</Button>
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

