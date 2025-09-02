<template>
  <div>
    <q-card class="my-card q-pa-md">
      <div class="orders-page">
        <h2 class="title">Orders</h2>

        <!-- Toolbar -->
        <div class="toolbar q-mb-md row items-center q-gutter-md">
          <!-- Search -->
          <q-input
            dense
            outlined
            v-model="search"
            placeholder="Search orders..."
            class="col"
            clearable
            debounce="300"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <!-- Calendar -->
          <q-input
            dense
            outlined
            v-model="date"
            mask="####-##-##"
            placeholder="YYYY-MM-DD"
            class="col"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" mask="YYYY-MM-DD" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <!-- Add Order Button -->
          <q-btn
            color="positive"
            label="Add Order"
            icon="add"
            class="col-auto"
            @click="showAddDialog = true"
          />

          <!-- Sales Button -->
          <q-btn
            color="primary"
            label="Sales"
            icon="shopping_cart"
            class="col-auto"
          />

          <!-- Filter Button -->
          <q-btn
            color="secondary"
            label="Filter"
            icon="filter_alt"
            class="col-auto"
          />
        </div>

        <!-- Orders Table -->
        <table class="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in filteredOrders" :key="order.id">
              <td>{{ index + 1 }}</td>
              <td>{{ order.id }}</td>
              <td>{{ order.customer }}</td>
              <td>{{ order.phone }}</td>
              <td>{{ order.product }}</td>
              <td>{{ order.qty }}</td>
              <td>${{ (order.price * order.qty).toFixed(2) }}</td>
              <td>
                <span :class="['status', order.status.toLowerCase()]">
                  {{ order.status }}
                </span>
              </td>
              <td>
                <q-btn
                  flat
                  dense
                  round
                  color="negative"
                  icon="delete"
                  @click="removeOrder(order.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </q-card>

    <!-- Add Order Popup -->
    <q-dialog v-model="showAddDialog" persistent>
      <q-card style="min-width:400px">
        <q-card-section>
          <div class="text-h6">Add New Order</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="newOrder.customer" label="Customer Name" outlined />
          <q-input v-model="newOrder.phone" label="Phone" outlined />
          <q-input v-model="newOrder.product" label="Product" outlined />
          <q-input v-model.number="newOrder.qty" type="number" label="Quantity" outlined />
          <q-input v-model.number="newOrder.price" type="number" label="Price" outlined />
          <q-select
            v-model="newOrder.status"
            :options="['Pending','Completed','Cancelled']"
            label="Status"
            outlined
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn flat label="Add" color="positive" @click="addOrder" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const search = ref("");
const date = ref("");
const showAddDialog = ref(false);

const orders = ref([
  { id: "ORD1001", customer: "John Doe", phone: "01710000001", product: "Laptop", qty: 1, price: 950.5, status: "Pending", date: "2025-09-01" },
  { id: "ORD1002", customer: "Jane Smith", phone: "01710000002", product: "Mobile Phone", qty: 2, price: 700, status: "Completed", date: "2025-09-02" },
]);

// New order form model
const newOrder = ref({
  customer: "",
  phone: "",
  product: "",
  qty: 1,
  price: 0,
  status: "Pending",
});

// Filtering
const filteredOrders = computed(() => {
  return orders.value.filter((o) => {
    const matchesSearch =
      search.value === "" ||
      o.customer.toLowerCase().includes(search.value.toLowerCase()) ||
      o.id.toLowerCase().includes(search.value.toLowerCase()) ||
      o.phone.includes(search.value);

    const matchesDate = date.value === "" || o.date === date.value;

    return matchesSearch && matchesDate;
  });
});

// Add order
const addOrder = () => {
  if (!newOrder.value.customer || !newOrder.value.phone || !newOrder.value.product) {
    alert("Please fill all required fields!");
    return;
  }

  const id = "ORD" + (1000 + orders.value.length + 1);
  orders.value.push({
    id,
    ...newOrder.value,
    date: new Date().toISOString().split("T")[0],
  });

  // Reset form
  newOrder.value = { customer: "", phone: "", product: "", qty: 1, price: 0, status: "Pending" };
  showAddDialog.value = false;
};

// Remove order
const removeOrder = (id) => {
  orders.value = orders.value.filter((o) => o.id !== id);
};
</script>

<style scoped>
.orders-page {
  padding: 2rem;
  background: #f9fafb;
  min-height: 100vh;
}
.title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}
.orders-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
.orders-table th,
.orders-table td {
  padding: 0.8rem;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
}
.orders-table th {
  background: #f1f5f9;
  font-weight: 600;
}
.status {
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
}
.status.pending { background: #fef9c3; color: #92400e; }
.status.completed { background: #dcfce7; color: #166534; }
.status.cancelled { background: #fee2e2; color: #991b1b; }
</style>
