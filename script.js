document.addEventListener('DOMContentLoaded', () => {
  const countdown = document.querySelector('.countdown');
  const settingsBtn = document.getElementById('settings-btn');
  const settings = document.getElementById('settings');
  const eventNameInput = document.getElementById('eventName');
  const eventDateInput = document.getElementById('eventDate');
  const eventTimeInput = document.getElementById('eventTime');
  const timeZoneInput = document.getElementById('timeZone');
  const showYearsCheckbox = document.getElementById('showYears');
  const showMonthsCheckbox = document.getElementById('showMonths');
  const showWeeksCheckbox = document.getElementById('showWeeks');
  const showDaysCheckbox = document.getElementById('showDays');
  const showHoursCheckbox = document.getElementById('showHours');
  const showMinutesCheckbox = document.getElementById('showMinutes');
  const showSecondsCheckbox = document.getElementById('showSeconds');
  const showMillisecondsCheckbox = document.getElementById('showMilliseconds');

  let eventDate = new Date('2023-08-22T08:30:00');
  let timeZoneOffset = Number(timeZoneInput.value) * 60 * 1000;
  let showYears = false;
  let showMonths = false;
  let showWeeks = false;
  let showDays = true;
  let showHours = true;
  let showMinutes = true;
  let showSeconds = true;
  let showMilliseconds = true;

  function getDaysBetween(startDate, endDate) {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    let days = 0;

    for (let year = startYear; year < endYear; year++) {
      days += isLeapYear(year) ? 366 : 365;
    }

    for (let month = 0; month <= endMonth; month++) {
      if (month === startMonth && startYear === endYear) {
        days += endDate.getDate() - startDate.getDate();
      } else {
        const lastDayOfMonth = new Date(endYear, month + 1, 0).getDate();
        days += lastDayOfMonth;
      }
    }

    return days;
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  function updateCountdown() {
    const now = new Date();
    let timeDifference = eventDate - now + timeZoneOffset; // Adjust the timezone offset

    if (timeDifference <= 0) {
      countdown.textContent = 'The event has already passed!';
      return;
    }

    const years = Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000));
    timeDifference %= 365 * 24 * 60 * 60 * 1000;

    // Calculate the number of days precisely
    const preciseDays = getDaysBetween(now, now.getTime() + timeDifference);

    // Continue with the previous calculations
    let months = 0;
    let days = preciseDays;

    if (!showYears) {
      months += years * 12;
      days -= getDaysBetween(now, now.setFullYear(now.getFullYear() + years));
    }

    if (!showMonths) {
      const newDate = new Date(now.getTime());
      newDate.setMonth(newDate.getMonth() + months);
      days -= getDaysBetween(now, newDate);
      months = 0; // Reset months to 0 since it's not being shown
    }

    const weeks = Math.floor(days / 7);
    days %= 7;

    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    timeDifference %= 60 * 60 * 1000;
    const minutes = Math.floor(timeDifference / (60 * 1000));
    timeDifference %= 60 * 1000;
    const seconds = Math.floor(timeDifference / 1000);
    const milliseconds = timeDifference;

    let countdownText = '';
    if (showYears && years > 0) countdownText += `${years}y `;
    if (showMonths && months > 0) countdownText += `${months}mo `;
    if (showWeeks && weeks > 0) countdownText += `${weeks}w `;
    if (showDays && days > 0) countdownText += `${days}d `;
    if (showHours && hours > 0) countdownText += `${hours}h `;
    if (showMinutes && minutes > 0) countdownText += `${minutes}m `;
    if (showSeconds && seconds > 0) countdownText += `${seconds}s `;
    if (showMilliseconds && milliseconds > 0) countdownText += `${milliseconds}ms`;

    countdown.textContent = countdownText.trim();
  }

  function initializeSettings() {
    eventNameInput.value = 'school';
    eventDateInput.valueAsDate = new Date('2023-08-22');
    eventTimeInput.value = '08:30';
    timeZoneInput.value = timeZoneOffset / (60 * 1000);
    showYearsCheckbox.checked = showYears;
    showMonthsCheckbox.checked = showMonths;
    showWeeksCheckbox.checked = showWeeks;
    showDaysCheckbox.checked = showDays;
    showHoursCheckbox.checked = showHours;
    showMinutesCheckbox.checked = showMinutes;
    showSecondsCheckbox.checked = showSeconds;
    showMillisecondsCheckbox.checked = showMilliseconds;

    // Update the countdown with the initial settings
    updateCountdown();
  }

  function toggleSettings() {
    settings.style.display = settings.style.display === 'block' ? 'none' : 'block';
    if (settings.style.display === 'block') {
      updateSettings();
    } else {
      updateCountdown();
    }
  }

  function updateSettings() {
    eventDate = new Date(`${eventDateInput.value}T${eventTimeInput.value}`);
    timeZoneOffset = Number(timeZoneInput.value) * 60 * 1000;
    showYears = showYearsCheckbox.checked;
    showMonths = showMonthsCheckbox.checked;
    showWeeks = showWeeksCheckbox.checked;
    showDays = showDaysCheckbox.checked;
    showHours = showHoursCheckbox.checked;
    showMinutes = showMinutesCheckbox.checked;
    showSeconds = showSecondsCheckbox.checked;
    showMilliseconds = showMillisecondsCheckbox.checked;

    updateCountdown();
  }

  settingsBtn.addEventListener('click', toggleSettings);

  // Call the initializeSettings function initially to set the settings' input values
  initializeSettings();

  // Add event listeners to each setting's input element to update the countdown when any setting is changed
  eventNameInput.addEventListener('change', updateSettings);
  eventDateInput.addEventListener('change', updateSettings);
  eventTimeInput.addEventListener('change', updateSettings);
  timeZoneInput.addEventListener('change', updateSettings);
  showYearsCheckbox.addEventListener('change', updateSettings);
  showMonthsCheckbox.addEventListener('change', updateSettings);
  showWeeksCheckbox.addEventListener('change', updateSettings);
  showDaysCheckbox.addEventListener('change', updateSettings);
  showHoursCheckbox.addEventListener('change', updateSettings);
  showMinutesCheckbox.addEventListener('change', updateSettings);
  showSecondsCheckbox.addEventListener('change', updateSettings);
  showMillisecondsCheckbox.addEventListener('change', updateSettings);

  // Update the countdown initially
  updateCountdown();

  // Update the countdown every 10 milliseconds
  setInterval(updateCountdown, 10);
});
