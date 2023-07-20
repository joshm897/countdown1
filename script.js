document.addEventListener('DOMContentLoaded', () => {
  const countdown = document.querySelector('.countdown');
  const settingsBtn = document.getElementById('settings-btn');
  const settings = document.getElementById('settings');
  const eventNameInput = document.getElementById('eventName');
  const eventDateInput = document.getElementById('eventDate');
  const eventTimeInput = document.getElementById('eventTime');
  const timeZoneSelect = document.getElementById('timeZone');
  const showWeeksCheckbox = document.getElementById('showWeeks');
  const showDaysCheckbox = document.getElementById('showDays');
  const showHoursCheckbox = document.getElementById('showHours');
  const showMinutesCheckbox = document.getElementById('showMinutes');
  const showSecondsCheckbox = document.getElementById('showSeconds');
  const showMillisecondsCheckbox = document.getElementById('showMilliseconds');
  const darkModeCheckbox = document.getElementById('darkMode');

  let eventDate = new Date('2023-08-22T08:30:00');
  let timeZoneOffset = eventDate.getTimezoneOffset() * 60 * 1000;
  let darkMode = false;
  let showWeeks = false;
  let showDays = true;
  let showHours = true;
  let showMinutes = true;
  let showSeconds = true;
  let showMilliseconds = false;

  function updateSettings() {
    eventDate = new Date(`${eventDateInput.value}T${eventTimeInput.value}`);
    timeZoneOffset = -(new Date().getTimezoneOffset() * 60 * 1000);
    darkMode = darkModeCheckbox.checked;
    showWeeks = showWeeksCheckbox.checked;
    showDays = showDaysCheckbox.checked;
    showHours = showHoursCheckbox.checked;
    showMinutes = showMinutesCheckbox.checked;
    showSeconds = showSecondsCheckbox.checked;
    showMilliseconds = showMillisecondsCheckbox.checked;
  }

  function updateCountdown() {
    const now = new Date();
    let timeDifference = eventDate - now - timeZoneOffset;

    if (timeDifference <= 0) {
      countdown.textContent = 'The event has already passed!';
      return;
    }

    const weeks = Math.floor(timeDifference / (7 * 24 * 60 * 60 * 1000));
    timeDifference %= 7 * 24 * 60 * 60 * 1000;
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    timeDifference %= 24 * 60 * 60 * 1000;
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    timeDifference %= 60 * 60 * 1000;
    const minutes = Math.floor(timeDifference / (60 * 1000));
    timeDifference %= 60 * 1000;
    const seconds = Math.floor(timeDifference / 1000);
    const milliseconds = timeDifference % 1000;

    let countdownText = '';
    if (showWeeks) countdownText += `${weeks}w `;
    if (showDays) countdownText += `${days}d `;
    if (showHours) countdownText += `${hours}h `;
    if (showMinutes) countdownText += `${minutes}m `;
    if (showSeconds) countdownText += `${seconds}s `;
    if (showMilliseconds) countdownText += `${milliseconds}ms`;

    countdown.textContent = countdownText.trim();
  }

  function toggleSettings() {
    settings.style.display = settings.style.display === 'block' ? 'none' : 'block';
  }

  settingsBtn.addEventListener('click', toggleSettings);
  eventNameInput.addEventListener('input', updateSettings);
  eventDateInput.addEventListener('change', updateSettings);
  eventTimeInput.addEventListener('change', updateSettings);
  timeZoneSelect.addEventListener('change', updateSettings);
  showWeeksCheckbox.addEventListener('change', updateSettings);
  showDaysCheckbox.addEventListener('change', updateSettings);
  showHoursCheckbox.addEventListener('change', updateSettings);
  showMinutesCheckbox.addEventListener('change', updateSettings);
  showSecondsCheckbox.addEventListener('change', updateSettings);
  showMillisecondsCheckbox.addEventListener('change', updateSettings);
  darkModeCheckbox.addEventListener('change', () => {
    darkMode = darkModeCheckbox.checked;
    document.body.classList.toggle('dark', darkMode);
  });

  // Populate timezone options
  const timeZones = [
    { offset: -720, name: 'UTC-12:00' },
    { offset: -660, name: 'UTC-11:00' },
    // Add more timezone options here if needed
  ];

  timeZones.forEach(timeZone => {
    const option = document.createElement('option');
    option.value = timeZone.offset;
    option.textContent = timeZone.name;
    timeZoneSelect.appendChild(option);
  });

  // Call the updateSettings and updateCountdown functions initially to set up the initial state
  updateSettings();
  updateCountdown();
});
