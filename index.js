document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const contactList = document.getElementById("contact-list");
    const searchInput = document.getElementById("search");
  
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  
    function saveContacts() {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  
    function renderContacts(filter = "") {
      contactList.innerHTML = "";
      contacts
        .filter(contact =>
          `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(filter.toLowerCase())
        )
        .forEach((contact, index) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <span>${contact.firstName} ${contact.lastName} - ${contact.phone}, ${contact.email}</span>
            <div>
              <button class="edit" onclick="editContact(${index})">✏️</button>
              <button class="delete" onclick="deleteContact(${index})">🗑️</button>
            </div>
          `;
          contactList.appendChild(li);
        });
    }
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const newContact = {
        firstName: form.firstName.value.trim(),
        lastName: form.lastName.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim()
      };
  
      if (!newContact.firstName || !newContact.lastName || !newContact.phone || !newContact.email) {
        alert("Будь ласка, заповніть усі поля!");
        return;
      }
  
      contacts.push(newContact);
      saveContacts();
      renderContacts();
      form.reset();
    });
  
    window.deleteContact = (index) => {
      if (confirm("Ви впевнені, що хочете видалити цей контакт?")) {
        contacts.splice(index, 1);
        saveContacts();
        renderContacts();
      }
    };
  
    window.editContact = (index) => {
      const contact = contacts[index];
  
      form.firstName.value = contact.firstName;
      form.lastName.value = contact.lastName;
      form.phone.value = contact.phone;
      form.email.value = contact.email;
  
      contacts.splice(index, 1);
      saveContacts();
      renderContacts();
    };
  
    searchInput.addEventListener("input", (event) => {
      renderContacts(event.target.value);
    });
  
    renderContacts();
  });
  