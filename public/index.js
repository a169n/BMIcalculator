function fetchUsers() {
  fetch("/users")
    .then((response) => response.json())
    .then((users) => {
      const userTableBody = document.getElementById("userTableBody");
      userTableBody.innerHTML = "";

      const latestUser = users[users.length - 1];

      displayLatestUserResult(latestUser);

      users.forEach((user) => {
        const row = document.createElement("tr");

        const heightUnit = user.unitSystem === "metric" ? "cm" : "inches";
        const weightUnit = user.unitSystem === "metric" ? "kg" : "lbs";

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

async function submitForm(event) {
  event.preventDefault();

  const unitSystemSelect = document.getElementById("unitSystem");
  const selectedOption = unitSystemSelect.value;

  if (selectedOption !== "metric" && selectedOption !== "imperial") {
    alert("Please select a valid unit system (Metric or Imperial).");
    return;
  }

  const formData = new URLSearchParams();
  formData.append("name", document.getElementById("name").value);
  formData.append("height", document.getElementById("height").value);
  formData.append("weight", document.getElementById("weight").value);
  formData.append("age", document.getElementById("age").value);
  formData.append("gender", document.getElementById("gender").value);
  formData.append("unitSystem", selectedOption);

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const user = await response.json();
    document.getElementById("bmi-form").reset();
    alert("Form submitted successfully!");
    fetchUsers();
    displayLatestUserResult(user);
  } catch (error) {
    console.error("Error submitting form:", error);
    alert(`Error submitting form: ${error.message}`);
  }
}

function displayLatestUserResult(user) {
  const resultsDiv = document.getElementById("results");
  const bmiCategory = getBMICategory(user.bmi);

  const heightUnit = user.unitSystem === "metric" ? "cm" : "inches";
  const weightUnit = user.unitSystem === "metric" ? "kg" : "lbs";

  if (resultsDiv) {
    resultsDiv.innerHTML = `
    <h2>Latest result </h2>
    <p>Name: ${user.name}</p>
    <p>Height: ${user.height} ${heightUnit}</p>
    <p>Weight: ${user.weight} ${weightUnit}</p>
    <p>BMI: ${user.bmi.toFixed(3)}</p>
    <p>Category: ${bmiCategory}</p>
    <p>Age: ${user.age}</p>
    <p>Gender: ${user.isMale ? "Male" : "Female"}</p>
    <p> Created at: ${new Date(user.createdAt).toLocaleString()}</p>
  `;
  }
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
  const unitSystemSelect = document.getElementById("unitSystem");
  const selectedOption = unitSystemSelect.value;

  if (selectedOption !== "metric" && selectedOption !== "imperial") {
    alert("Please select a valid unit system (Metric or Imperial).");
    return;
  } else {
    updateFormUnits(selectedOption);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetchUsers();
  const unitSystemElement = document.getElementById("unitSystem");
  if (unitSystemElement) {
    unitSystemElement.addEventListener("change", onUnitSystemChange);
  }
});

