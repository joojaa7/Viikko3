import { restaurantRow, restaurantModal } from './components.js';
import { fetchRestaurants, fetchDailyMenu } from './utils.js';



const sortRestaurants = (restaurants) => {
  restaurants.sort((a, b) =>
    a.name
      .toLowerCase()
      .trim()
      .localeCompare(b.name.toLowerCase().trim())
  )
}


const createDialog = (restaurant, dialogNode, menu) => {
  dialogNode.innerHTML = restaurantModal(restaurant, menu);
  dialogNode.showModal()
}

const handleTableRowClick = async (tr, restaurant, dialogNode) => {
  document.querySelectorAll("tr").forEach((tr) => {
    tr.classList.remove("highlight")
  })

  tr.classList.add("highlight")

  const menu = await fetchDailyMenu(restaurant._id)
  console.log("menu", menu)
  console.log(restaurant)

  createDialog(restaurant, dialogNode, menu)
}

const createTable = (restaurants) => {
  const tableNode = document.querySelector("table")
  const dialogNode = document.querySelector("dialog")

  restaurants.forEach((restaurant) => {
    const row = restaurantRow(restaurant);
    tableNode.appendChild(row)

    row.addEventListener("click", () => {
      handleTableRowClick(row, restaurant, dialogNode)
    })
  })
}


const buildWebsite = async () => {
  let restaurants;
  try {
    restaurants = await fetchRestaurants()
  } catch (e){
    alert(e);
  }
  sortRestaurants(restaurants)

  createTable(restaurants)
}


const filterRestaurants = async (company) => {
  const restaurants = await fetchRestaurants();
  sortRestaurants(restaurants);
  const filteredRestaurants = restaurants.filter(restaurant => restaurant.company === company);
  if (company === 'Reset'){
    createTable(restaurants);
  } else {
    createTable(filteredRestaurants);
  }
}


Array.from(document.getElementsByClassName('filter')).forEach(element => {
  element.addEventListener('click', (e) => {
    document.querySelector("table").innerHTML = '';
    if (e.target.textContent !== 'Reset') {
      filterRestaurants(e.target.id);
    } else {
      filterRestaurants(e.target.textContent);
    }

  })
})


buildWebsite()

