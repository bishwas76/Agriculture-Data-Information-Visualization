<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal bordered class="bg-positive text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="row justify-center q-pa-md">
            <span class="text-h5">
              Agriculture Data Visualization Dashboard
            </span>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div>
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>

<style></style>
