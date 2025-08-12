import { defineMutation, defineQuery, useMutation, useQuery, useQueryCache } from '@pinia/colada';
import { ref, toValue } from 'vue';
import type { Prisma } from '~~/.generated/prisma/client';

export const useCreateExpense = defineMutation(() => {
    const queryCache = useQueryCache();

    return useMutation({
        mutation: (data: Prisma.ExpenseCreateArgs) => {
            return $fetch('/api/model/expense', {
                method: 'POST',
                params: {
                    q: JSON.stringify(data),
                },
            });
        },
        onSettled: () => queryCache.invalidateQueries({ key: ['Expense'] }),
    });
});

export const useDeleteExpense = defineMutation(() => {
    const queryCache = useQueryCache();

    return useMutation({
        mutation: (data: Prisma.ExpenseDeleteArgs) => {
            return $fetch('/api/model/expense', {
                method: 'DELETE',
                params: {
                    q: JSON.stringify(data),
                },
            });
        },
        onSettled: () => queryCache.invalidateQueries({ key: ['Expense'] }),
    });
});

export const useFindManyExpenses = (defaultFilters?: Prisma.ExpenseFindManyArgs) => {
    return defineQuery(() => {
        const filters = ref<Prisma.ExpenseFindManyArgs>(defaultFilters || {});

        const query = useQuery<Prisma.ExpenseGetPayload<Prisma.ExpenseFindManyArgs>[]>({
            key: () => ['Expense', 'findMany', JSON.stringify(toValue(filters))],
            query: () => {
                return $fetch<Prisma.ExpenseGetPayload<Prisma.ExpenseFindManyArgs>[]>('/api/model/expense', {
                    method: 'GET',
                    params: {
                        op: 'findMany',
                        q: JSON.stringify(toValue(filters)),
                    },
                });
            },
        });

        return {
            ...query,
            filters,
        };
    })();
};

export const useFindUniqueExpense = (defaultFilters?: Partial<Prisma.ExpenseFindUniqueArgs>) => {
    return defineQuery(() => {
        const filters = ref<Partial<Prisma.ExpenseFindUniqueArgs>>(defaultFilters || {});

        const query = useQuery<Prisma.ExpenseGetPayload<Prisma.ExpenseFindUniqueArgs>>({
            key: () => ['Expense', 'findUnique', JSON.stringify(toValue(filters))],
            enabled: () => !!filters.value?.where,
            query: () => {
                return $fetch<Prisma.ExpenseGetPayload<Prisma.ExpenseFindUniqueArgs>>('/api/model/expense', {
                    method: 'GET',
                    params: {
                        op: 'findUnique',
                        q: JSON.stringify(toValue(filters)),
                    },
                });
            },
        });

        return {
            ...query,
            filters,
        };
    })();
};
