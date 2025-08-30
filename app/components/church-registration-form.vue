<script setup lang="ts">
import { useAuth, useToast } from '#imports'
import { useCreateTrip } from '#shared/queries/trip'
import type { FormSubmitEvent } from '@nuxt/ui'

// use the composable you wrote
import { useTripValidation, type TripState } from '~/composables/useTripValidation'

const { user } = useAuth()
const { mutateAsync, isLoading } = useCreateTrip()
const toast = useToast()

const locationOptions = ['Barbarena', 'Los Chilitos']

const state = reactive<TripState>({
  churchName: '',
  location: [] as string[],
  startDate: '',
  endDate: '',
  description: '',
  groupSize: 0,
  title: '',
})

// get validate() and todayISO from the composable
const { validate, todayISO } = useTripValidation()

async function onSubmit(_e: FormSubmitEvent<typeof state>) {
  try {
    if (!user.value) {
      toast.add({ title: 'Error', description: 'You must be signed in.', color: 'error' })
      return
    }

    // No extra date math here — UForm + composable handle client validation.
    // Server still re-validates via validateTripDates.

    await mutateAsync({
      data: {
        churchName: state.churchName,
        location: state.location.join(', '),
        startDate: state.startDate, // "YYYY-MM-DD"
        endDate: state.endDate,     // "YYYY-MM-DD"
        description: state.description,
        groupSize: state.groupSize ?? 0,
        title: state.title ?? '',
      },
    })

    toast.add({ title: 'Success', description: 'Registration saved.', color: 'success' })
  } catch (err: unknown) {
    // Define a type for the error object
    type ServerError = { data?: { statusMessage?: string } }
    // Surface server-side validation messages when available
    const msg =
      typeof err === 'object' && err !== null && 'data' in err && typeof (err as ServerError).data?.statusMessage === 'string'
        ? (err as ServerError).data!.statusMessage!
        : 'Failed to save registration.'
    console.error('Create trip failed:', err)
    toast.add({ title: 'Error', description: msg, color: 'error' })
  }
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-6 pt-8">
      <UForm :state="state" :validate="validate" @submit="onSubmit">
        <div class="flex flex-col gap-6 md:flex-col lg:flex-col">
          <UCard class="w-full rounded-2xl border pb-4 shadow-sm">
            <template #header>
              <h2 class="text-lg">Your information</h2>
            </template>

            <div class="flex flex-col md:flex-row md:gap-6">
              <UFormField label="Trip Title" name="title" class="md:flex-1">
                <UInput v-model="state.title" class="w-full" />
              </UFormField>

              <UFormField label="Location" name="location" class="md:flex-1">
                <USelectMenu
                  v-model="state.location"
                  multiple
                  :items="locationOptions"
                  class="w-full"
                  placeholder="Select location"
                />
              </UFormField>

              <UFormField label="Start date" name="startDate" class="md:flex-1">
                <UInput
                  v-model="state.startDate"
                  type="date"
                  class="w-full"
                  :min="todayISO"
                  :max="state.endDate ? state.endDate.toString().slice(0, 10) : undefined"
                />
              </UFormField>

              <UFormField label="End date" name="endDate" class="md:flex-1">
                <UInput
                  v-model="state.endDate"
                  type="date"
                  class="w-full"
                  :min="state.startDate ? state.startDate.toString().slice(0, 10) : todayISO"
                />
              </UFormField>
            </div>

            <div>
              <div class="flex flex-col gap-4 md:flex-row md:gap-6">
                <UFormField label="Description" name="description" class="md:flex-1">
                  <UInput v-model="state.description" class="w-full" />
                </UFormField>

                <UFormField label="Group size" name="groupSize" class="md:w-48">
                  <UInput
                    v-model="state.groupSize"
                    type="number"
                    inputmode="numeric"
                    min="1"
                    class="w-full"
                  />
                </UFormField>
              </div>
            </div>
          </UCard>

          <div class="flex flex-col gap-4 md:flex-row">
            <UButton color="primary" variant="ghost" type="button">Save draft</UButton>
            <UButton type="submit" :loading="isLoading">Submit</UButton>
          </div>
        </div>
      </UForm>
    </div>
  </div>
</template>