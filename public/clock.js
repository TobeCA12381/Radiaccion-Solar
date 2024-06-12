const timeHours = document.getElementById('hours');
const timeMinutes = document.getElementById('minutes');
const timeSeconds = document.getElementById('seconds');
const dateElement = document.getElementById('date');

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const interval = setInterval(() => {
  const local = new Date();

  let day = local.getDate(),
      month = local.getMonth(),
      year = local.getFullYear();

  timeHours.innerHTML = local.getHours().toString().padStart(2, '0');
  timeMinutes.innerHTML = local.getMinutes().toString().padStart(2, '0');
  timeSeconds.innerHTML = local.getSeconds().toString().padStart(2, '0');
  dateElement.innerHTML = `${day} ${monthNames[month]} ${year}`;
}, 1000);