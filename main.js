window.onload = () => {
  const inputNumber = document.querySelector("#inputNumber");
  const inputTitle = document.querySelector("#inputTitle");
  const inputDate = document.querySelector("#inputDate");
  const inputDescription = document.querySelector("#inputDescription");
  const inputResult = document.querySelector("#inputResult");

  const patientSelect = document.querySelector("#patientSelect");
  const patientEntry = document.querySelector("#patientEntry");
  const researchEntry = document.querySelector("#researchEntry");

  patientSelect.addEventListener("change", (event) => onSelectChange(event));

  fetchPatientData();

  function choosePatient(patients) {
    console.log(patients);

    for (let i = 0; i < patients.length; i++) {
      let optionElement = document.createElement("option");
      optionElement.textContent = patients[i].fullName;
      optionElement.value = patients[i].snils;

      patientSelect.appendChild(optionElement);
    }
  }

  function onSelectChange(event) {
    console.log(event.target.value);
    const currentSnils = event.target.value;

    fetch("patients.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const filteredPatient = data.patients.find(
          (patient) => patient.snils === currentSnils
        );
        renderPatientData(filteredPatient);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }

  function renderPatientData(data) {
    const { fullName, cardNumber, snils, address, registrationResidence, phoneNumber, research, } = data;

    patientEntry.innerHTML = ` <td>${fullName}</td>
                               <td>${cardNumber}</td>
                               <td>${snils}</td>
                               <td>${address}</td>
                               <td>${registrationResidence}</td>
                               <td>${phoneNumber}</td>`;

    let researchEntries = "";

    for (let i = 0; i < research.length; i++) {
      const { id, name, date, description, doctor, result } = research[i];
      researchEntries += `<tbody><td>${id}</td>
                            <td>${name}</td>
                            <td>${date}</td>
                            <td>${description}</td>
                            <td>${doctor}</td>
                            <td>${result}</td></tbody>`;
    }
    researchEntry.innerHTML = "";
    researchEntry.innerHTML += `<table><tr id="headerRow">
                                <th>Номер</th>
                                <th>Исследование</th>
                                <th>Дата</th>
                                <th>Описание</th>
                                <th>Врач</th>
                                <th>Результат</th>
                                </tr>` + researchEntries;
  }

  function fetchPatientData() {
    fetch("patients.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        renderPatientData(data.patients[0]);
        choosePatient(data.patients);
        return data;
      })
      .catch(function (error) {
        console.warn(error);
      });
  }
};
