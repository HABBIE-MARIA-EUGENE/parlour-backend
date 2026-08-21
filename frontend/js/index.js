const API_URL = "http://https://parlour-backend-smg5.onrender.com";

const sliderTrack =
  document.getElementById("slider-track");

const sliderDots =
  document.getElementById("slider-dots");

const prevBtn =
  document.getElementById("prev-btn");

const nextBtn =
  document.getElementById("next-btn");


let currentSlide = 0;
let galleryImages = [];
let slideInterval;


// Load gallery
async function loadSlider() {

  try {

    const response = await fetch(
      `${API_URL}/gallery/`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to load gallery"
      );
    }

    galleryImages =
      await response.json();


    if (galleryImages.length === 0) {

      sliderTrack.innerHTML = `
        <div class="slider-slide">
          <p>No gallery images available.</p>
        </div>
      `;

      return;
    }


    createSlides();

    createDots();

    showSlide(0);

    startAutoSlide();

  } catch (error) {

    console.error(
      "Slider error:",
      error
    );

  }

}


// Create slides
function createSlides() {

  sliderTrack.innerHTML = "";

  galleryImages.forEach(item => {

    const slide =
      document.createElement("div");

    slide.classList.add(
      "slider-slide"
    );


    slide.innerHTML = `

      <img
        src="${API_URL}${item.image_url}"
        alt="${item.title}"
      >

    `;


    sliderTrack.appendChild(slide);

  });

}


// Create dots
function createDots() {

  sliderDots.innerHTML = "";

  galleryImages.forEach(
    (item, index) => {

      const dot =
        document.createElement("button");

      dot.classList.add(
        "slider-dot"
      );


      dot.addEventListener(
        "click",
        () => {

          currentSlide = index;

          showSlide(
            currentSlide
          );

          restartAutoSlide();

        }
      );


      sliderDots.appendChild(dot);

    }
  );

}


// Show slide
function showSlide(index) {

  if (
    index >= galleryImages.length
  ) {
    currentSlide = 0;
  }


  if (index < 0) {
    currentSlide =
      galleryImages.length - 1;
  }


  sliderTrack.style.transform =
    `translateX(-${currentSlide * 100}%)`;


  const dots =
    document.querySelectorAll(
      ".slider-dot"
    );


  dots.forEach(dot => {

    dot.classList.remove(
      "active"
    );

  });


  if (dots[currentSlide]) {

    dots[currentSlide]
      .classList.add("active");

  }

}


// Next
nextBtn.addEventListener(
  "click",
  () => {

    currentSlide++;

    showSlide(
      currentSlide
    );

    restartAutoSlide();

  }
);


// Previous
prevBtn.addEventListener(
  "click",
  () => {

    currentSlide--;

    showSlide(
      currentSlide
    );

    restartAutoSlide();

  }
);


// Automatic slide
function startAutoSlide() {

  slideInterval =
    setInterval(() => {

      currentSlide++;

      showSlide(
        currentSlide
      );

    }, 5000);

}


// Restart automatic slide
function restartAutoSlide() {

  clearInterval(
    slideInterval
  );

  startAutoSlide();

}


// Start
loadSlider();