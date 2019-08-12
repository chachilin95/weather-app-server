const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // reset messages
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const address = search.value;
    fetch(`http://localhost:42069/weather?address=${address}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                // set messages
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecastData;
            }
        });
    });

    search.value = '';
});
