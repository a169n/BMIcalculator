function fetchUsers() {
  fetch("/users")
    .then((response) => response.json())
    .then((users) => {
      const userTableBody = document.getElementById("userTableBody");
      userTableBody.innerHTML = "";

      users.forEach((user) => {
        const row = document.createElement("tr");

        const unitSystem = user.unitSystem || "";

        console.log(unitSystem);

        const heightUnit = unitSystem === "metric" ? "cm" : "inches";
        const weightUnit = unitSystem === "metric" ? "kg" : "lbs";

        const bmiCategory = getBMICategory(user.bmi);

        row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.height} ${heightUnit}</td>
      <td>${user.weight} ${weightUnit}</td>
      <td>${user.age}</td>
      <td>${user.isMale ? "Male" : "Female"}</td>
      <td>${user.bmi.toFixed(3)}</td>
      <td>${bmiCategory}</td>
      <td>${new Date(user.createdAt).toLocaleString()}</td>
      <td>
        <button class="btn btn-danger" onclick="deleteUser('${
          user._id
        }')">Delete</button>
      </td>
    `;

        applyCategoryStyle(row, bmiCategory);

        userTableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching users:", error));
}

fetchUsers();

function getBMICategory(bmi) {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal weight";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

function submitForm(event) {
  event.preventDefault();

  const formData = new URLSearchParams();
  formData.append("name", document.getElementById("name").value);
  formData.append("height", document.getElementById("height").value);
  formData.append("weight", document.getElementById("weight").value);
  formData.append("age", document.getElementById("age").value);
  formData.append("gender", document.getElementById("gender").value);
  formData.append("unitSystem", document.getElementById("unitSystem").value);

  const unitSystem = document.getElementById("unitSystem").value;
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);

  let bmi;

  if (unitSystem === "selected") {
    alert("Select the system!");
  } else if (unitSystem == "metric") {
    bmi = weight / (height / 100) ** 2;
  } else if (unitSystem == "imperial") {
    bmi = (weight / height ** 2) * 703;
  }

  formData.append("bmi", parseFloat(bmi.toFixed(3)));
  formData.append("category", getBMICategory(bmi));

  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Form submitted successfully:", data);
      document.getElementById("name").value = "";
      document.getElementById("height").value = "";
      document.getElementById("weight").value = "";
      document.getElementById("age").value = "";
      alert("Form submitted successfully!");
      fetchUsers();
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
      alert(`Error submitting form: ${error.message}`);
    });
}


function applyCategoryStyle(row, bmiCategory) {
  switch (bmiCategory) {
    case "Underweight":
      row.classList.add("table-warning");
      break;
    case "Normal weight":
      row.classList.add("table-success");
      break;
    case "Overweight":
      row.classList.add("table-warning");
      break;
    case "Obese":
      row.classList.add("table-danger");
      break;
    default:
      break;
  }
}

function deleteUser(userId) {
  fetch(`/users/${userId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("User deleted successfully:", data);
      fetchUsers();
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      alert(`Error deleting user: ${error.message}`);
    });
}

function clearAllUsers() {
  fetch("/users", {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("All users deleted successfully:", data);
      fetchUsers();
    })
    .catch((error) => {
      console.error("Error clearing all users:", error);
      alert(`Error clearing all users: ${error.message}`);
    });
}

function updateFormUnits(unitSystem) {
  const heightLabel = document.getElementById("heightLabel");
  const weightLabel = document.getElementById("weightLabel");

  if (unitSystem === "metric") {
    heightLabel.innerHTML = "Height (cm)";
    weightLabel.innerHTML = "Weight (kg)";
  } else if (unitSystem === "imperial") {
    heightLabel.innerHTML = "Height (inches)";
    weightLabel.innerHTML = "Weight (lbs)";
  }
}

function onUnitSystemChange() {
  const unitSystem = document.getElementById("unitSystem").value;
  updateFormUnits(unitSystem);
}

document
  .getElementById("unitSystem")
  .addEventListener("change", onUnitSystemChange);
