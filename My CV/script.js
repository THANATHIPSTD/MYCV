document.addEventListener("DOMContentLoaded", () => {
  // Inject CSS for transitions and additional styling for .section-card
  const style = document.createElement("style");
  style.textContent = `
    .section-card {
      transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    }
    .section-card.active {
      box-shadow: 0 5px 9px rgba(0, 0, 0, 0.3);
    }
  `;
  document.head.appendChild(style);

  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const portfolioCarouselEl = document.getElementById("portfolioCarousel");
  let portfolioCarouselInstance = null;
  if (portfolioCarouselEl) {
    portfolioCarouselInstance = new bootstrap.Carousel(portfolioCarouselEl, {
      interval: 3000,
      wrap: true,
      pause: "hover"
    });
    portfolioCarouselEl.setAttribute("tabindex", "0");
    portfolioCarouselEl.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        portfolioCarouselInstance.prev();
      } else if (e.key === "ArrowRight") {
        portfolioCarouselInstance.next();
      }
    });
  }

  const sectionCards = document.querySelectorAll(".section-card");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sectionCards.forEach(card => {
    // Set initial state for animation
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    observer.observe(card);


    card.addEventListener("mouseenter", () => {
      card.style.transform = "scale(1.015) translateY(0)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1) translateY(0)";
    });

    card.addEventListener("click", () => {
      card.classList.toggle("active");
    });
  });

  // Back-to-Top Button functionality
  const backToTopButton = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
