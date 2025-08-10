<script setup lang="ts">
    import { Currency } from '~/composables/useCurrency';

    const { convert } = useCurrency();

    const currencyType = ref(Currency.USD);
    const amount = ref(0);
    const gtqAmount = ref(0);
    const file = ref<File | null>(null);
    const method = ref('Cash');

    const getConvertedAmount = async (amount: number) => {
        if (currencyType.value === Currency.USD) {
            gtqAmount.value = amount;
            return;
        }

        const res = await convert(currencyType.value, Currency.USD, amount);

        gtqAmount.value = res;
    };
</script>
<template>
    <div>
        <div>Manage Expenses</div>
        <USeparator class="my-4" />
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-4 md:flex-row">
                <UFormField label="Merchant" class="flex-1">
                    <UInput :ui="{ root: 'w-full' }" />
                </UFormField>
                <UFormField label="Category" class="flex-shrink">
                    <USelectMenu :items="['Food', 'Transport', 'Entertainment', 'Other']" class="min-w-48" />
                </UFormField>
            </div>
            <UFormField label="Memo">
                <UInput :ui="{ root: 'w-full' }" />
            </UFormField>
            <div class="flex flex-col gap-4 md:flex-row">
                <UFormField label="Date" class="flex-1">
                    <UInput :ui="{ root: 'w-full' }" />
                </UFormField>
                <UFormField label="Method" class="flex-shrink">
                    <USelectMenu
                        v-model="method"
                        :search-input="false"
                        :items="['Cash', 'Card', 'Bank Transfer']"
                        class="min-w-32"
                    />
                </UFormField>
                <UFormField label="Amount" class="flex-shrink" :ui="{ container: 'flex items-center gap-2' }">
                    <USelectMenu
                        v-model="currencyType"
                        :search-input="false"
                        :items="[Currency.USD, Currency.GTQ]"
                        class="w-20"
                    />

                    <UInputNumber
                        v-model="amount"
                        :ui="{ root: 'w-full' }"
                        :format-options="{
                            style: 'currency',
                            currency: currencyType,
                            currencyDisplay: 'code',
                            currencySign: 'standard',
                        }"
                    />
                </UFormField>
            </div>
            <UFormField label="Receipt Upload">
                <UFileUpload v-model="file" class="min-h-48 w-96" />
            </UFormField>
            <div>
                <UButton @click="getConvertedAmount(amount)">Add Expense</UButton>
            </div>
            <div class="flex items-center gap-2">
                <span class="font-semibold"> USD </span>
                <span class="flex items-center"> <UIcon name="lucide:dollar-sign" />{{ gtqAmount.toFixed(2) }} </span>
            </div>
        </div>
    </div>
</template>
