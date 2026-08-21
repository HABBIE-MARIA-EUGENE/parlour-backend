const API_URL = "http://https://parlour-backend-smg5.onrender.com";

const token = localStorage.getItem("access_token");


// Check login
if (!token) {
  window.location.href = "login.html";
}


// Elements
const galleryGrid = document.getElementById(
  "admin-gallery-grid"
);

const uploadForm = document.getElementById(
  "gallery-upload-form"
);

const uploadMessage = document.getElementById(
  "gallery-message"
);


// gal ld

async function loadGallery() {

  try {

    const response = await fetch(
  `${API_URL}/admin/gallery/`,
  {
    method: "GET",

    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
);

    if (!response.ok) {
      throw new Error("Failed to load gallery");
    }

    const gallery = await response.json();

    displayGallery(gallery);

  } catch (error) {

    console.error(
      "Gallery error:",
      error
    );

    galleryGrid.textContent =
      "Unable to load gallery.";

  }

}


// disp

function displayGallery(gallery) {

  galleryGrid.innerHTML = "";


  if (gallery.length === 0) {

    galleryGrid.textContent =
      "No images uploaded yet.";

    return;

  }


  gallery.forEach(item => {

    const card =
      document.createElement("div");

    card.classList.add(
      "admin-gallery-item"
    );


    card.innerHTML = `

      <img
        src="${API_URL}${item.image_url}"
        alt="${item.title}"
      >

      <div class="admin-gallery-info">

        <h3>
          ${item.title}
        </h3>

        <p class="gallery-status">

          Status:

          <strong>
            ${item.is_active
              ? "Active"
              : "Inactive"}
          </strong>

        </p>


        <div class="gallery-actions">

          <button
            class="toggle-gallery-btn"
            onclick="toggleGalleryStatus(
              ${item.id},
              ${item.is_active}
            )"
          >
            ${item.is_active
              ? "Deactivate"
              : "Activate"}
          </button>


          <button
            class="delete-gallery-btn"
            onclick="deleteGallery(
              ${item.id}
            )"
          >
            Delete
          </button>

        </div>

      </div>

    `;


    galleryGrid.appendChild(card);

  });

}


// upld

uploadForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();


    const title =
      document.getElementById(
        "gallery-title"
      ).value;


    const image =
      document.getElementById(
        "gallery-image"
      ).files[0];


    if (!image) {

      uploadMessage.textContent =
        "Please select an image.";

      return;

    }


    const formData =
      new FormData();


    formData.append(
      "title",
      title
    );


    formData.append(
      "image",
      image
    );


    try {

      const response =
        await fetch(
          `${API_URL}/admin/gallery/`,
          {

            method: "POST",

            headers: {
              "Authorization":
                `Bearer ${token}`
            },

            body: formData

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


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(

          typeof data.detail === "string"

            ? data.detail

            : JSON.stringify(
                data.detail
              )

        );

      }


      uploadMessage.textContent =
        "Image uploaded successfully!";


      uploadForm.reset();


      await loadGallery();


    } catch (error) {

      console.error(
        "Upload error:",
        error
      );


      uploadMessage.textContent =
        error.message ||
        "Unable to upload image.";

    }

  }
);


// act & deact

async function toggleGalleryStatus(
  galleryId,
  currentStatus
) {

  const newStatus =
    !currentStatus;


  try {

    const response =
      await fetch(
        `${API_URL}/admin/gallery/${galleryId}?is_active=${newStatus}`,
        {

          method: "PUT",

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


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(

        typeof data.detail === "string"

          ? data.detail

          : JSON.stringify(
              data.detail
            )

      );

    }


    await loadGallery();


  } catch (error) {

    console.error(
      "Gallery status error:",
      error
    );


    alert(
      error.message
    );

  }

}


// del img
async function deleteGallery(
  galleryId
) {

  const confirmed =
    confirm(
      "Are you sure you want to delete this image?"
    );


  if (!confirmed) {
    return;
  }


  try {

    const response =
      await fetch(
        `${API_URL}/admin/gallery/${galleryId}`,
        {

          method: "DELETE",

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


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(

        typeof data.detail === "string"

          ? data.detail

          : JSON.stringify(
              data.detail
            )

      );

    }


    await loadGallery();


  } catch (error) {

    console.error(
      "Delete gallery error:",
      error
    );


    alert(
      error.message
    );

  }

}


// logout

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




loadGallery();
