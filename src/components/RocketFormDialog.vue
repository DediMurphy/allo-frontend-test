<template>
  <v-dialog v-model="isOpen" max-width="520">
    <v-card>
      <v-card-title class="text-h6 pt-4"> Add a rocket </v-card-title>

      <v-card-subtitle class="text-wrap pb-2">
        This rocket is stored in the app only — the API is read-only.
      </v-card-subtitle>

      <v-card-text>
        <v-form ref="formRef" validate-on="submit" @submit.prevent="submit">
          <v-text-field
            v-model="name"
            class="mb-2"
            label="Name *"
            :rules="nameRules"
            variant="outlined"
          />

          <v-textarea
            v-model="description"
            class="mb-2"
            label="Description"
            rows="3"
            variant="outlined"
          />

          <v-text-field
            v-model="imageUrl"
            hint="Leave empty to use a placeholder icon"
            label="Image URL"
            :rules="imageUrlRules"
            variant="outlined"
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="px-6 pb-4">
        <v-spacer />
        <v-btn variant="text" @click="isOpen = false"> Cancel </v-btn>
        <v-btn color="primary" variant="flat" @click="submit">
          Add rocket
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>

import { ref, watch } from "vue";

import type { VForm } from "vuetify/components";
import type { NewRocketInput } from "@/types/rocket";

const isOpen = defineModel<boolean>({ default: false });

const emit = defineEmits<{ created: [rocket: NewRocketInput] }>();

const formRef = ref<InstanceType<typeof VForm> | null>(null);
const name = ref("");
const description = ref("");
const imageUrl = ref("");

const nameRules = [
  (value: string) => !!value?.trim() || "Name is required.",
  (value: string) =>
    value.trim().length >= 2 || "Name must be at least 2 characters.",
];

const imageUrlRules = [
  (value: string) => {
    if (!value?.trim()) {
      return true;
    }
    return (
      /^https?:\/\/\S+$/.test(value.trim()) || "Enter a valid http(s) URL."
    );
  },
];

function reset(): void {
  name.value = "";
  description.value = "";
  imageUrl.value = "";
  formRef.value?.resetValidation();
}

async function submit(): Promise<void> {
  const result = await formRef.value?.validate();
  if (!result?.valid) {
    return;
  }

  emit("created", {
    name: name.value.trim(),
    description: description.value.trim(),
    imageUrl: imageUrl.value.trim() || null,
  });

  isOpen.value = false;
}

watch(isOpen, (open) => {
  if (!open) {
    reset();
  }
});
</script>
