<script setup lang="ts">
    import { useCreateExpense, useFindUniqueExpense } from '#shared/queries';
    import { AddExpenseFormSchema, type AddExpenseForm } from '#shared/schemas/add-expense.schema';
    import { DateFormatter, fromDate, getLocalTimeZone, today } from '@internationalized/date';
    import type { FormSubmitEvent } from '@nuxt/ui';
    import { Currency, ExpenseMethod } from '~~/.generated/prisma/enums';

    const { id = undefined } = defineProps<{ id?: number }>();

    const df = new DateFormatter('en-US', {
        dateStyle: 'medium',
    });
    const toast = useToast();
    const formRef = useTemplateRef('formRef');
    const { mutateAsync } = useCreateExpense();
    const { data, filters, isLoading } = useFindUniqueExpense();

    const form = shallowReactive<AddExpenseForm>({
        amount: 0,
        merchant: '',
        dateOfPurchase: today(getLocalTimeZone()),
        currency: Currency.USD,
        method: ExpenseMethod.CASH,
        upload: undefined,
        memo: undefined,
        category: undefined,
        file: undefined,
    });

    watchEffect(() => {
        if (data.value) {
            form.amount = Number(data.value.amount);
            form.merchant = data.value.merchant;
            form.dateOfPurchase = fromDate(data.value.dateOfPurchase, getLocalTimeZone());
            form.currency = data.value.currency;
            form.method = data.value.method;
            form.memo = data.value.memo || undefined;
            form.upload = data.value.upload || undefined;
        }
    });
    if (id) {
        filters.value = {
            where: {
                id,
            },
        };
    }

    const submitExpense = async (_event: FormSubmitEvent<AddExpenseForm>) => {
        // Guard: max 10MB
        if (form.file && form.file.size > 10 * 1024 * 1024) {
            toast.add({
                title: 'File too large',
                description: 'Please upload a file less than 10MB',
                color: 'error',
            });
            return;
        }

        // DateValue -> JS Date
        const jsDate = _event.data.dateOfPurchase?.toDate(getLocalTimeZone()) ?? new Date();

        await mutateAsync({
            data: {
                amount: _event.data.amount,
                currency: _event.data.currency,
                dateOfPurchase: jsDate,
                merchant: _event.data.merchant,
                method: _event.data.method,
                memo: _event.data.memo ?? null,
            },
        });
    };
</script>

<template>
    <OverlaySlideover :title="id ? 'Edit Expense' : 'Add Expense'" size="lg" :dismissible="false">
        <div v-if="isLoading" class="flex flex-col gap-4">
            <div class="flex gap-4">
                <USkeleton class="h-8 w-full" />
                <USkeleton class="h-8 w-full" />
            </div>
            <USkeleton class="h-8 w-full" />
            <USkeleton class="h-8 w-full" />
            <USkeleton class="size-40" />
        </div>
        <UForm
            v-else
            ref="formRef"
            :state="form"
            :schema="AddExpenseFormSchema"
            class="flex flex-col gap-4"
            @submit="submitExpense"
        >
            <div class="flex flex-col gap-4 md:flex-row">
                <UFormField label="Merchant" class="flex-1">
                    <UInput v-model="form.merchant" :ui="{ root: 'w-full' }" />
                </UFormField>
                <UFormField label="Category" class="flex-shrink">
                    <USelectMenu
                        v-model="form.category"
                        :items="['Food', 'Transport', 'Entertainment', 'Other']"
                        class="min-w-48"
                    />
                </UFormField>
            </div>
            <UFormField label="Memo">
                <UInput v-model="form.memo" :ui="{ root: 'w-full' }" />
            </UFormField>
            <div class="flex flex-col gap-4 md:flex-row">
                <UFormField label="Date" class="flex-1">
                    <UPopover>
                        <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
                            {{
                                form.dateOfPurchase
                                    ? df.format(form.dateOfPurchase.toDate(getLocalTimeZone()))
                                    : 'Select a date'
                            }}
                        </UButton>

                        <template #content>
                            <UCalendar v-model="form.dateOfPurchase" class="p-2" />
                        </template>
                    </UPopover>
                </UFormField>
                <UFormField label="Method" class="flex-shrink">
                    <USelectMenu
                        v-model="form.method"
                        :search-input="false"
                        :items="[ExpenseMethod.CASH, ExpenseMethod.CARD, ExpenseMethod.TRANSFER]"
                        class="min-w-32"
                    />
                </UFormField>
                <UFormField label="Currency" class="flex-shrink" :ui="{ container: 'flex items-center gap-2' }">
                    <USelectMenu
                        v-model="form.currency"
                        :search-input="false"
                        :items="[Currency.USD, Currency.GTQ, Currency.ARS, Currency.RON]"
                        class="w-20"
                    />
                </UFormField>
                <UFormField label="Amount" class="flex-shrink" :ui="{ container: 'flex items-center gap-2' }">
                    <UInputNumber
                        v-model="form.amount"
                        :step-snapping="false"
                        :ui="{ root: 'w-full' }"
                        :format-options="{
                            style: 'currency',
                            currency: form.currency,
                            currencyDisplay: 'code',
                            currencySign: 'standard',
                        }"
                    />
                </UFormField>
            </div>
            <UFormField label="Receipt Upload">
                <UFileUpload v-model="form.file" accept="image/*,application/pdf" class="min-h-48 w-96" />
            </UFormField>
        </UForm>
        <template #footer>
            <UButton @click="formRef?.submit()">
                {{ id ? 'Update Expense' : 'Add Expense' }}
            </UButton>
        </template>
    </OverlaySlideover>
</template>
