const galleryGrid = document.getElementById("gallery-grid");
const galleryMessage = document.getElementById("gallery-message");

const API_URL = "https://parlour-backend-smg5.onrender.com";

async function loadGallery() {
  try {
    const response = await fetch(`${API_URL}/gallery/`);

    if (!response.ok) {
      throw new Error("Failed to load gallery");
    }

    const galleryItems = await response.json();

    galleryGrid.innerHTML = "";

    if (galleryItems.length === 0) {
      galleryMessage.textContent = "No gallery images available.";
      return;
    }

    galleryMessage.textContent = "";

    galleryItems.forEach((item) => {

      const galleryItem = document.createElement("div");
      galleryItem.classList.add("gallery-item");

      const image = document.createElement("img");

      image.src = `${API_URL}${item.image_url}`;
      image.alt = item.title || "Gallery image";

      galleryItem.appendChild(image);
      galleryGrid.appendChild(galleryItem);
    });

  } catch (error) {

    console.error("Gallery error:", error);

    galleryMessage.textContent =
      "Unable to load gallery. Please try again later.";
  }
}

loadGallery();