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
    
    return (
        <div class="details-container">
            <h1>All Bookings</h1>
            <table class="details-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Room Number</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((detail) => (
                        <tr key={detail._id}>
                            <td>{detail._id}</td>
                            <td>{detail.name}</td>
                            <td>{detail.userEmail}</td>
                            <td>{detail.roomNumber}</td>
                            <td>{detail.fromDate}</td>
                            <td>{detail.toDate}</td>
                            <td>
                                <Button variant="primary" size="sm" onClick={() => handleEditClick(detail)}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(detail._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedDetail && (
                <EditDetails detail={selectedDetail} handleEdit={handleEdit} />
            )}
        </div>
    );
};

export default ViewDetails;
