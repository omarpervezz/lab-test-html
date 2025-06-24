document.addEventListener("DOMContentLoaded", () => {
  const selectBoxes = document.querySelectorAll(".test-select");

  // Maintain separate test sets per section
  const selectedTestsMap = {
    registration: new Set(),
    phlebotomy: new Set(),
  };

  // Helper: Add row
  function addTestRow(section, testName, cost, sample) {
    const testTableBody = document.getElementById(`test-table-body-${section}`);
    const selectedTests = selectedTestsMap[section];

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${testName}</td>
      <td>Rs.${cost}</td>
      <td>${sample}</td>
      <td class="text-center">
        <button class="btn btn-sm btn-outline-danger delete-btn p-1" title="Remove">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </td>
    `;

    row.querySelector(".delete-btn").addEventListener("click", () => {
      row.remove();
      selectedTests.delete(testName);
    });

    testTableBody.appendChild(row);
    selectedTests.add(testName);
  }

  // Attach change listener to each test select box
  selectBoxes.forEach((selectBox) => {
    const section = selectBox.dataset.section;

    selectBox.addEventListener("change", () => {
      const selectedOption = selectBox.options[selectBox.selectedIndex];
      const testName = selectedOption.textContent.trim();
      const cost = selectedOption.getAttribute("data-cost") || "0";
      const sample = selectedOption.getAttribute("data-sample") || "—";

      if (selectedTestsMap[section].has(testName)) {
        alert(`"${testName}" is already added to ${section}.`);
      } else {
        addTestRow(section, testName, cost, sample);
      }

      selectBox.selectedIndex = 0;
    });
  });

  // Optional: Preload per section
  const preloadedTests = [
    { name: "CRP - C Reactive Protein", cost: "450", sample: "Serum" },
    {
      name: "HbA1c – Glycosylated Haemoglobin",
      cost: "350",
      sample: "EDTA - 2 ml",
    },
  ];

  preloadedTests.forEach((test) =>
    addTestRow("registration", test.name, test.cost, test.sample)
  );
  const addDrButton = document.querySelector(".add-doctor-btn");
  const formContainer = document.getElementById("dr-form-container");
  const addDoctorForm = document.getElementById("add-doctor-form");

  if (addDrButton && formContainer && addDoctorForm) {
    addDrButton.addEventListener("click", () => {
      if (!formContainer.contains(addDoctorForm)) {
        formContainer.appendChild(addDoctorForm);
      }
      addDoctorForm.classList.toggle("d-none");
    });
  }
});
