function getData() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const url = document.getElementById("url").value;

  return { username, password, url };
}

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const data = getData();
  const { url, username, password } = { ...data };

  // Notify the Electron main process that the form has been submitted
  ipcRenderer.send("scrape:start", { url, username, password });
});

// When done, show message
ipcRenderer.on("scrape:success", () => {
  const downloadReport = document.getElementById("download-report");
  downloadReport.classList.remove("disabled");
  downloadReport.classList.add("enabled");
  downloadReport.removeAttribute("onclick");
  downloadReport.setAttribute("href", "../reports.xlsx");

  const username = document.getElementById("username").value;
  alertSuccess(`Gst data scraped for ${username}`);
});

function alertSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "green",
      color: "white",
      textAlign: "center",
    },
  });
}

function alertError(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "red",
      color: "white",
      textAlign: "center",
    },
  });
}

// Auto date update handler funtion
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;