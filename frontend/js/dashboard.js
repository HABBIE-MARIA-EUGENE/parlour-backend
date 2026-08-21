const API_URL = "https://parlour-backend-smg5.onrender.com";

const token = localStorage.getItem("access_token");

if (!token) {
  window.location.href = "login.html";
}


async function loadDashboard() {

  try {

    const response = await fetch(
      `${API_URL}/admin/bookings/`,
      {
        method: "GET",

        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );


    if (response.status === 401) {

      localStorage.removeItem("access_token");

      window.location.href = "login.html";

      return;
    }


    if (!response.ok) {
      throw new Error("Failed to load bookings");
    }


    const bookings = await response.json();


    updateStatistics(bookings);

    displayRecentBookings(bookings);


  } catch (error) {

    console.error(
      "Dashboard error:",
      error
    );

  }

}


function updateStatistics(bookings) {

  const total = bookings.length;

  const pending = bookings.filter(
    booking => booking.status === "pending"
  ).length;

  const confirmed = bookings.filter(
    booking => booking.status === "confirmed"
  ).length;

  const completed = bookings.filter(
    booking => booking.status === "completed"
  ).length;


  document.getElementById(
    "total-bookings"
  ).textContent = total;


  document.getElementById(
    "pending-bookings"
  ).textContent = pending;


  document.getElementById(
    "confirmed-bookings"
  ).textContent = confirmed;


  document.getElementById(
    "completed-bookings"
  ).textContent = completed;

}



function displayRecentBookings(bookings) {

  const container =
    document.getElementById(
      "recent-bookings-container"
    );


  if (bookings.length === 0) {

    container.textContent =
      "No bookings yet.";

    return;
  }


  const recentBookings =
    bookings.slice(-5).reverse();


  container.innerHTML = "";


  recentBookings.forEach(
    booking => {

      const item =
        document.createElement("div");

      item.classList.add(
        "recent-booking"
      );


      item.innerHTML = `
        <strong>
          ${booking.customer_name}
        </strong>

        <span>
          ${booking.service}
        </span>

        <span>
          ${booking.booking_date}
        </span>

        <span>
          ${booking.status}
        </span>
      `;


      container.appendChild(item);

    }
  );

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


loadDashboard();

