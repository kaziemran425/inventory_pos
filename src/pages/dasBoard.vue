<!-- DashboardPage.vue -->
<template>
  <div class="q-pa-md">
    <div class="q-pa-md dashboard-page">
      <div class="row q-col-gutter-md">
        <!-- Today's Sales -->
        <div class="col-3">
          <q-card class="q-pa-md text-center shadow-2 rounded-borders">
            <div class="text-subtitle1">Today's Sales</div>
            <div class="text-h5 text-primary q-mt-sm">{{ stats.sales }}</div>
          </q-card>
        </div>

        <!-- Today's Orders -->
        <div class="col-3">
          <q-card class="q-pa-md text-center shadow-2 rounded-borders">
            <div class="text-subtitle1">Today's Orders</div>
            <div class="text-h5 text-secondary q-mt-sm">{{ stats.orders }}</div>
          </q-card>
        </div>

        <!-- Today's Revenue -->
        <div class="col-3">
          <q-card class="q-pa-md text-center shadow-2 rounded-borders">
            <div class="text-subtitle1">Today's Revenue</div>
            <div class="text-h5 text-positive q-mt-sm">{{ stats.revenue }}</div>
          </q-card>
        </div>

        <!-- Today's Customers -->
        <div class="col-3">
          <q-card class="q-pa-md text-center shadow-2 rounded-borders">
            <div class="text-subtitle1">Today's Customers</div>
            <div class="text-h5 text-negative q-mt-sm">
              {{ stats.customers }}
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Example static stats
const stats = ref({
  sales: 150,
  orders: 45,
  revenue: "$3,250",
  customers: 28,
});
</script>

<style scoped>
.dashboard-page {
  background: #f9fafb;
  min-height: 100vh;
}
.rounded-borders {
  border-radius: 12px;
}
</style>
