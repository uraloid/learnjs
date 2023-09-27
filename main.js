window.onload = () => {
  const inputNumber = document.querySelector("#inputNumber");
  const inputTitle = document.querySelector("#inputTitle");
  const inputDate = document.querySelector("#inputDate");
  const inputDescription = document.querySelector("#inputDescription");
  const inputResult = document.querySelector("#inputResult");

  fetchPatientData()

  function renderPatientData(data) {
    console.log(data)
  }

  function fetchPatientData() {
    fetch( 'patients.json' )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        renderPatientData(data);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }

};
