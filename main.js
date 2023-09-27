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
    patientEntry.innerHTML = `<td>${data.fullName}</td>
                               <td>${data.cardNumber}</td>
                               <td>${data.snils}</td>
                               <td>${data.address}</td>
                               <td>${data.registrationResidence}</td>
                               <td>${data.phoneNumber}</td>`;

    const research = data.research[0];
    researchEntry.innerHTML = `<td>${research.id}</td>
                               <td>${research.name}</td>
                               <td>${research.date}</td>
                               <td>${research.description}</td>
                               <td>${research.doctor}<td>
                               <td>${research.result}<td>`;
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
