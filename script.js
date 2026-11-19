const cover = document.getElementById("cover");
const mainContent = document.getElementById("mainContent");
const audio = document.getElementById("weddingAudio");
const musicToggle = document.getElementById("musicToggle");

document.body.classList.add("locked");

document.getElementById("openInvitation").addEventListener("click", async () => {
  cover.classList.add("closed");
  mainContent.classList.remove("is-locked");
  mainContent.classList.add("unlocked");
  document.body.classList.remove("locked");
  musicToggle.hidden = false;
  try {
    await audio.play();
    musicToggle.classList.add("playing");
    musicToggle.textContent = "♫";
  } catch (error) {
    musicToggle.textContent = "▶";
  }
  setTimeout(() => cover.remove(), 900);
});

musicToggle.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicToggle.classList.add("playing");
      musicToggle.textContent = "♫";
    } catch (error) {
      musicToggle.textContent = "▶";
    }
  } else {
    audio.pause();
    musicToggle.classList.remove("playing");
    musicToggle.textContent = "▶";
  }
});

// Countdown uses local Indonesian device time: 21 April 2027, pukul 08.00 WIB.
const weddingDate = new Date(2027, 3, 21, 8, 0, 0).getTime();
function updateCountdown() {
  const distance = weddingDate - Date.now();
  if (distance <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });
    return;
  }
  const values = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000)
  };
  Object.entries(values).forEach(([id, value]) => {
    document.getElementById(id).textContent = String(value).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Reveal-on-scroll animation.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Gentle parallax for the hero image.
const heroPhoto = document.querySelector(".hero-photo");
window.addEventListener("scroll", () => {
  if (heroPhoto && window.scrollY < window.innerHeight * 1.2) {
    heroPhoto.style.transform = `translateY(${window.scrollY * 0.16}px) scale(1.04)`;
  }
}, { passive: true });

// Safe image fallback if a Google Drive image is unavailable.
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("error", () => {
    img.style.visibility = "hidden";
    img.parentElement.classList.add("image-unavailable");
  }, { once: true });
});

// Copy bank account number.
document.getElementById("copyAccount").addEventListener("click", async () => {
  const number = document.getElementById("accountNumber").textContent.trim();
  const feedback = document.getElementById("copyFeedback");
  try {
    await navigator.clipboard.writeText(number);
    feedback.textContent = "Nomor rekening berhasil disalin.";
  } catch {
    const temp = document.createElement("textarea");
    temp.value = number;
    document.body.appendChild(temp);
    temp.select();
    const copied = document.execCommand("copy");
    temp.remove();
    feedback.textContent = copied ? "Nomor rekening berhasil disalin." : "Salin manual: " + number;
  }
});

// RSVP demo: stored in this browser only. Connect a backend to collect across devices.
document.getElementById("rsvpForm").addEventListener("submit", event => {
  event.preventDefault();
  const entry = {
    name: document.getElementById("guestName").value.trim(),
    count: document.getElementById("guestCount").value,
    attendance: document.getElementById("attendance").value,
    createdAt: new Date().toISOString()
  };
  const entries = JSON.parse(localStorage.getItem("yanaNurulRsvp") || "[]");
  entries.push(entry);
  localStorage.setItem("yanaNurulRsvp", JSON.stringify(entries));
  document.getElementById("rsvpFeedback").textContent =
    `Terima kasih, ${entry.name}. Konfirmasi (${entry.attendance}) tersimpan di perangkat ini.`;
  event.target.reset();
});

// Guestbook demo: localStorage. For shared public guestbook, connect Firebase / Apps Script.
const wishForm = document.getElementById("wishForm");
const wishList = document.getElementById("wishList");
function loadWishes() {
  const wishes = JSON.parse(localStorage.getItem("yanaNurulWishes") || "[]");
  wishList.replaceChildren();
  wishes.slice().reverse().forEach(wish => {
    const article = document.createElement("article");
    article.className = "wish-item";
    const name = document.createElement("strong");
    name.textContent = wish.name;
    const message = document.createElement("p");
    message.textContent = wish.message;
    article.append(name, message);
    wishList.appendChild(article);
  });
}
wishForm.addEventListener("submit", event => {
  event.preventDefault();
  const wish = {
    name: document.getElementById("wishName").value.trim(),
    message: document.getElementById("wishMessage").value.trim()
  };
  if (!wish.name || !wish.message) return;
  const wishes = JSON.parse(localStorage.getItem("yanaNurulWishes") || "[]");
  wishes.push(wish);
  localStorage.setItem("yanaNurulWishes", JSON.stringify(wishes));
  document.getElementById("wishFeedback").textContent = "Terima kasih atas doa dan ucapannya.";
  wishForm.reset();
  loadWishes();
});
loadWishes();

// Gallery lightbox.
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
document.querySelectorAll(".gallery-item").forEach(button => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.full;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});
function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImage.removeAttribute("src");
  document.body.style.overflow = "";
}
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeLightbox();
});
