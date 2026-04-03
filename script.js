const container = document.getElementById("container");
const loader = document.getElementById("loader");

let loading = false;

async function fetchRandomItem() {
  const type = Math.floor(Math.random() * 3);

  if (type === 0) {
    // Product (FakeStore API)
    const res = await fetch(
      "https://fakestoreapi.com/products/" +
        (Math.floor(Math.random() * 20) + 1)
    );
    const data = await res.json();

    return `
          <div class="card">
            <img src="${data.image}" />
            <h2>${data.title}</h2>
            <p class="price">$${data.price}</p>
          </div>
        `;
  }

  if (type === 1) {
    // Quote
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();

    return `
          <div class="card">
            <img src="https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg" />
            <p class="quote">"${data.content}"</p>
            <p class="author">- ${data.author}</p>
          </div>
        `;
  }

  // Fact
  const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
  const data = await res.json();

  return `
        <div class="card">
          <img src="https://picsum.photos/800/400?random=${Math.random()}" />
          <p>${data.text}</p>
        </div>
      `;
}

async function loadItems(count = 5) {
  if (loading) return;
  loading = true;
  loader.style.display = "block";

  for (let i = 0; i < count; i++) {
    try {
      const html = await fetchRandomItem();
      container.insertAdjacentHTML("beforeend", html);
    } catch (e) {
      console.error(e);
    }
  }

  loading = false;
  loader.style.display = "none";
}

function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    loadItems();
  }
}

window.addEventListener("scroll", handleScroll);

// Initial load
loadItems(8);
