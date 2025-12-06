
// Always wait for DOM ready
document.addEventListener("DOMContentLoaded", () => {


    // 1) OFFERS SLIDER (works even if buttons/wrapper missing)

  (function initOffersSlider() {
    const offersSection = document.getElementById("offers");
    if (!offersSection) return;

    let offersItems = offersSection.querySelector(".offers-items");
    if (!offersItems) return;

    // If there's no wrapper, create one (keeps HTML untouched visually)
    let wrapper = offersSection.querySelector(".offers-items-wrapper");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.className = "offers-items-wrapper";

      // move offersItems into wrapper
      offersItems.parentNode.insertBefore(wrapper, offersItems);
      wrapper.appendChild(offersItems);
    }

    // Ensure each child (.offer-item) has proper class if not present
    Array.from(offersItems.children).forEach(child => {
      if (!child.classList.contains("offer-item")) child.classList.add("offer-item");
    });

    // Create prev/next buttons if missing
    let prevBtn = offersSection.querySelector(".prev");
    let nextBtn = offersSection.querySelector(".next");
    if (!prevBtn) {
      prevBtn = document.createElement("button");
      prevBtn.className = "prev";
      prevBtn.innerHTML = "&#10094;";
      offersSection.appendChild(prevBtn);
    }
    if (!nextBtn) {
      nextBtn = document.createElement("button");
      nextBtn.className = "next";
      nextBtn.innerHTML = "&#10095;";
      offersSection.appendChild(nextBtn);
    }

    // slider logic
    let index = 0;
    const total = offersItems.children.length;

    // set CSS to allow sliding (in case CSS missing)
    offersItems.style.display = "flex";
    offersItems.style.transition = "transform 0.5s ease-in-out";
    Array.from(offersItems.children).forEach(item => { item.style.minWidth = "100%"; boxSizingSafe(item); });

    function boxSizingSafe(el) {
      if (!el.style.boxSizing) el.style.boxSizing = "border-box";
    }

    function slide(to) {
      if (total === 0) return;
      index = (index + to + total) % total;
      offersItems.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener("click", () => slide(1));
    prevBtn.addEventListener("click", () => slide(-1));

    // Auto slide (safe: only if more than 1)
    if (total > 1) {
      setInterval(() => slide(1), 5000);
    }
  })();



    // 2) MENU SECTION (build from array, replace the two columns)

  (function initMenuSection() {
    const menuItems = [
      { name: "LASAL CHEESE", price: "$18.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "img/food1.png" },
      { name: "JUMBO CRAB SHRIMP", price: "$24.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "img/food2.png" },
      { name: "KOKTAIL JUICE", price: "$12.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "img/food3.png" },
      { name: "CAPO STEAK", price: "$60.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "img/food4.png" },
      { name: "ORGANIC FRUIT SALAD", price: "$8.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "img/food5.png" },
      { name: "CHEESE PIZZA", price: "$18.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "img/food6.png" },
      { name: "KOFTA MEAT", price: "$40.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "img/food7.jpeg" },
      { name: "SPANISH PIES", price: "$14.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "img/food8.jpeg" },
      { name: "CHEESE TOST", price: "$6.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "img/food9.jpeg" },
      { name: "FRUIT SALAD", price: "$14.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "img/food10.jpeg" },
      { name: "CHICKEN SHAWARMA", price: "$20.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "img/food11.jpeg" },
      { name: "MEGA CHEESE PIZZA", price: "$30.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "img/food12.jpeg" }
    ];

    const menuSection = document.getElementById("menu");
    if (!menuSection) return;

    const leftCol = menuSection.querySelector(".menu-items-left");
    const rightCol = menuSection.querySelector(".menu-items-right");

    if (!leftCol || !rightCol) return;

    // Clear existing contents (we'll rebuild with JS)
    leftCol.innerHTML = "";
    rightCol.innerHTML = "";

    // Build first 6 in left, next 6 in right (or split evenly)
    for (let i = 0; i < menuItems.length; i++) {
      const item = menuItems[i];
      const wrapper = document.createElement("div");
      wrapper.className = "menu-item";

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;

      const info = document.createElement("div");
      const h3 = document.createElement("h3");
      h3.innerHTML = `${item.name}<span>${item.price}</span>`;

      const p = document.createElement("p");
      p.textContent = item.description;

      info.appendChild(h3);
      info.appendChild(p);
      wrapper.appendChild(img);
      wrapper.appendChild(info);

      if (i < 6) leftCol.appendChild(wrapper);
      else rightCol.appendChild(wrapper);
    }
  })();



    // 3) GALLERY POPUP (creates popup elements if missing)
  (function initGalleryPopup() {
    const gallery = document.getElementById("gallery");
    if (!gallery) return;

    const images = gallery.querySelectorAll(".img-gallery img");
    if (!images || images.length === 0) return;

    // If popup container not present, create it
    let boxContainer = document.getElementById("boxContainer");
    let boxItem = document.getElementById("boxItem");
    if (!boxContainer) {
      boxContainer = document.createElement("div");
      boxContainer.id = "boxContainer";

      boxItem = document.createElement("div");
      boxItem.id = "boxItem";

      // prev, close, next icons (fontawesome classes are in your HTML head)
      const prevI = document.createElement("i");
      prevI.id = "prev";
      prevI.className = "fa-solid fa-circle-left fa-2x";

      const closeI = document.createElement("i");
      closeI.id = "close";
      closeI.className = "fa-solid fa-circle-xmark fa-2x";

      const nextI = document.createElement("i");
      nextI.id = "next";
      nextI.className = "fa-solid fa-circle-right fa-2x";

      boxItem.appendChild(prevI);
      boxItem.appendChild(closeI);
      boxItem.appendChild(nextI);
      boxContainer.appendChild(boxItem);
      document.body.appendChild(boxContainer);

      // minimal styles in case CSS missing (keeps behavior)
      boxContainer.style.display = "none";
      boxContainer.style.justifyContent = "center";
      boxContainer.style.alignItems = "center";
      boxContainer.style.position = "fixed";
      boxContainer.style.top = "0";
      boxContainer.style.left = "0";
      boxContainer.style.width = "100%";
      boxContainer.style.height = "100%";
      boxContainer.style.background = "rgba(0,0,0,0.85)";
      boxContainer.style.zIndex = "999";

      boxItem.style.width = "70%";
      boxItem.style.height = "70%";
      boxItem.style.backgroundSize = "cover";
      boxItem.style.backgroundPosition = "center";
      boxItem.style.borderRadius = "10px";
      boxItem.style.position = "relative";
    }

    const imagesArr = Array.from(images);
    let currentIndex = 0;

    function showImage(index) {
      if (!boxItem) return;
      boxItem.style.backgroundImage = `url("${imagesArr[index].src}")`;
    }

    imagesArr.forEach((imgEl, idx) => {
      imgEl.style.cursor = "pointer";
      imgEl.addEventListener("click", () => {
        boxContainer.style.display = "flex";
        currentIndex = idx;
        showImage(currentIndex);
      });
    });

    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const closeBtn = document.getElementById("close");

    if (closeBtn) closeBtn.addEventListener("click", () => boxContainer.style.display = "none");
    if (nextBtn) nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % imagesArr.length;
      showImage(currentIndex);
    });
    if (prevBtn) prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + imagesArr.length) % imagesArr.length;
      showImage(currentIndex);
    });

    // close by clicking outside
    boxContainer.addEventListener("click", (e) => {
      if (e.target === boxContainer) boxContainer.style.display = "none";
    });

  })();



    // 4) FORM VALIDATION (adds error containers if missing)
  (function initFormValidation() {
    // find the form inside #contact
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    // The user's HTML uses a form with action (no id). Grab it:
    const form = contactSection.querySelector("form");
    if (!form) return;

    // ensure it has id for later reference
    if (!form.id) form.id = "contactForm";

    // ensure error containers exist; create if not
    function ensureErrorEl(afterEl, id) {
      let el = document.getElementById(id);
      if (!el) {
        el = document.createElement("div");
        el.id = id;
        el.style.color = "red";
        afterEl.insertAdjacentElement("afterend", el);
      }
      return el;
    }

    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const subjectInput = form.querySelector("#subject");
    const messageInput = form.querySelector("#message");

    if (!nameInput || !emailInput || !subjectInput || !messageInput) {
      // missing inputs — just stop
      return;
    }

    const nameError = ensureErrorEl(nameInput, "name-error");
    const emailError = ensureErrorEl(emailInput, "email-error");
    const subjectError = ensureErrorEl(subjectInput, "subject-error");
    const messageError = ensureErrorEl(messageInput, "message-error");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // trim values
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      // clear errors
      nameError.textContent = "";
      emailError.textContent = "";
      subjectError.textContent = "";
      messageError.textContent = "";

      let valid = true;

      if (name === "") {
        nameError.textContent = "Please enter your name.";
        valid = false;
      } else if (name.length < 3 || name.length > 15) {
        nameError.textContent = "Name must be 3–15 characters.";
        valid = false;
      }

      if (email === "") {
        emailError.textContent = "Please enter your email.";
        valid = false;
      } else {
        // simple email regex check
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(email)) {
          emailError.textContent = "Enter a valid email address.";
          valid = false;
        }
      }

      if (subject !== "" && subject.length < 3) {
        subjectError.textContent = "Subject must be at least 3 characters.";
        valid = false;
      }

      if (message !== "" && message.length < 5) {
        messageError.textContent = "Message must be at least 5 characters.";
        valid = false;
      }

      if (valid) {
        // If you want to actually submit to the form action, uncomment next line:
        // form.submit();

        // For now show success and reset form
        alert("Form submitted successfully!");
        form.reset();
      }
    });
  })();

}); // DOMContentLoaded end
