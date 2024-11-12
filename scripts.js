// Movie class to store movie data
class Movie {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

let seats = 0;

function updateTotalPrice() {
  const selectedMovie = document.getElementById('movie');
  const pricePerSeat = parseFloat(selectedMovie.value);
  const totalPrice = (seats * pricePerSeat).toFixed(2);

  document.getElementById('count').textContent = `${seats}`;
  document.getElementById('total').textContent = `${totalPrice}`;
}

async function fetchMovies() {
  const selectedMovie = document.getElementById('movie');

  const response = await fetch('https://gist.githubusercontent.com/MhatteBoi/f5fd22a9be604c579de5ac206859cf07/raw/8fd734bbc25f303bfd0cb6a7361b7ef5ca372cd1/movies.json');
  const data = await response.json();
  const movies = data.map((movie) => new Movie(movie.name, movie.price));
  console.log(movies);

  selectedMovie.innerHTML = '';

  movies.forEach((movie) => {
    const option = document.createElement('option');
    option.value = movie.price;
    option.text = movie.name;
    selectedMovie.appendChild(option);
  });

  selectedMovie.addEventListener('change', () => {
    updateTotalPrice();
  });
}

function toggleSeat(seatElement) {
  const isOccupied = seatElement.classList.contains('occupied');
  if (isOccupied) return;

  if (seatElement.classList.contains('selected')) {
    seatElement.classList.remove('selected');
    seats -= 1;
  } else {
    seatElement.classList.add('selected');
    seats += 1;
  }

  updateTotalPrice();
}

function initialize() {
  fetchMovies();

  document.querySelectorAll('.seat').forEach((seat) => {
    seat.addEventListener('click', () => toggleSeat(seat));
  });
}

initialize();
