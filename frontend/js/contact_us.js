const bookingForm = document.getElementById("booking-form");
const bookingMessage = document.getElementById("booking-message");

const API_URL = "https://parlour-backend-smg5.onrender.com";

bookingForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const bookingData = {
    customer_name: document.getElementById("booking-name").value,
    phone: document.getElementById("booking-phone").value,
    service: document.getElementById("booking-service").value,
    booking_date: document.getElementById("booking-date").value,
    booking_time: document.getElementById("booking-time").value
  };

  console.log("Sending booking:", bookingData);

  try {

    const response = await fetch(`${API_URL}/bookings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Booking failed");
    }

    bookingMessage.textContent =
      "Appointment booked successfully!";

    bookingForm.reset();

    console.log("Booking created:", data);

  } catch (error) {

    console.error("Booking error:", error);

    bookingMessage.textContent =
      error.message || "Unable to book appointment.";
  }

});