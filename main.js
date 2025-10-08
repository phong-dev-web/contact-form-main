// Select all item
const checkboxItem = document.querySelectorAll('.checkbox-item');
const error = document.querySelectorAll('.content span');
const btnSubmit = document.querySelector('#submit-btn');
const nameInput = document.querySelectorAll('.name input');
const emallInput = document.querySelector('#email');
const checkbox = document.querySelectorAll('.check-box input');
const messageInput = document.querySelector('#message');
const consentInput = document.querySelector('#consent');
const messageSent = document.querySelector('.message-sent')


// Add event listeners to each checkbox item
checkboxItem.forEach((item, index) => {
    item.addEventListener('click', () => {
        item.style.backgroundColor = '#b5f0c2ff';
        checkbox[index].checked = true;
        checkbox.forEach((box, i) => {
            if (index !== i) {
                box.checked = false;
                checkboxItem[i].style.backgroundColor = 'white';
            }
        });
    });
});

//error and submit
btnSubmit.addEventListener('click', (e) => {
    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;

    //name validation
    nameInput.forEach((input, index) => {
        if (input.value === '') {
            error[index].style.visibility = 'visible';
        } else {
            error[index].style.visibility = 'hidden';
            a = 1;
        }
    });
    //email validation
    if (emallInput.value === '') {
        error[2].style.visibility = 'visible';
    }else {
        if (!emallInput.value.includes('@') || !emallInput.value.includes('.')) {
            error[2].style.visibility = 'visible';
        } else {
            error[2].style.visibility = 'hidden';
            b=1
        }
    }
    //message validation
    if (messageInput.value === '') {
        error[3].style.visibility = 'visible';
    } else {
        error[3].style.visibility = 'hidden';
    }
    //checkbox validation
    checkbox.forEach((box, index) => {
        if (checkbox[0].checked === false && checkbox[1].checked === false) {
            error[3].style.visibility = 'visible';
        } else {
            error[3].style.visibility = 'hidden';
            c=1
        }
    });
    //consent validation
    if (!consentInput.checked) {
        error[4].style.visibility = 'visible';
    } else {
        error[4].style.visibility = 'hidden';
        d=1
    }

    // sent
    if (a+b+c+d == 4) {
        messageSent.style.display = 'flex';
    }else{
        messageSent.style.display = 'none';
    }
    // get and give data
    const lastName = document.querySelector('#last-name')
    const firstName = document.querySelector('#first-name')
    const data = {
        name: lastName.value.trim() + ' ' + firstName.value.trim(),
        email: emallInput.value.trim(),
        message: messageInput.value.trim()
    };
    fetch("http://localhost:3000/contact", {
        method: "POST",                          // dùng POST
        headers: {
            "Content-Type": "application/json"     // báo cho backend biết đây là JSON
        },
        body: JSON.stringify(data)               // chuyển object JS thành chuỗi JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Lỗi server: " + response.status);
            }
            return response.json();                // parse JSON backend trả về
        })
        .then(result => {
            console.log("Server trả về:", result);
            alert("Gửi thành công!");
        })
        .catch(error => {
            console.error("Có lỗi:", error);
            alert("Không gửi được, thử lại sau!");
        });
        
    e.preventDefault()        
});

