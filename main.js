window.onload = () => {
  const inputNumber = document.querySelector("#inputNumber");
  const inputTitle = document.querySelector("#inputTitle");
  const inputDate = document.querySelector("#inputDate");
  const inputDescription = document.querySelector("#inputDescription");

  fetchPatientData()

  function fetchPatientData() {
    fetch( 'patients.json' )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }
};
