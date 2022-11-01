let locationArray = [
  {
    title: "California Highway Nine",
    sublocation: "South Bay",
    key: "1",
    checked: false,
  },
  {
    title: "Los Gatos",
    sublocation: "South Bay",
    key: "2",
    checked: false,
  },
  {
    title: "Santana Row",
    sublocation: "South Bay",
    key: "3",
    checked: false,
  },
  {
    title: "Golden Gate",
    sublocation: "North Bay",
    key: "4",
    checked: false,
  },
  {
    title: "Marin",
    sublocation: "North Bay",
    key: "5",
    checked: false,
  },
  {
    title: "Sonoma",
    sublocation: "North Bay",
    key: "6",
    checked: false,
  },
  {
    title: "California Highway One",
    sublocation: "Peninsula",
    key: "7",
    checked: false,
  },
  {
    title: "San Francisco",
    sublocation: "Peninsula",
    key: "8",
    checked: false,
  },
  {
    title: "Skyline Boulevard",
    sublocation: "Peninsula",
    key: "9",
    checked: false,
  },
  {
    title: "Alameda",
    sublocation: "EastBay",
    key: "10",
    checked: false,
  },
  {
    title: "Automall Fremont",
    sublocation: "EastBay",
    key: "11",
    checked: false,
  },
  {
    title: "Walnut Creek",
    sublocation: "EastBay",
    key: "12",
    checked: false,
  },
];

fetch("/bookings")
  .then((res) => res.json())
  .then((data) => {
    locationArray = locationArray.map((item) => {
      if (data.includes(item.title)) {
        item.checked = true;
      }
      return item;
    });
    render();
  })
  .catch((err) => {
    render();
  });

function render() {
  // Location container div
  const locationDiv = document.createElement("div");
  locationDiv.id = locationArray[0].key;
  locationDiv.className = "container";

  // Location inner div
  const locationInner = document.createElement("ul");
  locationInner.style.listStyleType = "none";
  locationInnerclassName = "listContainer";
  locationDiv.appendChild(locationInner);

  locationArray.map((item) => {
    const listItem = document.createElement("li");
    listItem.className = `listItems ${item.key}`;
    listItem.id = item.key;
    const checkBox = document.createElement("input");
    checkBox.type = "checkBox";
    checkBox.id = item.key;
    checkBox.name = item.title;
    checkBox.checked = item.checked;
    listItem.appendChild(checkBox);

    const span = document.createElement("span");
    span.innerHTML = item.title;
    listItem.appendChild(span);

    // listItem.innerHTML = item.title;
    locationInner.appendChild(listItem);
  });

  const locationContainer = document.getElementById("location-container");
  locationContainer.appendChild(locationDiv);
  console.log(locationContainer);
  console.log(locationArray);
}

function handleSubmit() {
  const markedLocations = [];
  const inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (input.checked) {
      markedLocations.push(input.name);
    }
  }
  fetch("/addBookmark", {
    method: "POST",
    body: JSON.stringify({
      locations: markedLocations,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    alert("Marked successfully!");
  });
}
