import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import EditDetails from './EditDetails';
import './View.css'

import './Home.css';
import axios from 'axios';
import url from './config';

const ViewDetails = () => {
    const [details, setDetails] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [roomNumberFilter, setRoomNumberFilter] = useState('');
    const [roomTypeFilter, setRoomTypeFilter] = useState('');
    const [startTimeFilter, setStartTimeFilter] = useState('');
    const [endTimeFilter, setEndTimeFilter] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(url+'/api/users/view');
                const data = response.data;
                setDetails(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${url}/api/users/delete/${id}`);
            setDetails(details.filter((detail) => detail._id !== id));
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleEdit = async (updatedDetail) => {
        try {
          if (!updatedDetail) {
            throw new Error("Detail id is missing");
          }
          const response = await axios.put(`${url}/api/users/update/${updatedDetail._id}`, updatedDetail);
          const updatedData = response.data;
          if (updatedData._id === updatedDetail._id) {
            setDetails(details.map(detail => detail._id === updatedData._id ? updatedData : detail));
          } else {
            setDetails(details.map(detail => detail));
          }
          setSelectedDetail(null);
        } catch (error) {
          console.log(error);
        }
      };      
    
    const handleEditClick = (detail) => {
        console.log(detail);
        setSelectedDetail(detail);
    }

    const handleRoomNumberFilterChange = (event) => {
        setRoomNumberFilter(event.target.value);
    };

    const handleRoomTypeFilterChange = (event) => {
        setRoomTypeFilter(event.target.value);
    };

    const handleStartTimeFilterChange = (event) => {
        setStartTimeFilter(event.target.value);
    };

    const handleEndTimeFilterChange = (event) => {
        setEndTimeFilter(event.target.value);
    };

    const filteredDetails = details.filter((detail) => {
        if (roomNumberFilter && detail.roomNumber !== roomNumberFilter) {
            return false;
        }
        if (roomTypeFilter && detail.roomType !== roomTypeFilter) {
            return false;
        }
        if (startTimeFilter && detail.startTime < startTimeFilter) {
            return false;
        }
        if (endTimeFilter && detail.endTime > endTimeFilter) {
            return false;
        }
        return true;
    });

    return (
        <div class="details-container">
            <h1>All Bookings</h1>
            <div class="filters">
                <label>Room Number:</label>
                <input type="text" value={roomNumberFilter} onChange={handleRoomNumberFilterChange} />
                <label>Room Type:</label>
                <input type="text" value={roomTypeFilter} onChange={handleRoomTypeFilterChange} />
                <label>Start Time:</label>
                <input type="text" value={startTimeFilter} onChange={handleStartTimeFilterChange} />
                <label>End Time:</label>
                <input type="text" value={endTimeFilter} onChange={handleEndTimeFilterChange} />
            </div>
            <table class="details-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Room Number</th>
                        <th>Room Type</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDetails.map((detail) => (
                        <tr key={detail._id}>
                            <td>{detail._id}</td>
                            <td>{detail.name}</td>
                            <td>{detail.userEmail}</td>
                            <td>{detail.roomNumber}</td>
                            <td>{detail.roomType}</td>
                            <td>{detail.fromDate}</td>
                            <td>{detail.toDate}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEditClick(detail)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(detail._id)}>Delete</Button>{' '}
                                {/* <Link to={/details/${detail._id}}><Button variant="info">Details</Button></Link> */}
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    {selectedDetail && <EditDetails detail={selectedDetail} onEdit={handleEdit} onCancel={() => setSelectedDetail(null)} />}
    </div>
);
};

export default ViewDetails;
