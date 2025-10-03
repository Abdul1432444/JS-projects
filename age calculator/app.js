function calculateAge() {
  const dobInput = document.getElementById("dob");
  const errorMsg = document.getElementById("error");
  const ageCard = document.getElementById("ageCard");
  const yearsEl = document.querySelector(".years");
  const monthsEl = document.querySelector(".months");
  const daysEl = document.querySelector(".days");

  errorMsg.textContent = "";

  if (!dobInput.value) {
    errorMsg.textContent = "Please select your date of birth!";
    ageCard.classList.add("hidden");
    return;
  }

  const dob = new Date(dobInput.value);
  const today = new Date();

  if (dob > today) {
    errorMsg.textContent = "Date of birth cannot be in the future!";
    ageCard.classList.add("hidden");
    return;
  }

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    let prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  yearsEl.textContent = years;
  monthsEl.textContent = months;
  daysEl.textContent = days;

  ageCard.classList.remove("hidden");
}

function resetAge() {
  document.getElementById("dob").value = "";
  document.getElementById("error").textContent = "";
  document.getElementById("ageCard").classList.add("hidden");
}
