let formCounter = 0;

document.getElementById("startNewButton").addEventListener("click", addNewForm);
document.getElementById("calculateTotalAgeButton").addEventListener("click", calculateTotalAge);
document.getElementById("calculateAverageAgeButton").addEventListener("click", calculateAverageAge);
document.getElementById("findMinAgeButton").addEventListener("click", findMinAgePerson);
document.getElementById("findMaxAgeButton").addEventListener("click", findMaxAgePerson);

function generateRandomNumber() {
    return Math.floor(Math.random() * 9) + 1; //random number 1-9
}

function addNewForm() {
    const formContainer = document.getElementById("formContainer");
    formContainer.innerHTML = '';

    const numberOfForms = generateRandomNumber();

    for (let i = 0; i < numberOfForms; i++) {
        const form = document.createElement("form");
        form.id = "form" + (i + 1);

        form.innerHTML = `
            <h2>เพื่อนคนที่ ${i + 1}</h2>
            <label for="name${i}">ชื่อ:</label>
            <input type="text" id="name${i}" name="name${i}" required><br><br>
            
            <label for="age${i}">อายุ:</label>
            <input type="number" id="age${i}" name="age${i}" min="1" max="150" required><br><br>
        `;

        formContainer.appendChild(form);
        formCounter++;
    }
}

function isFormValid(age, name) {
    return !isNaN(age) && name.trim() !== '';
}

function checkFormsCompletion() {
    for (let i = 0; i < formCounter; i++) {
        const ageInput = document.getElementById("age" + i);
        const nameInput = document.getElementById("name" + i);

        if (ageInput && nameInput) {
            const age = parseInt(ageInput.value);
            const name = nameInput.value;

            if (!isFormValid(age, name)) {
                return false;
            }
        }
    }
    return true;
}

function calculateTotalAge() {
    const allFormsCompleted = checkFormsCompletion();
    if (!allFormsCompleted) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วนในทุกฟอร์ม");
        return;
    }

    let totalAge = 0;

    for (let i = 0; i < formCounter; i++) {
        const ageInput = document.getElementById("age" + i);

        if (ageInput) {
            const age = parseInt(ageInput.value);
            totalAge += age;
        }
    }

    displayResult("อายุรวม", totalAge);
    return totalAge;
}

function calculateAverageAge() {
    const allFormsCompleted = checkFormsCompletion();
    if (!allFormsCompleted) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วนในทุกฟอร์ม");
        return;
    }

    let totalAge = calculateTotalAge();
    const numberOfPeople = formCounter;

    const averageAge = totalAge / numberOfPeople;
    displayResult("อายุเฉลี่ย", averageAge);
}

function findMinAgePerson() {
    const allFormsCompleted = checkFormsCompletion();
    if (!allFormsCompleted) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วนในทุกฟอร์ม");
        return;
    }

    let minAge = Infinity;
    let minNames = [];

    for (let i = 0; i < formCounter; i++) {
        const ageInput = document.getElementById("age" + i);
        const nameInput = document.getElementById("name" + i);

        if (ageInput && nameInput) {
            const age = parseInt(ageInput.value);
            const name = nameInput.value;

            if (age < minAge) {
                minAge = age;
                minNames = [name];
            } else if (age === minAge) {
                minNames.push(name);
            }
        }
    }

    displayResult("ชื่อคนที่มีอายุน้อยที่สุด", minNames.join(", ") + ", อายุ " + minAge + " ปี");
}

function findMaxAgePerson() {
    const allFormsCompleted = checkFormsCompletion();
    if (!allFormsCompleted) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วนในทุกฟอร์ม");
        return;
    }

    let maxAge = -Infinity;
    let maxNames = [];

    for (let i = 0; i < formCounter; i++) {
        const ageInput = document.getElementById("age" + i);
        const nameInput = document.getElementById("name" + i);

        if (ageInput && nameInput) {
            const age = parseInt(ageInput.value);
            const name = nameInput.value;

            if (age > maxAge) {
                maxAge = age;
                maxNames = [name];
            } else if (age === maxAge) {
                maxNames.push(name);
            }
        }
    }

    displayResult("ชื่อคนที่มีอายุมากที่สุด", maxNames.join(", ") + ", อายุ " + maxAge + " ปี");
}

function displayResult(label, value) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<h2>${label}</h2><p>${value}</p>`;
}
