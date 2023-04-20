import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import './Booking.css'
import url from './config'

const Booking = () => {
  const { roomid } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [fromDate,setFromDate] = useState();
  const [todate,setToDate] = useState();
  const [roomNumber,setRoomNumber] = useState();
  const [roomType,setRoomType] = useState();

  const [bookingStatus, setBookingStatus] = useState('');


  async function userDetails(){
    const user={
        name: name,
        userEmail: email,
        fromDate: fromDate,
        toDate: todate,
        roomNumber: roomNumber,
        roomType:roomType
    }
    console.log(user);

    await fetch(url+'/api/users/book/create', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log(response);
        if (response.data.status === 'success') {
          console.log(response.data.status);
          setBookingStatus('Booking successful!');
        } else {
          setBookingStatus(response.data.message || 'Booking failed. Please try again.');
        }
    });
    }

   
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.post(url+'/api/rooms/getRoomById', { roomid });
        const data = response.data;
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    if (roomid) {
      fetchData();
    }
  }, [roomid]);

  return (
    <div>
  <h1>Room id={roomid}</h1>
  {loading && <p>Loading...</p>}
  {error && <p>Error fetching room data</p>}
  {room && (
    <div class='main'>
      <div class='image-container'>
        <h2 class='room-type'>Room Type: {room.type}</h2>
        <img class='image' src={room.imageUrl[2]} alt={room.name} />
      </div>
      <div class='booking-container'>
        <h1 class='booking-heading'>Booking Details</h1>
        <hr class='hr' />
        <div class='booking-info'>
          <b>
            <input class='booking-info-item' placeholder='Name' type='text' value={name}
            onChange={(e)=>{setName(e.target.value)}}
            /><br />
            <input class='booking-info-item' placeholder='Email' type='email' value={email}
            onChange={(e)=>(setEmail(e.target.value))}
            /><br />
            <label for='fromDate'>From Date</label>
            <input id='fromDate' class='booking-info-item' placeholder='From' type='date' value={fromDate}
            onChange={(e)=>{setFromDate(e.target.value)}}
            /><br />

            <label for='toDate'>To Date</label>
            <input id='toDate' class='booking-info-item' placeholder='To' type='date' value={todate}
            onChange={(e)=>{setToDate(e.target.value)}}
            /><br />

            <input class='booking-info-item' placeholder='Room Number' type='text' value={roomNumber}
            onChange={(e)=>{
              setRoomNumber(e.target.value);
            }}
            /><br></br>

            <input class='booking-info-item' placeholder='Room Type' type='text' value={roomType}
            onChange={(e)=>{
              setRoomType(e.target.value);
            }}
            />
            
          </b>
        </div>
        <hr class='hr' />
        <div class='amount-details'>
          <h1 class='amount-details-heading'>Amount Details</h1>
          <p class='amount-details-item'><span>Rent Per Day:</span> ₹{room.rentPerDay}</p>
          <p class='amount-details-item'><span>Total Amount:</span> ₹{room.rentPerDay}</p>
        </div>
        <div class='button-container'>
          <button class='button' onClick={userDetails}>Book Now</button>
          {bookingStatus && <p>{bookingStatus}</p>}
        </div>
      </div>
    </div>      
  )}
</div>
  );
};

export default Booking;
