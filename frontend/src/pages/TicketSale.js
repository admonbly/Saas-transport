import React, { useState, useEffect } from 'react';
import { createTicket, getTrips } from '../api/api';
import { QRCodeCanvas } from 'qrcode.react';
import '../App.css';

const MAX_ROWS = 11; // Nombre de rangées dans le car
const MAX_COLUMNS = 3; // Nombre de colonnes par rangée (gauche/droite)
const SEATS_PER_ROW = MAX_COLUMNS * 2; // Deux côtés dans un car

const TicketSale = () => {
  const [ticketData, setTicketData] = useState({
    passengerName: '',
    tripId: '',
    seatNumber: '',
    price: '',
  });
  const [qrCode, setQrCode] = useState(null);
  const [trips, setTrips] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await getTrips();
        setTrips(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des trajets:', error);
      }
    };
    fetchTrips();
  }, []);

  const handleTripSelection = (e) => {
    const selectedTripId = e.target.value;
    setTicketData((prev) => ({ ...prev, tripId: selectedTripId }));

    // Simuler des sièges disponibles (en réel, cela viendrait de l'API backend)
    const occupiedSeats = [1, 5, 12, 20, 25]; // Remplacez par des données API réelles
    setOccupiedSeats(occupiedSeats);

    // Réinitialiser la sélection du siège
    setSelectedSeat(null);
    setTicketData((prev) => ({ ...prev, seatNumber: '' }));
  };

  const handleSeatClick = (seatNumber) => {
    if (!occupiedSeats.includes(seatNumber)) {
      setSelectedSeat(seatNumber);
      setTicketData((prev) => ({ ...prev, seatNumber }));
    }
  };

  const handleCreateTicket = async () => {
    if (!ticketData.passengerName || !ticketData.tripId || !ticketData.seatNumber || !ticketData.price) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await createTicket(ticketData);
      setQrCode(response.data.qrCode);
      alert('Billet créé avec succès!');
    } catch (error) {
      console.error('Erreur lors de la création du billet:', error);
      alert('Erreur lors de la création du billet.');
    }
  };

  const handleDownloadTicket = () => {
    if (qrCode) {
      const canvas = document.querySelector('canvas');
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `ticket-${ticketData.passengerName}.png`;
      link.click();
    }
  };

  const renderSeats = () => {
    const seats = [];
    for (let row = 1; row <= MAX_ROWS; row++) {
      const rowSeats = [];
      for (let seat = 1; seat <= SEATS_PER_ROW; seat++) {
        const seatNumber = (row - 1) * SEATS_PER_ROW + seat;
        const isOccupied = occupiedSeats.includes(seatNumber);
        const isSelected = selectedSeat === seatNumber;

        rowSeats.push(
          <div
            key={seatNumber}
            className={`seat ${isOccupied ? 'occupied' : 'available'} ${
              isSelected ? 'selected' : ''
            }`}
            onClick={() => !isOccupied && handleSeatClick(seatNumber)}
          >
            {seatNumber}
          </div>
        );
      }
      seats.push(
        <div key={row} className="seat-row">
          {rowSeats}
        </div>
      );
    }
    return seats;
  };

  return (
    <div className="ticket-sale container">
      <h2 className="section-title">Vente de Billets</h2>
      <div className="form-group">
        <label>Nom du Passager :</label>
        <input
          type="text"
          name="passengerName"
          placeholder="Nom du passager"
          value={ticketData.passengerName}
          onChange={(e) => setTicketData((prev) => ({ ...prev, passengerName: e.target.value }))}
        />

        <label>Trajet :</label>
        <select
          name="tripId"
          value={ticketData.tripId}
          onChange={handleTripSelection}
        >
          <option value="">Sélectionnez un trajet</option>
          {trips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.routeName} ({trip.departure} - {trip.arrival})
            </option>
          ))}
        </select>

        <label>Prix :</label>
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={ticketData.price}
          onChange={(e) => setTicketData((prev) => ({ ...prev, price: e.target.value }))}
        />
      </div>

      <div className="seats-container">
        <h3>Sélectionnez votre siège :</h3>
        <div className="seats-grid">{renderSeats()}</div>
      </div>

      <button className="button" onClick={handleCreateTicket}>
        Générer le Billet
      </button>

      {qrCode && (
        <div className="qr-code">
          <h3>QR Code :</h3>
          <QRCodeCanvas value={qrCode} />
          <button className="button" onClick={handleDownloadTicket}>
            Télécharger le Billet
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketSale;
