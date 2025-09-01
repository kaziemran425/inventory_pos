<!-- OrdersTable.vue -->
<template>
  <div class="orders-page">
    <h2 class="title">Orders</h2>

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
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order.id">
          <td>{{ index + 1 }}</td>
          <td>{{ order.id }}</td>
          <td>{{ order.customer }}</td>
          <td>{{ order.phone }}</td>
          <td>{{ order.product }}</td>
          <td>{{ order.qty }}</td>
          <td>${{ order.price.toFixed(2) }}</td>
          <td>
            <span :class="['status', order.status.toLowerCase()]">
              {{ order.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const orders = ref([
  {
    id: "ORD1001",
    customer: "John Doe",
    phone: "01710000001",
    product: "Laptop",
    qty: 1,
    price: 950.5,
    status: "Pending",
  },
  {
    id: "ORD1002",
    customer: "Jane Smith",
    phone: "01710000002",
    product: "Mobile Phone",
    qty: 2,
    price: 700,
    status: "Completed",
  },
  {
    id: "ORD1003",
    customer: "Ali Khan",
    phone: "01710000003",
    product: "Headphones",
    qty: 3,
    price: 120,
    status: "Cancelled",
  },
]);
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
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
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
.status.pending {
  background: #fef9c3;
  color: #92400e;
}
.status.completed {
  background: #dcfce7;
  color: #166534;
}
.status.cancelled {
  background: #fee2e2;
  color: #991b1b;
}
</style>
