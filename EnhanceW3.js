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

  const restaurants = await fetchRestaurants()
  sortRestaurants(restaurants)

  createTable(restaurants)
}


buildWebsite()

