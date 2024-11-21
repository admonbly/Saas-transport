import React, { useState, useEffect } from 'react';
import { getBookings, addBooking, cancelBooking } from '../api/api';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ passengerName: '', tripId: '' });

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await getBookings();
      setBookings(response.data);
    };
    fetchBookings();
  }, []);

  const handleAddBooking = async () => {
    const response = await addBooking(newBooking);
    setBookings([...bookings, response.data]);
    setNewBooking({ passengerName: '', tripId: '' });
  };

  const handleCancelBooking = async (bookingId) => {
    await cancelBooking(bookingId);
    setBookings(bookings.filter((booking) => booking.id !== bookingId));
  };

  return (
    <div className="booking container">
      <h2 className="section-title">Gestion des Réservations</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nom du Passager</th>
              <th>ID du Trajet</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.passengerName}</td>
                <td>{booking.tripId}</td>
                <td>
                  <button className="button delete" onClick={() => handleCancelBooking(booking.id)}>
                    Annuler
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="form-group">
        <h3>Ajouter une Réservation</h3>
        <input
          type="text"
          placeholder="Nom du Passager"
          value={newBooking.passengerName}
          onChange={(e) => setNewBooking({ ...newBooking, passengerName: e.target.value })}
        />
        <input
          type="text"
          placeholder="ID du Trajet"
          value={newBooking.tripId}
          onChange={(e) => setNewBooking({ ...newBooking, tripId: e.target.value })}
        />
        <button className="button" onClick={handleAddBooking}>
          Réserver
        </button>
      </div>
    </div>
  );
};

export default Booking;
