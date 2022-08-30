const loadPhone = (search, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data, datalimit));

}
const displayPhone = (phones, datalimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    //phone length 10 more
    const more = document.getElementById('show-all');
    if (datalimit && phones.length > 12) {
        phones = phones.slice(0, 12);
        more.classList.remove('d-none')
    }
    else {
        more.classList.add('d-none')
    }
    //display no found Phones
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
                <button onclick="phoneDetaile('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetail">Show Detaile</button>
        </div>
    </div>
        `;
        phonesContainer.appendChild(div);

    });
    togoleSpinner(false)
}
const procesSearch = (datalimit) => {
    togoleSpinner(true)
    const inputText = document.getElementById('input-fielt');
    const searchInput = inputText.value;
    loadPhone(searchInput, datalimit);
}
// Enter Key
document.getElementById('input-fielt').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        procesSearch(12);
    }
});

document.getElementById('search-btn').addEventListener('click', function () {
    // start loader
    procesSearch(12);
})
// loader call
const togoleSpinner = isloading => {
    const loader = document.getElementById('loader');
    if (isloading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}
//show all phones
document.getElementById('btn-show-all').addEventListener('click', function () {
    procesSearch();

})
//phone detail
const phoneDetaile = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhonedetaile(data.data))
}
const displayPhonedetaile = phone => {
    console.log(phone)
    const phoneDetaleId = document.getElementById('phoneDetailLabel');
    phoneDetaleId.innerText = phone.name;
    const phonesDetails = document.getElementById('phone-details');
    phonesDetails.innerHTML = `
    <p>ReleaseDate: ${phone.releaseDate ? phone.releaseDate : "No found"}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : "No found"}</p>
    <p>DisplaySize: ${phone.mainFeatures ? phone.mainFeatures.displaySize : "No found"}</p>
    <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : "No found"}</p>
    <p>Bluetooth : ${phone.others ? phone.others.Bluetooth : "No found"}</p>
    `
}
