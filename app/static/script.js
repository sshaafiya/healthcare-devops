document.addEventListener("DOMContentLoaded", () => {
  const appointmentForm = document.getElementById("appointmentForm");
  const contactForm = document.getElementById("contactForm");

  if (appointmentForm) {
    appointmentForm.addEventListener("submit", e => {
      e.preventDefault();
      document.getElementById("message").textContent = "✅ Appointment booked successfully!";
      appointmentForm.reset();
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("📨 Message sent successfully!");
      contactForm.reset();
    });
  }
});
