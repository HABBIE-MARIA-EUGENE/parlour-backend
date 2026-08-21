const API_URL = "https://parlour-backend-smg5.onrender.com";

const token =
  localStorage.getItem("access_token");


if (!token) {

  window.location.href =
    "login.html";

}


const tableBody =
  document.getElementById(
    "bookings-table-body"
  );


const message =
  document.getElementById(
    "bookings-message"
  );


async function loadBookings() {

  try {

    const response = await fetch(
      `${API_URL}/admin/bookings/`,
      {
        method: "GET",

        headers: {
          "Authorization":
            `Bearer ${token}`
        }
      }
    );


    if (response.status === 401) {

      localStorage.removeItem(
        "access_token"
      );

      window.location.href =
        "login.html";

      return;

    }


    if (!response.ok) {

      throw new Error(
        "Failed to load bookings"
      );

    }


    const bookings =
      await response.json();


    message.textContent = "";


    displayBookings(bookings);


  } catch (error) {

    console.error(
      "Bookings error:",
      error
    );

    message.textContent =
      "Unable to load bookings.";

  }

}




function displayBookings(bookings) {

  tableBody.innerHTML = "";


  if (bookings.length === 0) {

    message.textContent =
      "No bookings found.";

    return;

  }


  bookings.forEach(
    booking => {

      const row =
        document.createElement("tr");


      row.innerHTML = `

        <td>
          ${booking.id}
        </td>

        <td>
          ${booking.customer_name}
        </td>

        <td>
          ${booking.phone}
        </td>

        <td>
          ${booking.service}
        </td>

        <td>
          ${booking.booking_date}
        </td>

        <td>
          ${booking.booking_time}
        </td>

        <td>
          <span class="booking-status">
            ${booking.status}
          </span>
        </td>

        <td>

          <div class="booking-actions">

            <button
              class="confirm-btn"
              onclick="updateBookingStatus(
                ${booking.id},
                'confirmed'
              )"
            >
              Confirm
            </button>


            <button
              class="cancel-btn"
              onclick="updateBookingStatus(
                ${booking.id},
                'cancelled'
              )"
            >
              Cancel
            </button>


            <button
              class="complete-btn"
              onclick = "updateBookingStatus(
                ${booking.id},
                'completed'
              )"
            >
              Complete
            </button>

          </div>

        </td>

      `;


      tableBody.appendChild(row);

    }
  );

}




async function updateBookingStatus(
  bookingId,
  status
) {

  try {

    const response = await fetch(
      `${API_URL}/admin/bookings/${bookingId}`,
      {
        method: "PUT",

        headers: {
          "Authorization":
            `Bearer ${token}`,

          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          status: status
        })
      }
    );


    if (response.status === 401) {

      localStorage.removeItem(
        "access_token"
      );

      window.location.href =
        "login.html";

      return;

    }


    if (!response.ok) {

      const error =
        await response.json();

      throw new Error(
        error.detail ||
        "Failed to update booking"
      );

    }


    // Reload the table

    await loadBookings();


  } catch (error) {

    console.error(
      "Update booking error:",
      error
    );

    alert(
      error.message
    );

  }

}




document.getElementById(
  "logout-btn"
).addEventListener(
  "click",
  () => {

    localStorage.removeItem(
      "access_token"
    );

    window.location.href =
      "login.html";

  }
);


loadBookings();