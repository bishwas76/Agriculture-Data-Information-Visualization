<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal bordered class="bg-positive text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="row justify-between q-pa-sm">
            <router-link :to="{ name: 'Dashboard' }">
              <div class="items-center">
                <span class="text-h6 text-center">
                  Agriculture Data Visualization Dashboard
                </span>
              </div>
            </router-link>
            <div class="text-weight-bold cursor-pointer">
              <div>
                <q-icon name="bar_chart" />
                <span>Visualizations</span>
              </div>
              <q-menu
                fit
                class="dashboard-menu"
                transition-show="jump-down"
                transition-hide="jump-up"
                :offset="[0, 10]"
              >
                <q-list class="bg-white" style="min-width: 280px">
                  <q-item
                    class="q-px-md"
                    clickable
                    v-ripple
                    :to="{ name: 'EconomicAspectsOfAgriculture' }"
                  >
                    <q-item-section avatar>
                      <q-icon name="money" color="green-7" />
                    </q-item-section>
                    <q-item-section>
                      Economic Aspects of Agriculture
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="chevron_right" size="xs" />
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                    class="q-px-md"
                    clickable
                    v-ripple
                    :to="{ name: 'CropProduction' }"
                  >
                    <q-item-section avatar>
                      <q-icon name="eco" color="green-7" />
                    </q-item-section>
                    <q-item-section>Crop Production</q-item-section>
                    <q-item-section side>
                      <q-icon name="chevron_right" size="xs" />
                    </q-item-section>
                  </q-item>

                  <q-separator />

                  <q-item
                    class="q-px-md"
                    clickable
                    v-ripple
                    :to="{ name: 'Livestock' }"
                  >
                    <q-item-section avatar>
                      <q-icon name="pets" color="green-7" />
                    </q-item-section>
                    <q-item-section>Livestock Data</q-item-section>
                    <q-item-section side>
                      <q-icon name="chevron_right" size="xs" />
                    </q-item-section>
                  </q-item>
                  <q-separator />

                  <q-item
                    class="q-px-md"
                    clickable
                    v-ripple
                    :to="{ name: 'SeedAndFertilizers' }"
                  >
                    <q-item-section avatar>
                      <q-icon name="eco" color="green-7" />
                    </q-item-section>
                    <q-item-section>Seed And Fertilizers</q-item-section>
                    <q-item-section side>
                      <q-icon name="chevron_right" size="xs" />
                    </q-item-section>
                  </q-item>
                  <q-separator />

                  <q-item
                    class="q-px-md"
                    clickable
                    v-ripple
                    :to="{ name: 'CropPrice' }"
                  >
                    <q-item-section avatar>
                      <q-icon name="attach_money" color="green-7" />
                    </q-item-section>
                    <q-item-section>Crop Price</q-item-section>
                    <q-item-section side>
                      <q-icon name="chevron_right" size="xs" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="container-div">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.router-link-active {
  color: white;
  text-decoration: none;
}
.dashboard-menu {
  .q-list {
    border-radius: 8px;
  }

  .q-item {
    min-height: 48px;
    border-radius: 4px;
    margin: 4px 8px;

    &:hover {
      background: #f5f5f5;
    }

    &.q-router-link-active {
      background: #e3f2fd;
      color: #1976d2;
      font-weight: 500;
    }
  }

  .q-separator {
    margin: 4px 16px;
  }
}
</style>
