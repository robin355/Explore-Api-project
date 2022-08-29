const loadPhone = (search) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data));

}
const displayPhone = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    phones = phones.slice(0, 20);
    const noFound = document.getElementById('no-found');
    if (phones.length === 0) {
        noFound.classList.remove('d-none')
    }
    else {
        noFound.classList.add('d-none')
    }

    phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
        </div>
    </div>
        `;
        phonesContainer.appendChild(div);

    });
    loading(false)
}
document.getElementById('search-btn').addEventListener('click', function () {
    // start loader
    loading(true)
    const inputText = document.getElementById('input-fielt');
    const searchInput = inputText.value;
    loadPhone(searchInput);
    inputText.value = '';
})
// loader call
const loading = isloading => {
    const loader = document.getElementById('loader');
    if (isloading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}
