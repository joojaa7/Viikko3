const restaurantRow = (restaurant) => {
  const {name, company} = restaurant;
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${name}</td><td>${company}</td>`;
  return tr;
}


const restaurantModal = (restaurant, menu) => {
  const {name, address, postalCode, city, company} = restaurant;
  const {courses} = menu;
  let menuHTML = `<h1>${name}</h1>
                  <p>${address}, ${postalCode} ${city}</p>
                  <p>${company}</p>`;
  courses.forEach((course) => {
    const {price} = course;
    const existingPrice = price ? price : 'Ei hintatietoa';
    menuHTML += `<li>${course.name} -  ${existingPrice}</li>`;
  })
  menuHTML += `<form method="dialog">
              <button>Sulje</button>
              </form>`;
  return menuHTML;
}


export {restaurantRow, restaurantModal};
