export enum Currency {
    USD = 'USD',
    GTQ = 'GTQ',
}

const defaultCurrency = ref<Currency>(Currency.USD);

export const useCurrency = () => {
    const convert = async (from: Currency, to: Currency, amount: number, isBuying: boolean = true) => {
        if (from === to) {
            return amount;
        }

        const response = await $fetch<{ rates: Record<string, number> }>(
            'https://api.exchangerate-api.com/v4/latest/USD',
        );

        const fromRate = response.rates[from];
        const toRate = response.rates[to];

        if (!fromRate || !toRate) {
            throw new Error(`Exchange rate not available for ${from} or ${to}`);
        }

        const baseRate = toRate / fromRate;

        // Spread: when buying target currency, you pay more of source currency
        const spread = 0.02; // 2% spread
        const rate = isBuying ? baseRate * (1 + spread) : baseRate * (1 - spread);

        return amount * rate;
    };

    const setDefaultCurrency = (currency: Currency) => {
        defaultCurrency.value = currency;
    };

    return {
        convert,
        setDefaultCurrency,
    };
};
