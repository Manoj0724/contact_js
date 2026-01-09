declare const bootstrap: any;

console.log("contacts.ts loaded");

 // ---------- MODAL & FORM ELEMENTS ----------
const addContactModal = document.getElementById("addContactModal") as HTMLElement | null;
const saveContactBtn = document.getElementById("saveContactBtn") as HTMLButtonElement | null;

const newTitle = document.getElementById("newTitle") as HTMLSelectElement | null;
const newFirst = document.getElementById("newFirst") as HTMLInputElement | null;
const newLast = document.getElementById("newLast") as HTMLInputElement | null;
const newMob1 = document.getElementById("newMob1") as HTMLInputElement | null;
const newMob2 = document.getElementById("newMob2") as HTMLInputElement | null;
const newCity = document.getElementById("newCity") as HTMLInputElement | null;
const newState = document.getElementById("newState") as HTMLInputElement | null;
const newPin = document.getElementById("newPin") as HTMLInputElement | null;

// ---------- EDIT STATE ----------
let isEditing: boolean = false;
let editingId: string | null = null;

// ---------- TABLE & UI ELEMENTS ----------
const contactBody = document.getElementById("contactBody") as HTMLElement | null;
const pagination = document.getElementById("pagination") as HTMLElement | null;
const pageSizeSelect = document.getElementById("pageSizeSelect") as HTMLSelectElement | null;
const searchInput = document.getElementById("basicSearch") as HTMLInputElement | null;
const searchBtn = document.getElementById("basicSearchBtn") as HTMLButtonElement | null;

// ---------- API ----------
const API: string = "http://localhost:5000/api/contacts/paginate";

// ---------- STATE INTERFACE ----------
interface PaginationState {
  page: number;
  limit: number;
  query: string;
}

// ---------- SAVED PAGE SIZE ----------
const savedPageSize: number = Number(localStorage.getItem("pageSize")) || 3;

// ---------- STATE ----------
const state: PaginationState = {
  page: 1,
  limit: savedPageSize,
  query: "",
};

if (pageSizeSelect) {
  pageSizeSelect.value = String(state.limit);
}

// ---------- API RESPONSE INTERFACE ----------
interface Contact {
  _id: string;
  title: string;
  firstName: string;
  lastName: string;
  mobile1: string;
  mobile2?: string;
  address: {
    city: string;
    state: string;
    pincode: string;
  };
}

interface ApiResponse {
  success: boolean;
  contacts: Contact[];
  page: number;
  totalPages: number;
  total: number;
}

// ---------- LOAD CONTACTS ----------
function loadContacts(): void {
  let url: string = `${API}?page=${state.page}&limit=${state.limit}`;

  if (state.query) {
    url += `&q=${encodeURIComponent(state.query)}`;
  }

  console.log("API CALL →", url);

  fetch(url)
    .then((res: Response) => {
      if (!res.ok) {
        throw new Error(res.status.toString());
      }
      return res.json() as Promise<ApiResponse>;
    })
    .then((data: ApiResponse) => {
      if (!data.success) {
        alert("Backend returned error");
        return;
      }

      renderTable(data.contacts);
      renderPagination(data.totalPages);

      const accountCount = document.getElementById("accountCount");
      if (accountCount) {
        accountCount.innerText = `Showing page ${data.page} of ${data.totalPages} (Total: ${data.total})`;
      }
    })
    .catch((err: Error) => {
      console.error("Fetch error:", err);
      alert("Backend fetch failed");
    });
}

loadContacts();


/* ================================
   RENDER TABLE (TypeScript)
================================ */

function renderTable(list: Contact[]): void {
  if (!contactBody) return;

  contactBody.innerHTML = "";

  if (!list.length) {
    contactBody.innerHTML = `
      <tr>
        <td colspan="9" class="text-center text-danger">
          No records found
        </td>
      </tr>`;
    return;
  }

  list.forEach((c: Contact) => {
    contactBody!.innerHTML += `
      <tr>
        <td>${c.title}</td>
        <td>${c.firstName}</td>
        <td>${c.lastName}</td>
        <td>${c.mobile1}</td>
        <td>${c.mobile2 ?? ""}</td>
        <td>${c.address?.city ?? ""}</td>
        <td>${c.address?.state ?? ""}</td>
        <td>${c.address?.pincode ?? ""}</td>
        <td>
          <button 
            class="btn btn-sm btn-warning me-1" 
            onclick="editContact('${c._id}')">
            Edit
          </button>
          <button 
            class="btn btn-sm btn-danger" 
            onclick="deleteContact('${c._id}')">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}


 /* ================================
   PAGINATION (TypeScript)
================================ */

function renderPagination(totalPages: number): void {
  if (!pagination) return;

  pagination.innerHTML = "";

  // Prev button
  pagination.innerHTML += `
    <li class="page-item ${state.page === 1 ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="gotoPage(${state.page - 1})">
        Prev
      </a>
    </li>
  `;

  // Page numbers
  for (let i: number = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${state.page === i ? "active" : ""}">
        <a class="page-link" href="#" onclick="gotoPage(${i})">
          ${i}
        </a>
      </li>
    `;
  }

  // Next button
  pagination.innerHTML += `
    <li class="page-item ${state.page === totalPages ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="gotoPage(${state.page + 1})">
        Next
      </a>
    </li>
  `;
}

function gotoPage(page: number): void {
  state.page = page;
  loadContacts();
}

/* ================================
   SEARCH (TypeScript)
================================ */

let isSearchApplied: boolean = false;

if (searchBtn && searchInput) {
  searchBtn.onclick = (): void => {

    // 🔁 CLEAR MODE
    if (isSearchApplied) {
      searchInput.value = "";
      state.query = "";
      state.page = 1;
      loadContacts();

      // reset button to SEARCH
      searchBtn.classList.remove("btn-danger");
      searchBtn.classList.add("btn-primary");
      searchBtn.innerHTML = `<i class="bi bi-search"></i>`;

      isSearchApplied = false;
      return;
    }

    // 🔍 SEARCH MODE
    const value: string = searchInput.value.trim();
    if (!value) return;

    state.query = value;
    state.page = 1;
    loadContacts();

    // change button to CLEAR
    searchBtn.classList.remove("btn-primary");
    searchBtn.classList.add("btn-danger");
    searchBtn.innerHTML = `<i class="bi bi-x-lg"></i>`;

    isSearchApplied = true;
  };

  searchInput.addEventListener("keydown", (e: KeyboardEvent): void => {
    if (e.key === "Enter") {
      searchBtn.click();
    }
  });
}

/* ================================
   PAGE SIZE (TypeScript)
================================ */

if (pageSizeSelect) {
  pageSizeSelect.onchange = (): void => {
    const selectedSize: number = Number(pageSizeSelect.value);

    // save to localStorage
    localStorage.setItem("pageSize", String(selectedSize));

    state.limit = selectedSize;
    state.page = 1;
    loadContacts();
  };
}

/* ================================
   ADVANCED SEARCH (TypeScript)
================================ */

const applyFilterBtn = document.getElementById("applyFilter") as HTMLButtonElement | null;
const resetFilterBtn = document.getElementById("resetFilter") as HTMLButtonElement | null;

if (applyFilterBtn && resetFilterBtn) {

  applyFilterBtn.onclick = (): void => {
    const firstName = (document.getElementById("firstName") as HTMLInputElement | null)?.value.trim() || "";
    const lastName = (document.getElementById("lastName") as HTMLInputElement | null)?.value.trim() || "";
    const mobile = (document.getElementById("mobile") as HTMLInputElement | null)?.value.trim() || "";
    const city = (document.getElementById("city") as HTMLSelectElement | null)?.value || "";
    const stateVal = (document.getElementById("state") as HTMLSelectElement | null)?.value || "";
    const pincode = (document.getElementById("pincode") as HTMLInputElement | null)?.value.trim() || "";

    // priority-based search (ONE value only)
    if (firstName) state.query = firstName;
    else if (lastName) state.query = lastName;
    else if (mobile) state.query = mobile;
    else if (city && city !== "All") state.query = city;
    else if (stateVal && stateVal !== "All") state.query = stateVal;
    else if (pincode) state.query = pincode;
    else {
      alert("Please enter at least one search field");
      return;
    }

    state.page = 1;
    loadContacts();
  };

  resetFilterBtn.onclick = (): void => {
    (document.getElementById("title") as HTMLSelectElement)!.value = "";
(document.getElementById("firstName") as HTMLInputElement)!.value = "";
(document.getElementById("lastName") as HTMLInputElement)!.value = "";
(document.getElementById("mobile") as HTMLInputElement)!.value = "";
(document.getElementById("city") as HTMLSelectElement)!.value = "";
(document.getElementById("state") as HTMLSelectElement)!.value = "";
(document.getElementById("pincode") as HTMLInputElement)!.value = "";

    state.query = "";
    state.page = 1;
    loadContacts();
  };
}

/* ================================
   CSV EXPORT (TypeScript)
================================ */

const csvBtn = document.getElementById("csvButton") as HTMLButtonElement | null;

if (csvBtn) {
  csvBtn.onclick = (): void => {
    const rows = document.querySelectorAll<HTMLTableRowElement>(
      "#contactTable tbody tr"
    );

    if (!rows.length || rows[0].innerText.includes("No records")) {
      alert("No data to export");
      return;
    }

    const csv: string[] = [];

    csv.push(
      [
        "Title",
        "First Name",
        "Last Name",
        "Mobile 1",
        "Mobile 2",
        "City",
        "State",
        "Pincode",
      ].join(",")
    );

    rows.forEach((row: HTMLTableRowElement) => {
      const cols = row.querySelectorAll<HTMLTableCellElement>("td");

      const rowData: string[] = [
        cols[0]?.innerText ?? "",
        cols[1]?.innerText ?? "",
        cols[2]?.innerText ?? "",
        cols[3]?.innerText ?? "",
        cols[4]?.innerText ?? "",
        cols[5]?.innerText ?? "",
        cols[6]?.innerText ?? "",
        cols[7]?.innerText ?? "",
      ];

      csv.push(rowData.join(","));
    });

    downloadCSV(csv.join("\n"));
  };
}

function downloadCSV(csvContent: string): void {
  const blob: Blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url: string = URL.createObjectURL(blob);

  const a: HTMLAnchorElement = document.createElement("a");
  a.href = url;
  a.download = "contacts.csv";

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ================================
   DELETE (TypeScript)
================================ */

function deleteContact(id: string): void {
  if (!confirm("Delete this contact?")) return;

  fetch(`http://localhost:5000/api/contacts/${id}`, {
    method: "DELETE",
  })
    .then((res: Response) => res.json())
    .then((): void => {
      showToast("✔ Contact deleted Successfully!");
      loadContacts(); // reload page from backend
    })
    .catch((err: Error): void => {
      console.error("Delete failed:", err);
      alert("Failed to delete contact");
    });
}

/* ================================
   EDIT (TypeScript)
================================ */

function editContact(id: string): void {
  fetch(`http://localhost:5000/api/contacts/${id}`)
    .then((res: Response) => res.json())
    .then((contact: Contact): void => {
      isEditing = true;
      editingId = id;

      if (
        !newTitle ||
        !newFirst ||
        !newLast ||
        !newMob1 ||
        !newMob2 ||
        !newCity ||
        !newState ||
        !newPin ||
        !saveContactBtn ||
        !addContactModal
      ) {
        return;
      }

      newTitle.value = contact.title;
      newFirst.value = contact.firstName;
      newLast.value = contact.lastName;
      newMob1.value = contact.mobile1;
      newMob2.value = contact.mobile2 ?? "";
      newCity.value = contact.address?.city ?? "";
      newState.value = contact.address?.state ?? "";
      newPin.value = contact.address?.pincode ?? "";

      saveContactBtn.innerText = "Update Contact";

      const modalTitle = document.querySelector(".modal-title") as HTMLElement | null;
      if (modalTitle) {
        modalTitle.innerText = "Edit Contact";
      }

      const modal = new bootstrap.Modal(addContactModal);
      modal.show();
    })
    .catch((err: Error) => {
      console.error("Edit fetch failed:", err);
      alert("Failed to load contact");
    });
}

/* ================================
   TOAST
================================ */

function showToast(message: string): void {
  const toastMsg = document.getElementById("toastMessage") as HTMLElement | null;
  const toastEl = document.getElementById("successToast") as HTMLElement | null;

  if (!toastMsg || !toastEl) return;

  toastMsg.innerText = message;

  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

/* ================================
   RESET MODAL
================================ */

function resetModal(): void {
  if (
    !newTitle ||
    !newFirst ||
    !newLast ||
    !newMob1 ||
    !newMob2 ||
    !newCity ||
    !newState ||
    !newPin ||
    !saveContactBtn ||
    !addContactModal
  ) {
    return;
  }

  // exit edit mode
  isEditing = false;
  editingId = null;

  // reset modal title & button
  saveContactBtn.innerText = "Save Contact";

  const modalTitle = document.querySelector(".modal-title") as HTMLElement | null;
  if (modalTitle) {
    modalTitle.innerText = "Add New Contact";
  }

  // clear inputs
  newTitle.value = "Mr";
  newFirst.value = "";
  newLast.value = "";
  newMob1.value = "";
  newMob2.value = "";
  newCity.value = "";
  newState.value = "";
  newPin.value = "";

  // close modal
  const modal = bootstrap.Modal.getOrCreateInstance(addContactModal);
  modal.hide();
}

/* ================================
   SAVE / UPDATE
================================ */

if (saveContactBtn) {
  saveContactBtn.onclick = (): void => {
    if (
      !newTitle ||
      !newFirst ||
      !newLast ||
      !newMob1 ||
      !newCity ||
      !newState ||
      !newPin
    ) {
      return;
    }

    if (
      !newFirst.value ||
      !newLast.value ||
      !newMob1.value ||
      !newCity.value ||
      !newState.value ||
      !newPin.value
    ) {
      alert("Please fill all mandatory fields");
      return;
    }

    const payload = {
      title: newTitle.value,
      firstName: newFirst.value,
      lastName: newLast.value,
      mobile1: newMob1.value,
      mobile2: newMob2?.value || "",
      address: {
        city: newCity.value,
        state: newState.value,
        pincode: newPin.value,
      },
    };

    const url: string = isEditing && editingId
      ? `http://localhost:5000/api/contacts/${editingId}`
      : `http://localhost:5000/api/contacts`;

    const method: "POST" | "PUT" = isEditing ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res: Response) => res.json())
      .then((): void => {
        showToast(
          isEditing
            ? "✔ Contact Updated Successfully!"
            : "✔ Contact Added Successfully!"
        );
        resetModal();
        loadContacts();
      })
      .catch((err: Error) => {
        console.error("Save failed:", err);
        alert("Save failed");
      });
  };
}

/* ================================
   INITIAL LOAD
================================ */

loadContacts();
