const API_URL = "http://localhost:5000";

// Generic fetch function for any entity
async function fetchData(endpoint, listId) {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`);
    const data = await res.json();
    const list = document.getElementById(listId);
    list.innerHTML = "";

    data.forEach(item => {
      const li = document.createElement("li");
      li.className = "list-group-item";

      switch(endpoint) {
        case "patients":
          li.textContent = `${item.Name} - Age: ${item.Age} - Gender: ${item.Gender}`;
          break;
        case "doctors":
          li.textContent = `${item.Name} - ${item.Dept} - ${item.Qualification} - Salary: ₹${item.Salary}`;
          break;
        case "rooms":
           li.textContent = `Room ${item.R_ID} - Type: ${item.Type} - Capacity: ${item.Capacity} - ${item.Availability}`;
          break;
        case "bills":
           li.textContent = `Bill ${item.B_ID} - Patient ID: ${item.P_ID} - Amount: ₹${item.Amount}`;
          break;
        case "testReports":
           li.textContent = `Report ${item.Report_ID} - Patient ID: ${item.P_ID} - ${item.Test_Type} - Result: ${item.Result}`;
          break;
        case "employees":
           li.textContent = `${item.Name} - Salary: ₹${item.Salary} - ${item.City}, ${item.State}`;
          break;
        case "nurses":
           li.textContent = `${item.Name} - Salary: ₹${item.Salary} - ${item.City}, ${item.State}`;
          break;
        case "receptionists":
           li.textContent = `${item.Name} - Salary: ₹${item.Salary} - ${item.City}, ${item.State}`;
          break;
        default:
          li.textContent = JSON.stringify(item);
      }

      list.appendChild(li);
    });
  } catch (err) {
    console.log(err);
  }
}
