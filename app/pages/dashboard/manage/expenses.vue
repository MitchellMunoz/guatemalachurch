<script setup lang="ts">
    import { SlideoversAddExpense } from '#components';
    import { useFindManyExpenses } from '#shared/queries';

    const overlay = useOverlay();
    const dialog = useDialog();
    const toast = useToast();

    const addExpenseOverlay = overlay.create(SlideoversAddExpense);

    const { data } = useFindManyExpenses({
        select: {
            id: true,
            dateOfPurchase: true,
            merchant: true,
            method: true,
            memo: true,
            amount: true,
        },
    });

    const addExpense = () => {
        addExpenseOverlay.open();
    };

    const onEditExpense = (id: number) => {
        addExpenseOverlay.open({
            id,
        });
    };

    const onDeleteExpense = (id: number, amount: number) => {
        const amountFormatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);

        dialog
            .confirm({
                title: `Delete Expense (${amountFormatted})`,
                description: 'Are you sure you want to delete this expense?',
            })
            .onConfirm(() => {
                /**
                 * TODO:
                 * - Create a mutation to delete the expense
                 */

                toast.add({
                    title: `Expense deleted ${amountFormatted}`,
                    description: 'The expense has been deleted.',
                    color: 'success',
                });
            })
            .open();
    };
</script>
<template>
    <div>
        <UDashboardNavbar title="Manage Expenses">
            <template #right>
                <UButton icon="i-heroicons-plus" @click="addExpense">Add Expense</UButton>
            </template>
        </UDashboardNavbar>

        <UTable
            :data="data"
            :columns="[
                {
                    accessorKey: 'dateOfPurchase',
                    header: 'Date of Purchase',
                },
                {
                    accessorKey: 'merchant',
                    header: 'Merchant',
                },
                {
                    accessorKey: 'method',
                    header: 'Payment Method',
                },
                {
                    accessorKey: 'amount',
                    header: 'Amount',
                },
                {
                    accessorKey: 'actions',
                    header: 'Actions',
                },
            ]"
        >
            <template #dateOfPurchase-cell="{ row }">
                {{
                    new Date(row.original.dateOfPurchase).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })
                }}
            </template>
            <template #merchant-cell="{ row }"> {{ row.original.merchant }} </template>
            <template #amount-cell="{ row }">
                {{ Number(row.original.amount).toLocaleString('en-US', { style: 'currency', currency: 'USd' }) }}
            </template>
            <template #actions-cell="{ row }">
                <UDropdownMenu
                    size="sm"
                    :items="[
                        {
                            type: 'label',
                            label: 'Actions',
                        },
                        { type: 'separator' },
                        {
                            label: 'Edit',
                            icon: 'i-heroicons-pencil',
                            onSelect: () => onEditExpense(row.original.id),
                        },
                        {
                            label: 'Delete',
                            icon: 'i-heroicons-trash',
                            color: 'error',
                            onSelect: () => onDeleteExpense(row.original.id, Number(row.original.amount)),
                        },
                    ]"
                >
                    <UButton color="neutral" variant="outline" icon="i-heroicons-ellipsis-vertical" size="sm" />
                </UDropdownMenu>
            </template>
        </UTable>
    </div>
</template>
