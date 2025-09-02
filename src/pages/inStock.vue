<!-- InStockPage.vue -->
<template>
  <div>
    <q-card class="q-pa-md my-card">
      <div class="stock-page">
        <h2 class="title">Stock Management</h2>

        <!-- Toolbar -->
        <div class="toolbar q-mb-md flex justify-between items-center">
          <!-- First column: In Stock button -->
          <div>
            <q-btn
              color="primary"
              label="In Stock"
              icon="inventory_2"
              @click="viewInStock"
            />
          </div>

          <!-- Second column: Calendar and Status button -->
          <div class="flex gap-2 items-center">
            <q-input
              dense
              outlined
              v-model="date"
              mask="####-##-##"
              placeholder="YYYY-MM-DD"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer" />
              </template>
            </q-input>

            <q-btn
              color="secondary"
              label="Status"
              icon="info"
              @click="viewStatus"
            />
          </div>
        </div>

        <!-- Stock Table -->
        <table class="stock-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Stock ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredStock" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.id }}</td>
              <td>{{ item.product }}</td>
              <td>
                <input
                  type="number"
                  v-model.number="item.qty"
                  min="0"
                  class="qty-input"
                />
              </td>
              <td>${{ (item.price * item.qty).toFixed(2) }}</td>
              <td>
                <span
                  :class="{
                    'text-green': item.qty >= 5,
                    'text-yellow': item.qty > 0 && item.qty < 5,
                    'text-red': item.qty === 0,
                  }"
                >
                  {{
                    item.qty === 0
                      ? "Out of Stock"
                      : item.qty < 5
                      ? "Low Stock"
                      : "In Stock"
                  }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </q-card>

    <!-- Add Stock Popup -->
    <q-dialog v-model="showAddStock">
      <q-card class="q-pa-md" style="min-width: 400px">
        <h3 class="q-mb-md">Add New Stock</h3>
        <q-input
          v-model="newStock.product"
          label="Product Name"
          outlined
          class="q-mb-sm"
        />
        <q-input
          v-model.number="newStock.qty"
          type="number"
          label="Quantity"
          outlined
          class="q-mb-sm"
        />
        <q-input
          v-model.number="newStock.price"
          type="number"
          label="Price"
          outlined
          class="q-mb-sm"
        />

        <div class="flex justify-end gap-2">
          <q-btn flat label="Cancel" color="negative" v-close-popup />
          <q-btn flat label="Add" color="primary" @click="addStock" />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const date = ref("");
const showAddStock = ref(false);

const stock = ref([
  {
    id: "STK1001",
    product: "Laptop",
    qty: 10,
    price: 950.5,
    date: "2025-09-01",
  },
  {
    id: "STK1002",
    product: "Mobile Phone",
    qty: 0,
    price: 700,
    date: "2025-09-02",
  },
  {
    id: "STK1003",
    product: "Headphones",
    qty: 3,
    price: 120,
    date: "2025-09-02",
  },
]);

const newStock = ref({ id: "", product: "", qty: 1, price: 0 });

const filteredStock = computed(() => {
  return stock.value.filter((item) => !date.value || item.date === date.value);
});

function getStatus(qty) {
  if (qty === 0) return "Out of Stock";
  if (qty < 5) return "Low Stock";
  return "In Stock";
}

function addStock() {
  if (!newStock.value.product) {
    alert("Please enter product name");
    return;
  }
  newStock.value.id = "STK" + (stock.value.length + 1001);
  newStock.value.date = new Date().toISOString().split("T")[0];
  stock.value.push({ ...newStock.value });
  newStock.value = { id: "", product: "", qty: 1, price: 0 };
  showAddStock.value = false;
}

// Dummy actions
function viewInStock() {
  console.log("In Stock button clicked");
}
function viewStatus() {
  console.log("Status button clicked");
}
</script>

<style scoped>
.stock-page {
  padding: 2rem;
  background: #f9fafb;
  min-height: 100vh;
}
.title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stock-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
.stock-table th,
.stock-table td {
  padding: 0.8rem;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
}
.stock-table th {
  background: #f1f5f9;
  font-weight: 600;
}
.qty-input {
  width: 60px;
  padding: 0.3rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.3rem;
  text-align: center;
}
.status {
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
}
</style>
