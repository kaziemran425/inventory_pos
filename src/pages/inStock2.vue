<!-- InStockPage.vue -->
<template>
  <div class="q-pa-md">
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
              @click="showStockPopup = true"
            />
          </div>

          <!-- Second column: Calendar and Status button -->
          <div class="flex gap-2 items-center q-pa-md">
            <q-input
              dense
              outlined
              v-model="date"
              mask="####-##-##"
              placeholder="YYYY-MM-DD"
              class="q-pa-md"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer" />
              </template>
            </q-input>

            <q-btn
              color="secondary"
              label="Status"
              icon="info"
              @click="showStatusPopup = true"
            />
          </div>
        </div>

        <!-- Category Buttons -->
        <div class="q-mb-md row q-gutter-sm">
          <q-btn
            v-for="cat in categories"
            :key="cat.value"
            :label="cat.label"
            :color="selectedCategory === cat.value ? 'primary' : 'grey'"
            @click="selectedCategory = cat.value"
          />
        </div>

        <!-- Stock Table -->
        <table class="stock-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Stock ID</th>
              <th>Product</th>
              <th>Category</th>
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
              <td>{{ getCategoryLabel(item.category) }}</td>
              <td>{{ item.qty }}</td>
              <td>${{ (item.price * item.qty).toFixed(2) }}</td>
              <td>
                <span :class="getStatusClass(item.qty)">
                  {{ getStatus(item.qty) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </q-card>

    <!-- Add/Remove Stock Popup -->
    <q-dialog v-model="showStockPopup">
      <q-card class="q-pa-md" style="min-width: 400px">
        <h3 class="q-mb-md">Manage Stock</h3>

        <!-- Toggle between Add and Remove -->
        <q-toggle
          v-model="isAddMode"
          :label="isAddMode ? 'Add Stock' : 'Remove Stock'"
          color="primary"
          class="q-mb-md"
        />

        <!-- Add Stock Form -->
        <div v-if="isAddMode">
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
          <q-select
            v-model="newStock.category"
            :options="
              categories
                .filter((c) => c.value !== 'all')
                .map((c) => ({ label: c.label, value: c.value }))
            "
            label="Select Category"
            outlined
            class="q-mb-sm"
          />
          <q-btn
            color="primary"
            label="Add Stock"
            class="full-width q-mt-md"
            @click="addStock"
          />
        </div>

        <!-- Remove Stock Form -->
        <div v-else>
          <q-select
            v-model="removeProduct"
            :options="stock.map((s) => s.product)"
            label="Select Product to Remove"
            outlined
            class="q-mb-sm"
          />
          <q-btn
            color="negative"
            label="Remove Stock"
            class="full-width q-mt-md"
            @click="removeStock"
          />
        </div>

        <!-- Footer -->
        <div class="flex justify-end q-mt-md">
          <q-btn flat label="Close" color="grey" v-close-popup />
        </div>
      </q-card>
    </q-dialog>

    <!-- Status Popup -->
    <q-dialog v-model="showStatusPopup">
      <q-card class="q-pa-md" style="min-width: 500px">
        <h3 class="q-mb-md">Product Status</h3>

        <q-list bordered separator>
          <q-item v-for="item in stock" :key="item.id">
            <q-item-section>{{ item.product }}</q-item-section>
            <q-item-section side>
              <span :class="getStatusClass(item.qty)">
                {{ getStatus(item.qty) }}
              </span>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="flex justify-end q-mt-md">
          <q-btn flat label="Close" color="grey" v-close-popup />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const date = ref("");
const showStockPopup = ref(false);
const showStatusPopup = ref(false);
const isAddMode = ref(true);

const categories = [
  { label: "All", value: "all" },
  { label: "Category 1", value: "1" },
  { label: "Category 2", value: "2" },
  { label: "Category 3", value: "3" },
];
const selectedCategory = ref("all");

const stock = ref([
  {
    id: "STK1001",
    product: "Laptop",
    qty: 10,
    price: 950.5,
    date: "2025-09-01",
    category: "1",
  },
  {
    id: "STK1002",
    product: "Mobile Phone",
    qty: 0,
    price: 700,
    date: "2025-09-02",
    category: "1",
  },
  {
    id: "STK1003",
    product: "Headphones",
    qty: 3,
    price: 120,
    date: "2025-09-02",
    category: "2",
  },
  {
    id: "STK1004",
    product: "Printer",
    qty: 2,
    price: 150,
    date: "2025-09-02",
    category: "3",
  },
]);

const newStock = ref({ id: "", product: "", qty: 1, price: 0, category: "" });
const removeProduct = ref(null);

const filteredStock = computed(() => {
  return stock.value.filter((item) => {
    const categoryMatch =
      selectedCategory.value === "all" ||
      item.category === selectedCategory.value;
    const dateMatch = !date.value || item.date === date.value;
    return categoryMatch && dateMatch;
  });
});

function getStatus(qty) {
  if (qty === 0) return "Out of Stock";
  if (qty < 5) return "Low Stock";
  return "In Stock";
}

function getStatusClass(qty) {
  return qty === 0 ? "text-red" : qty < 5 ? "text-yellow" : "text-green";
}

function getCategoryLabel(value) {
  const cat = categories.find((c) => c.value === value);
  return cat ? cat.label : "Unknown";
}

function addStock() {
  if (!newStock.value.product || !newStock.value.category) {
    alert("Please enter product name and category");
    return;
  }
  newStock.value.id = "STK" + (stock.value.length + 1001);
  newStock.value.date = new Date().toISOString().split("T")[0];
  stock.value.push({ ...newStock.value });
  newStock.value = { id: "", product: "", qty: 1, price: 0, category: "" };
  showStockPopup.value = false;
}

function removeStock() {
  if (!removeProduct.value) {
    alert("Please select a product to remove");
    return;
  }
  stock.value = stock.value.filter(
    (item) => item.product !== removeProduct.value
  );
  removeProduct.value = null;
  showStockPopup.value = false;
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
.text-green {
  background: #dcfce7;
  color: #166534;
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
  font-weight: 600;
}
.text-yellow {
  background: #fef9c3;
  color: #92400e;
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
  font-weight: 600;
}
.text-red {
  background: #fee2e2;
  color: #991b1b;
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
  font-weight: 600;
}
</style>
